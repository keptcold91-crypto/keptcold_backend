'use strict';

/**
 * Escapes HTML special characters to prevent XSS.
 * All user-submitted data must be escaped before inserting into HTML.
 */
function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

/**
 * Generates the admin alert HTML email — dark navy Kept Cold branding.
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
function adminEmailTemplate(data) {
  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>Kept Cold Booking Alert</title>
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
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
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
                          <span style="font-size:13px;letter-spacing:2.5px;color:#94a3b8;
                                        text-transform:uppercase;font-weight:600;">
                            KEPT &nbsp;&nbsp; BOOKING ALERT
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Sub-header bar ──────────────────────────────────── -->
          <tr>
            <td style="background-color:#f0f9ff;padding:14px 36px;
                        border-left:4px solid #14b8a6;">
              <p style="margin:0;font-size:13px;color:#0d1b2a;font-weight:600;">
                <span style="display:inline-block;width:9px;height:9px;
                              background-color:#14b8a6;border-radius:50%;
                              margin-right:8px;vertical-align:middle;"></span>
                New Customer Booking Received
              </p>
            </td>
          </tr>

          <!-- ── Body intro ───────────────────────────────────────── -->
          <tr>
            <td style="background-color:#ffffff;padding:28px 36px 20px;">
              <h2 style="margin:0 0 12px;font-size:22px;color:#0d1b2a;font-weight:700;">
                New Repair Booking
              </h2>
              <p style="margin:0;font-size:14px;color:#4b5563;line-height:1.7;">
                Hi Kept Cold team &mdash; a new service request has just been submitted
                through the website. Please review the details below and arrange an
                engineer visit accordingly.
              </p>
            </td>
          </tr>

          <!-- ── BOOKING DETAILS table ────────────────────────────── -->
          <tr>
            <td style="background-color:#ffffff;padding:4px 36px 24px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">

                <!-- Table header -->
                <tr>
                  <td colspan="2"
                      style="background-color:#0d1b2a;padding:13px 18px;">
                    <table width="100%" cellpadding="0" cellspacing="0" border="0">
                      <tr>
                        <td>
                          <span style="font-size:11px;font-weight:700;color:#ffffff;
                                        text-transform:uppercase;letter-spacing:1.5px;">
                            BOOKING DETAILS
                          </span>
                        </td>
                        <td align="right">
                          <span style="background-color:#d97706;color:#ffffff;
                                        font-size:11px;font-weight:700;padding:3px 11px;
                                        border-radius:20px;letter-spacing:0.5px;">
                            &#9889; New Request
                          </span>
                        </td>
                      </tr>
                    </table>
                  </td>
                </tr>

                <!-- Business Name -->
                <tr>
                  <td style="padding:13px 18px;font-size:12px;color:#6b7280;
                              font-weight:700;width:38%;text-transform:uppercase;
                              letter-spacing:0.8px;border-bottom:1px solid #f1f5f9;
                              background-color:#f8fafc;">
                    BUSINESS NAME
                  </td>
                  <td style="padding:13px 18px;font-size:13px;color:#0d1b2a;
                              font-weight:700;border-bottom:1px solid #f1f5f9;
                              background-color:#f8fafc;">
                    ${escapeHtml(data.businessName)}
                  </td>
                </tr>

                <!-- Business Address -->
                <tr>
                  <td style="padding:13px 18px;font-size:12px;color:#6b7280;
                              font-weight:700;width:38%;text-transform:uppercase;
                              letter-spacing:0.8px;border-bottom:1px solid #f1f5f9;">
                    BUSINESS ADDRESS
                  </td>
                  <td style="padding:13px 18px;font-size:13px;color:#0d1b2a;
                              font-weight:600;border-bottom:1px solid #f1f5f9;">
                    ${escapeHtml(data.businessAddress)}
                  </td>
                </tr>

                <!-- Job Address -->
                <tr>
                  <td style="padding:13px 18px;font-size:12px;color:#6b7280;
                              font-weight:700;width:38%;text-transform:uppercase;
                              letter-spacing:0.8px;background-color:#f8fafc;">
                    JOB ADDRESS
                  </td>
                  <td style="padding:13px 18px;font-size:13px;color:#0d1b2a;
                              font-weight:600;background-color:#f8fafc;">
                    ${escapeHtml(data.jobAddress)}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ── SITE & CONTACT INFORMATION table ─────────────────── -->
          <tr>
            <td style="background-color:#ffffff;padding:0 36px 28px;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0"
                     style="border:1px solid #e2e8f0;border-radius:8px;overflow:hidden;">

                <!-- Table header -->
                <tr>
                  <td colspan="2"
                      style="background-color:#0d1b2a;padding:13px 18px;">
                    <span style="font-size:11px;font-weight:700;color:#ffffff;
                                  text-transform:uppercase;letter-spacing:1.5px;">
                      SITE &amp; CONTACT INFORMATION
                    </span>
                  </td>
                </tr>

                <!-- Contact Name -->
                <tr>
                  <td style="padding:13px 18px;font-size:12px;color:#6b7280;
                              font-weight:700;width:38%;text-transform:uppercase;
                              letter-spacing:0.8px;border-bottom:1px solid #f1f5f9;
                              background-color:#f8fafc;">
                    CONTACT NAME
                  </td>
                  <td style="padding:13px 18px;font-size:13px;color:#0d1b2a;
                              font-weight:700;border-bottom:1px solid #f1f5f9;
                              background-color:#f8fafc;">
                    ${escapeHtml(data.contactName)}
                  </td>
                </tr>

                <!-- Email Address -->
                <tr>
                  <td style="padding:13px 18px;font-size:12px;color:#6b7280;
                              font-weight:700;width:38%;text-transform:uppercase;
                              letter-spacing:0.8px;border-bottom:1px solid #f1f5f9;">
                    EMAIL ADDRESS
                  </td>
                  <td style="padding:13px 18px;font-size:13px;
                              font-weight:600;border-bottom:1px solid #f1f5f9;">
                    <a href="mailto:${escapeHtml(data.email)}"
                       style="color:#0ea5e9;text-decoration:none;">
                      ${escapeHtml(data.email)}
                    </a>
                  </td>
                </tr>

                <!-- Contact Number -->
                <tr>
                  <td style="padding:13px 18px;font-size:12px;color:#6b7280;
                              font-weight:700;width:38%;text-transform:uppercase;
                              letter-spacing:0.8px;border-bottom:1px solid #f1f5f9;
                              background-color:#f8fafc;">
                    CONTACT NUMBER
                  </td>
                  <td style="padding:13px 18px;font-size:13px;
                              font-weight:600;border-bottom:1px solid #f1f5f9;
                              background-color:#f8fafc;">
                    <a href="tel:${escapeHtml(data.contactNumber)}"
                       style="color:#0ea5e9;text-decoration:none;">
                      ${escapeHtml(data.contactNumber)}
                    </a>
                  </td>
                </tr>

                <!-- Access Hours -->
                <tr>
                  <td style="padding:13px 18px;font-size:12px;color:#6b7280;
                              font-weight:700;width:38%;text-transform:uppercase;
                              letter-spacing:0.8px;">
                    ACCESS HOURS
                  </td>
                  <td style="padding:13px 18px;font-size:13px;color:#0d1b2a;
                              font-weight:600;">
                    ${escapeHtml(data.accessHours)}
                  </td>
                </tr>

              </table>
            </td>
          </tr>

          <!-- ── Call Customer Now Button ───────────────────────────── -->
          <tr>
            <td style="background-color:#ffffff;padding:0 36px 36px;text-align:center;">
              <a href="tel:${escapeHtml(data.contactNumber)}"
                 style="display:inline-block;background-color:#0d1b2a;color:#ffffff;
                         font-size:14px;font-weight:700;padding:15px 36px;
                         border-radius:6px;text-decoration:none;letter-spacing:0.5px;">
                &#128222; &nbsp;Call Customer Now
              </a>
            </td>
          </tr>

          <!-- ── Footer ─────────────────────────────────────────────── -->
          <tr>
            <td style="background-color:#f8fafc;padding:20px 36px;
                        border-top:1px solid #e2e8f0;">
              <p style="margin:0;font-size:12px;color:#9ca3af;line-height:1.7;
                          text-align:center;">
                This is an automated notification from the Kept Cold booking system.
                Please ensure a timely response for this service request.
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

module.exports = { adminEmailTemplate };
