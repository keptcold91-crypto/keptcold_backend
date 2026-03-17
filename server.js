'use strict';

require('dotenv').config();

const express    = require('express');
const cors       = require('cors');
const nodemailer = require('nodemailer');
const { adminEmailTemplate }    = require('./templates/adminEmail');
const { customerEmailTemplate } = require('./templates/customerEmail');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────

app.use(cors({
  origin: '*',            // Lock to your form's domain in production, e.g. 'https://keptcold.co.uk'
  methods: ['POST', 'OPTIONS'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true })); // also handle form-encoded POST bodies

// ── Nodemailer Transport ────────────────────────────────────────────────────

const transporter = nodemailer.createTransport({
  host: 'smtp.gmail.com',
  port: 465,
  secure: true,
  auth: {
    user: process.env.GMAIL_USER,
    pass: process.env.GMAIL_APP_PASSWORD,
  },
});

// Verify SMTP connection on startup — logs error early if credentials are wrong
transporter.verify((err) => {
  if (err) {
    console.error('[nodemailer] SMTP connection failed:', err.message);
  } else {
    console.log('[nodemailer] SMTP ready — connected to Gmail');
  }
});

// ── Validation ──────────────────────────────────────────────────────────────

const REQUIRED_FIELDS = [
  'businessName',
  'businessAddress',
  'jobAddress',
  'contactName',
  'email',
  'contactNumber',
  'accessHours',
];

function validatePayload(body) {
  const missing = REQUIRED_FIELDS.filter(
    (field) => !body[field] || String(body[field]).trim() === ''
  );
  if (missing.length > 0) {
    return { valid: false, missing };
  }
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) {
    return { valid: false, missing: [], invalidEmail: true };
  }
  return { valid: true };
}

// ── Webhook Route ───────────────────────────────────────────────────────────

app.post('/webhook', async (req, res) => {
  // 1. Validate
  const validation = validatePayload(req.body);
  if (!validation.valid) {
    const message = validation.invalidEmail
      ? 'Invalid email address format'
      : `Missing required fields: ${validation.missing.join(', ')}`;
    return res.status(400).json({ success: false, error: message });
  }

  // 2. Sanitise — trim all fields
  const data = {
    businessName:    String(req.body.businessName).trim(),
    businessAddress: String(req.body.businessAddress).trim(),
    jobAddress:      String(req.body.jobAddress).trim(),
    contactName:     String(req.body.contactName).trim(),
    email:           String(req.body.email).trim().toLowerCase(),
    contactNumber:   String(req.body.contactNumber).trim(),
    accessHours:     String(req.body.accessHours).trim(),
  };

  // 3. Build email options
  const adminMailOptions = {
    from:    `"Kept Cold Booking System" <${process.env.GMAIL_USER}>`,
    to:      process.env.ADMIN_EMAIL,
    subject: `New Repair Booking — ${data.businessName}`,
    html:    adminEmailTemplate(data),
  };

  const customerMailOptions = {
    from:    `"Kept Cold" <${process.env.GMAIL_USER}>`,
    to:      data.email,
    subject: 'Your Repair Booking Has Been Received – Kept Cold',
    html:    customerEmailTemplate(data),
  };

  // 4. Send both emails concurrently
  try {
    const [adminResult, customerResult] = await Promise.all([
      transporter.sendMail(adminMailOptions),
      transporter.sendMail(customerMailOptions),
    ]);

    console.log(`[webhook] Admin email sent: ${adminResult.messageId}`);
    console.log(`[webhook] Customer email sent to ${data.email}: ${customerResult.messageId}`);

    return res.status(200).json({
      success: true,
      message: 'Booking received. Confirmation emails sent.',
    });
  } catch (err) {
    console.error('[webhook] Email send error:', err.message);
    return res.status(500).json({
      success: false,
      error: 'Booking received but failed to send confirmation emails. Please contact support.',
    });
  }
});

// ── Health Check ────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'kept-cold-webhook' });
});

app.use("/", (req, res) => {
  res.send("server.js is running");
});
app.use((_req, res) => {
  res.status(404).json({ error: 'Not found' });
});


app.listen(PORT, () => {
  console.log(`[server] Kept Cold webhook running on port ${PORT}`);
});
