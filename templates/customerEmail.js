'use strict';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates a row for the booking summary table.
 * @param {string} label
 * @param {string} value
 * @param {boolean} shaded - alternate row background
 * @param {boolean} isLast - omit bottom border on last row
 */
function summaryRow(label, value, shaded, isLast = false) {
  const bg  = shaded ? 'background-color:#f8fafc;' : 'background-color:#ffffff;';
  const bdr = isLast ? '' : 'border-bottom:1px solid #f1f5f9;';
  return `
    <tr>
      <td style="padding:12px 18px;font-size:12px;color:#6b7280;font-weight:700;
                  width:40%;text-transform:uppercase;letter-spacing:0.8px;${bg}${bdr}">
        ${label}
      </td>
      <td style="padding:12px 18px;font-size:13px;color:#0d1b2a;font-weight:600;${bg}${bdr}">
        ${value}
      </td>
    </tr>`;
}

/**
 * Generates the customer booking confirmation HTML email.
 *
 * @param {Object} data
 * @param {string} data.businessName
 * @param {string} data.businessAddress
 * @param {string} data.jobAddress
 * @param {string} data.contactName
 * @param {string} data.email
 * @param {string} data.contactNumber
 * @param {string} data.accessHours
 * @returns {string} HTML string
 */
function customerEmailTemplate(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Booking Confirmation – Kept Cold</title>
</head>
<body style="margin:0;padding:0;background-color:#eef2f7;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#eef2f7;padding:36px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;border-radius:10px;overflow:hidden;
                       box-shadow:0 2px 16px rgba(0,0,0,0.10);">

          <!-- ── Header ──────────────────────────────────────────── -->
          <tr>
            <td style="background-color:#0d1b2a;padding:30px 36px 24px;">
              <table cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding-right:12px;">
                    <span style="display:inline-block;background-color:#14b8a6;
                                  color:#0d1b2a;font-size:13px;font-weight:800;
                                  letter-spacing:1.5px;padding:5px 14px;
                                  border-radius:4px;text-transform:uppercase;">
                      COLD
                    </span>
                  </td>
                  <td>
                    <span style="font-size:13px;letter-spacing:2px;color:#94a3b8;
                                  text-transform:uppercase;font-weight:600;">
                      KEPT
                    </span>
                  </td>
                </tr>
              </table>
              <h1 style="margin:14px 0 0;font-size:20px;color:#ffffff;font-weight:700;
                          letter-spacing:0.5px;">
                Booking Confirmation
              </h1>
            </td>
          </tr>

          <!-- ── Greeting ─────────────────────────────────────────── -->
          <tr>
            <td style="background-color:#ffffff;padding:30px 36px 12px;">
              <p style="margin:0 0 14px;font-size:15px;color:#0d1b2a;font-weight:600;">
                Dear ${escapeHtml(data.contactName)},
              </p>
              <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.7;">
                Thank you for reaching out to <strong>Kept Cold</strong>. We have
                successfully received your repair booking request and our team will be
                in touch with you shortly to confirm your engineer visit.
              </p>
            </td>
          </tr>

          <!-- ── Booking Summary ──────────────────────────────────── -->
          <tr>
            <td style="background-color:#ffffff;padding:20px 36px 28px;">
              <p style="margin:0 0 14px;font-size:11px;font-weight:700;color:#0d1b2a;
                          text-transform:uppercase;letter-spacing:1.5px;">
                Your Booking Summary
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">
                ${summaryRow('Business Name',    escapeHtml(data.businessName),    false)}
                ${summaryRow('Business Address', escapeHtml(data.businessAddress), true)}
                ${summaryRow('Job Address',      escapeHtml(data.jobAddress),      false)}
                ${summaryRow('Contact Name',     escapeHtml(data.contactName),     true)}
                ${summaryRow('Email Address',    escapeHtml(data.email),           false)}
                ${summaryRow('Contact Number',   escapeHtml(data.contactNumber),   true)}
                ${summaryRow('Access Hours',     escapeHtml(data.accessHours),     false, true)}
              </table>
            </td>
          </tr>

          <!-- ── Next steps ───────────────────────────────────────── -->
          <tr>
            <td style="background-color:#ffffff;padding:0 36px 28px;">
              <p style="margin:0 0 12px;font-size:14px;color:#4b5563;line-height:1.7;">
                A member of our team will contact you at the number or email address
                provided to arrange a convenient time for the engineer visit.
              </p>
              <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.7;">
                If you have any questions in the meantime, please do not hesitate to
                get in touch.
              </p>
            </td>
          </tr>

          <!-- ── Sign-off ─────────────────────────────────────────── -->
          <tr>
            <td style="background-color:#ffffff;padding:0 36px 32px;
                        border-bottom:3px solid #14b8a6;">
              <p style="margin:0;font-size:14px;color:#0d1b2a;line-height:1.7;">
                Kind regards,<br />
                <strong>The Kept Cold Team</strong>
              </p>
            </td>
          </tr>

          <!-- ── Footer ─────────────────────────────────────────────── -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 36px;
                        border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.7;
                          text-align:center;">
                This is an automated confirmation from Kept Cold.
                Please do not reply to this email.
              </p>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>

</body>
</html>`;
}

module.exports = { customerEmailTemplate };
