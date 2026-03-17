'use strict';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function adminEmailTemplate(data) {
  const date = new Date();
  const formattedDate = date.toLocaleDateString('en-GB', {
    day: 'numeric',
    month: 'long',
    year: 'numeric',
  });

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1.0" />
  <title>New Service Booking — Kept Cold</title>
</head>
<body style="margin:0;padding:0;background-color:#ebebeb;font-family:Arial,Helvetica,sans-serif;">

  <table width="100%" cellpadding="0" cellspacing="0" border="0"
         style="background-color:#ebebeb;padding:30px 0;">
    <tr>
      <td align="center">
        <table width="600" cellpadding="0" cellspacing="0" border="0"
               style="max-width:600px;width:100%;background-color:#ffffff;
                       box-shadow:0 1px 6px rgba(0,0,0,0.13);">

          <!-- ── Header ────────────────────────────────────────────────── -->
          <tr>
            <td style="padding:18px 30px 14px;border-bottom:1px solid #dddddd;">
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td>
                    <span style="font-size:15px;font-weight:700;color:#111111;letter-spacing:0.3px;">
                      Kept Cold Ltd
                    </span>
                  </td>
                  <td align="right">
                    <span style="font-size:12px;color:#999999;">
                      ${formattedDate}
                    </span>
                  </td>
                </tr>
                <tr>
                  <td colspan="2" style="padding-top:3px;">
                    <span style="font-size:12px;color:#999999;font-style:italic;">
                      Commercial Refrigeration Services
                    </span>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Body ──────────────────────────────────────────────────── -->
          <tr>
            <td style="padding:26px 30px 0;">

              <!-- Internal Notification label -->
              <p style="margin:0 0 8px;font-size:11px;color:#999999;
                          text-transform:uppercase;letter-spacing:1.5px;">
                Internal Notification
              </p>

              <!-- Title -->
              <h1 style="margin:0 0 13px;font-size:22px;font-weight:700;
                          color:#111111;line-height:1.3;">
                New Service Booking Received
              </h1>

              <!-- Description -->
              <p style="margin:0 0 22px;font-size:14px;color:#555555;line-height:1.65;">
                A new service request has been submitted through the website. Please
                review the detail below and arrange an engineer visit accordingly.
              </p>

              <!-- Booking Reference button -->
              <table cellpadding="0" cellspacing="0" border="0" style="margin-bottom:22px;">
                <tr>
                  <td style="background-color:#2e7d32;border-radius:4px;padding:10px 20px;">
                    <span style="font-size:13px;font-weight:700;color:#ffffff;
                                  letter-spacing:1px;text-transform:uppercase;">
                      Booking Reference &nbsp;&nbsp; ${escapeHtml(data.bookingReference)}
                    </span>
                  </td>
                </tr>
              </table>

            </td>
          </tr>

          <!-- ── Call Out Priority ──────────────────────────────────────── -->
          <tr>
            <td style="padding:0 30px 22px;">
              <p style="margin:0 0 7px;font-size:11px;color:#999999;
                          text-transform:uppercase;letter-spacing:1.5px;">
                Call Out Priority
              </p>
              <table cellpadding="0" cellspacing="0" border="0" width="100%">
                <tr>
                  <td style="border-left:4px solid #2e7d32;padding-left:14px;">
                    <p style="margin:0;font-size:14px;font-weight:700;
                                color:#cc2200;line-height:1.5;">
                      ${escapeHtml(data.calloutPriority)}
                      <span style="color:#555555;font-weight:400;">
                        &mdash; ${escapeHtml(data.price)} (paid)
                      </span>
                    </p>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Divider strip ──────────────────────────────────────────── -->
          <tr><td style="height:8px;background-color:#f5f5f5;"></td></tr>

          <!-- ── Business Details ───────────────────────────────────────── -->
          <tr>
            <td style="padding:20px 30px 4px;">
              <p style="margin:0 0 12px;font-size:11px;color:#999999;font-weight:700;
                          text-transform:uppercase;letter-spacing:1.5px;
                          border-bottom:1px solid #eeeeee;padding-bottom:8px;">
                Business Details
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:7px 0;font-size:12px;color:#999999;width:42%;vertical-align:top;">
                    Business Name
                  </td>
                  <td style="padding:7px 0;font-size:13px;color:#111111;font-weight:600;vertical-align:top;">
                    ${escapeHtml(data.businessName)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:12px;color:#999999;vertical-align:top;">
                    Business Address
                  </td>
                  <td style="padding:7px 0;font-size:13px;color:#111111;font-weight:600;vertical-align:top;">
                    ${escapeHtml(data.businessAddress)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:12px;color:#999999;vertical-align:top;">
                    Job Address
                  </td>
                  <td style="padding:7px 0;font-size:13px;color:#111111;font-weight:600;vertical-align:top;">
                    ${escapeHtml(data.jobAddress)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0 16px;font-size:12px;color:#999999;vertical-align:top;">
                    Site Access Hours
                  </td>
                  <td style="padding:7px 0 16px;font-size:13px;color:#111111;font-weight:600;vertical-align:top;">
                    ${escapeHtml(data.accessHours)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Divider strip ──────────────────────────────────────────── -->
          <tr><td style="height:8px;background-color:#f5f5f5;"></td></tr>

          <!-- ── Contact Information ────────────────────────────────────── -->
          <tr>
            <td style="padding:20px 30px 4px;">
              <p style="margin:0 0 12px;font-size:11px;color:#999999;font-weight:700;
                          text-transform:uppercase;letter-spacing:1.5px;
                          border-bottom:1px solid #eeeeee;padding-bottom:8px;">
                Contact Information
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:7px 0;font-size:12px;color:#999999;width:42%;vertical-align:top;">
                    Contact Name
                  </td>
                  <td style="padding:7px 0;font-size:13px;color:#111111;font-weight:600;vertical-align:top;">
                    ${escapeHtml(data.contactName)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0;font-size:12px;color:#999999;vertical-align:top;">
                    Phone
                  </td>
                  <td style="padding:7px 0;font-size:13px;color:#111111;font-weight:600;vertical-align:top;">
                    ${escapeHtml(data.contactNumber)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0 16px;font-size:12px;color:#999999;vertical-align:top;">
                    Email
                  </td>
                  <td style="padding:7px 0 16px;font-size:13px;vertical-align:top;">
                    <a href="mailto:${escapeHtml(data.email)}"
                       style="color:#1565c0;text-decoration:none;">
                      ${escapeHtml(data.email)}
                    </a>
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Divider strip ──────────────────────────────────────────── -->
          <tr><td style="height:8px;background-color:#f5f5f5;"></td></tr>

          <!-- ── Job Details ────────────────────────────────────────────── -->
          <tr>
            <td style="padding:20px 30px 4px;">
              <p style="margin:0 0 12px;font-size:11px;color:#999999;font-weight:700;
                          text-transform:uppercase;letter-spacing:1.5px;
                          border-bottom:1px solid #eeeeee;padding-bottom:8px;">
                Job Details
              </p>
              <table width="100%" cellpadding="0" cellspacing="0" border="0">
                <tr>
                  <td style="padding:7px 0;font-size:12px;color:#999999;width:42%;vertical-align:top;">
                    Equipment Type
                  </td>
                  <td style="padding:7px 0;font-size:13px;color:#111111;font-weight:600;vertical-align:top;">
                    ${escapeHtml(data.equipmentType)}
                  </td>
                </tr>
                <tr>
                  <td style="padding:7px 0 16px;font-size:12px;color:#999999;vertical-align:top;">
                    Fault Description
                  </td>
                  <td style="padding:7px 0 16px;font-size:13px;color:#111111;font-weight:400;vertical-align:top;">
                    ${escapeHtml(data.faultDescription)}
                  </td>
                </tr>
              </table>
            </td>
          </tr>

          <!-- ── Divider strip ──────────────────────────────────────────── -->
          <tr><td style="height:8px;background-color:#f5f5f5;"></td></tr>

          <!-- ── Footer note ────────────────────────────────────────────── -->
          <tr>
            <td style="padding:20px 30px;">
              <p style="margin:0;font-size:13px;color:#555555;line-height:1.65;">
                This is an automated notification from the Kept Cold booking system.
                Payment of <strong>${escapeHtml(data.price)}</strong> has been
                collected from the customer at time of booking.
              </p>
            </td>
          </tr>

          <!-- ── Company footer ─────────────────────────────────────────── -->
          <tr>
            <td style="padding:14px 30px 18px;border-top:1px solid #dddddd;
                        background-color:#f8f8f8;">
              <p style="margin:0;font-size:11px;color:#777777;line-height:2;">
                <strong>Kept Cold Ltd</strong> | 020 8146 3671 |
                service@keptcold.co.uk | keptcold.co.uk
              </p>
              <p style="margin:3px 0 0;font-size:11px;color:#bbbbbb;">
                &copy; 2026 Kept Cold Ltd. All rights reserved.
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
