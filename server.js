'use strict';

require('dotenv').config();

const express = require('express');
const cors    = require('cors');
const { adminEmailTemplate }    = require('./templates/adminEmail');
const { customerEmailTemplate } = require('./templates/customerEmail');

const app  = express();
const PORT = process.env.PORT || 3000;

// ── Middleware ──────────────────────────────────────────────────────────────

app.use(cors({
  origin: '*',
  methods: ['POST', 'OPTIONS'],
}));

app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// ── Email via Google Apps Script ────────────────────────────────────────────

async function sendEmails(data) {
  const payload = JSON.stringify({
    adminEmail:      process.env.ADMIN_EMAIL,
    adminSubject:    `New Repair Booking — ${data.businessName}`,
    adminHtml:       adminEmailTemplate(data),
    customerEmail:   data.email,
    customerSubject: 'Your Repair Booking Has Been Received – Kept Cold',
    customerHtml:    customerEmailTemplate(data),
  });

  // Google Apps Script redirects POST — follow redirect manually keeping POST
  let res = await fetch(process.env.APPS_SCRIPT_URL, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: payload,
    redirect: 'manual',
  });

  if (res.status >= 300 && res.status < 400) {
    const location = res.headers.get('location');
    res = await fetch(location, { method: 'GET' });
  }

  const result = await res.json();
  if (!result.success) throw new Error(result.error || 'Apps Script failed');
  return result;
}

// ── Booking reference generator ─────────────────────────────────────────────

function generateBookingRef() {
  const chars = 'ABCDEFGHJKLMNPQRSTUVWXYZ23456789';
  let ref = 'KC-';
  for (let i = 0; i < 6; i++) ref += chars[Math.floor(Math.random() * chars.length)];
  return ref;
}

// ── Validation ──────────────────────────────────────────────────────────────

const REQUIRED_FIELDS = [
  'businessName', 'businessAddress', 'jobAddress',
  'contactName', 'email', 'contactNumber', 'accessHours',
];

function validatePayload(body) {
  const missing = REQUIRED_FIELDS.filter(
    (field) => !body[field] || String(body[field]).trim() === ''
  );
  if (missing.length > 0) return { valid: false, missing };
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  if (!emailRegex.test(body.email)) return { valid: false, missing: [], invalidEmail: true };
  return { valid: true };
}

// ── Webhook Route ───────────────────────────────────────────────────────────

app.post('/webhook', async (req, res) => {
  const validation = validatePayload(req.body);
  if (!validation.valid) {
    const message = validation.invalidEmail
      ? 'Invalid email address format'
      : `Missing required fields: ${validation.missing.join(', ')}`;
    return res.status(400).json({ success: false, error: message });
  }

  // Log incoming fields so you can check Railway logs and verify field names
  console.log('[webhook] Received fields:', Object.keys(req.body));
  console.log('[webhook] totalPrice value:', req.body.totalPrice, '| type:', typeof req.body.totalPrice, '| parsed:', String(req.body.totalPrice || req.body.price || req.body.amountPaid || req.body.amount || '').trim());
  console.log('[webhook] Body:', JSON.stringify(req.body));

  const data = {
    bookingReference: generateBookingRef(),
    businessName:     String(req.body.businessName).trim(),
    businessAddress:  String(req.body.businessAddress).trim(),
    jobAddress:       String(req.body.jobAddress).trim(),
    contactName:      String(req.body.contactName).trim(),
    email:            String(req.body.email).trim().toLowerCase(),
    contactNumber:    String(req.body.contactNumber).trim(),
    accessHours:      String(req.body.accessHours).trim(),
    // Accept multiple possible field names from different forms
    calloutPriority:  String(req.body.calloutPriority  || req.body.service        || req.body.priority       || '').trim(),
    totalPrice:       String(req.body.totalPrice        || req.body.price          || req.body.amountPaid     || req.body.amount || '').trim(),
    equipmentType:    String(req.body.equipmentType     || req.body.equipment      || req.body.equipment_type || '').trim(),
    faultDescription: String(req.body.faultDescription  || req.body.fault          || req.body.description    || '').trim(),
  };

  try {
    await sendEmails(data);
    console.log(`[webhook] Emails sent for booking: ${data.businessName}`);
    return res.status(200).json({ success: true, message: 'Booking received. Confirmation emails sent.' });
  } catch (err) {
    console.error('[webhook] Email error:', err.message);
    return res.status(500).json({ success: false, error: 'Booking received but failed to send confirmation emails.' });
  }
});

// ── Health Check ────────────────────────────────────────────────────────────

app.get('/health', (_req, res) => {
  res.json({ status: 'ok', service: 'kept-cold-webhook' });
});

app.use('/', (_req, res) => {
  res.send('Kept Cold webhook server is running.');
});

app.listen(PORT, () => {
  console.log(`[server] Kept Cold webhook running on port ${PORT}`);
});
