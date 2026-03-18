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
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const ref           = escapeHtml(data.bookingReference || '');
  const priority      = data.calloutPriority  ? escapeHtml(data.calloutPriority)  : '&mdash;';
  const price         = data.totalPrice       ? escapeHtml(data.totalPrice)       : '&mdash;';
  const equipmentType = data.equipmentType    ? escapeHtml(data.equipmentType)    : '&mdash;';
  const faultDesc     = data.faultDescription ? escapeHtml(data.faultDescription) : '&mdash;';
  const attachCount   = data.attachments ? data.attachments.length : 12;
  console.log("attachment count:", attachCount, typeof attachCount);
  
  

  return `<!DOCTYPE html>
  
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>New Service Booking — Kept Cold</title>
</head>
<body style="margin:0;padding:0;background-color:#ebebeb;
             font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:#ebebeb;padding:28px 0;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px;width:100%;background-color:#ffffff;">

        <!-- ── HEADER ──────────────────────────────────────────────────── -->
        <tr>
          <td style="padding:16px 28px 12px;border-bottom:1px solid #dddddd;">
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td>
                  <span style="font-size:14px;font-weight:700;color:#111111;">
                    Kept Cold Ltd
                  </span>
                </td>
                <td align="right">
                  <span style="font-size:11px;color:#aaaaaa;">
                    ${formattedDate}
                  </span>
                </td>
              </tr>
              <tr>
                <td colspan="2" style="padding-top:2px;">
                  <span style="font-size:11px;color:#aaaaaa;font-style:italic;">
                    Commercial Refrigeration Services
                  </span>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── INTERNAL NOTIFICATION / TITLE / DESCRIPTION ─────────────── -->
        <tr>
          <td style="padding:22px 28px 0;">

            <p style="margin:0 0 8px;font-size:10px;color:#aaaaaa;
                       text-transform:uppercase;letter-spacing:1.8px;">
              Internal Notification
            </p>

            <h1 style="margin:0 0 12px;font-size:22px;font-weight:700;
                        color:#111111;line-height:1.3;
                        font-family:Georgia,'Times New Roman',serif;">
              New Service Booking Received
            </h1>

            <p style="margin:0 0 20px;font-size:13px;color:#555555;line-height:1.65;">
              A new service request has been submitted through the website. Please
              review the details below and arrange an engineer visit accordingly.
            </p>

            <!-- Booking Reference -->
            <table cellpadding="0" cellspacing="0" border="0"
                   style="margin-bottom:20px;">
              <tr>
                <td style="border:1px solid #cccccc;padding:9px 16px;">
                  <span style="font-size:10px;color:#aaaaaa;
                                text-transform:uppercase;letter-spacing:1.2px;">
                    Booking Reference&nbsp;&nbsp;
                  </span>
                  <span style="font-size:13px;font-weight:700;
                                color:#111111;letter-spacing:1.5px;">
                    ${ref}
                  </span>
                </td>
              </tr>
            </table>

          </td>
        </tr>

        <!-- ── CALL OUT PRIORITY ─────────────────────────────────────────── -->
        <tr>
          <td style="padding:0 28px 18px;">
            <p style="margin:0 0 5px;font-size:10px;color:#aaaaaa;
                       text-transform:uppercase;letter-spacing:1.8px;">
              Call Out Priority
            </p>
            <p style="margin:0;font-size:14px;line-height:1.5;">
              <strong style="color:#cc3300;">${priority}</strong>
              ${price ? `<span style="color:#777777;font-weight:400;">
                &nbsp;&mdash;&nbsp;${price} (paid)
              </span>` : ''}
            </p>
          </td>
        </tr>

        <!-- thin rule -->
        <tr>
          <td style="padding:0 28px;">
            <div style="border-top:1px solid #eeeeee;"></div>
          </td>
        </tr>

        <!-- ── BUSINESS DETAILS ──────────────────────────────────────────── -->
        <tr>
          <td style="padding:16px 28px 0;">
            <p style="margin:0 0 10px;font-size:10px;color:#aaaaaa;font-weight:700;
                       text-transform:uppercase;letter-spacing:1.8px;
                       border-bottom:1px solid #eeeeee;padding-bottom:7px;">
              Business Details
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#999999;
                            width:40%;border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  Business Name
                </td>
                <td style="padding:7px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  ${escapeHtml(data.businessName)}
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#999999;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  Business Address
                </td>
                <td style="padding:7px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  ${escapeHtml(data.businessAddress)}
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#999999;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  Job Address
                </td>
                <td style="padding:7px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  ${escapeHtml(data.jobAddress)}
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0 14px;font-size:12px;color:#999999;vertical-align:top;">
                  Site Access Hours
                </td>
                <td style="padding:7px 0 14px;font-size:12px;color:#111111;vertical-align:top;">
                  ${escapeHtml(data.accessHours)}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- thin rule -->
        <tr>
          <td style="padding:0 28px;">
            <div style="border-top:1px solid #eeeeee;"></div>
          </td>
        </tr>

        <!-- ── CONTACT INFORMATION ───────────────────────────────────────── -->
        <tr>
          <td style="padding:16px 28px 0;">
            <p style="margin:0 0 10px;font-size:10px;color:#aaaaaa;font-weight:700;
                       text-transform:uppercase;letter-spacing:1.8px;
                       border-bottom:1px solid #eeeeee;padding-bottom:7px;">
              Contact Information
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#999999;
                            width:40%;border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  Contact Name
                </td>
                <td style="padding:7px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  ${escapeHtml(data.contactName)}
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#999999;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  Phone
                </td>
                <td style="padding:7px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  ${escapeHtml(data.contactNumber)}
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0 14px;font-size:12px;color:#999999;vertical-align:top;">
                  Email
                </td>
                <td style="padding:7px 0 14px;font-size:12px;vertical-align:top;">
                  <a href="mailto:${escapeHtml(data.email)}"
                     style="color:#1a73e8;text-decoration:underline;">
                    ${escapeHtml(data.email)}
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- thin rule -->
        <tr>
          <td style="padding:0 28px;">
            <div style="border-top:1px solid #eeeeee;"></div>
          </td>
        </tr>

        <!-- ── JOB DETAILS ───────────────────────────────────────────────── -->
        <tr>
          <td style="padding:16px 28px 0;">
            <p style="margin:0 0 10px;font-size:10px;color:#aaaaaa;font-weight:700;
                       text-transform:uppercase;letter-spacing:1.8px;
                       border-bottom:1px solid #eeeeee;padding-bottom:7px;">
              Job Details
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:7px 0;font-size:12px;color:#999999;
                            width:40%;border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  Equipment Type
                </td>
                <td style="padding:7px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f5f5f5;vertical-align:top;">
                  ${equipmentType}
                </td>
              </tr>
              <tr>
                <td style="padding:7px 0 14px;font-size:12px;color:#999999;vertical-align:top;">
                  Fault Description
                </td>
                <td style="padding:7px 0 14px;font-size:12px;color:#111111;
                            line-height:1.55;vertical-align:top;">
                  ${faultDesc}
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- thin rule -->
        <tr>
          <td style="padding:0 28px;">
            <div style="border-top:1px solid #eeeeee;"></div>
          </td>
        </tr>

        <!-- ── PHOTOS ────────────────────────────────────────────────────── -->
        ${attachCount > 0 ? `<tr>
          <td style="padding:16px 28px 0;">
            <p style="margin:0 0 10px;font-size:10px;color:#aaaaaa;font-weight:700;
                       text-transform:uppercase;letter-spacing:1.8px;
                       border-bottom:1px solid #eeeeee;padding-bottom:7px;">
              Photos (${attachCount})
            </p>
            <table cellpadding="0" cellspacing="0" border="0" width="100%">
              ${data.attachments.filter(a => a.mimeType.startsWith('image/')).map(a => `<tr>
                <td style="padding:5px 0;font-size:12px;color:#111111;border-bottom:1px solid #f5f5f5;">
                  ${escapeHtml(a.filename)}
                </td>
              </tr>`).join('')}
            </table>
            <p style="margin:10px 0 0;font-size:11px;color:#aaaaaa;">
              See attached files in this email.
            </p>
          </td>
        </tr>
        <tr>
          <td style="padding:0 28px 0;">
            <div style="border-top:1px solid #eeeeee;margin-top:16px;"></div>
          </td>
        </tr>` : ''}

        <!-- ── FOOTER NOTE ───────────────────────────────────────────────── -->
        <tr>
          <td style="padding:18px 28px;">
            <p style="margin:0;font-size:12px;color:#555555;line-height:1.65;">
              This is an automated notification from the Kept Cold booking system.
              ${price && price !== '&mdash;' ? `Payment of <strong>${price}</strong> has been collected
              from the customer at time of booking.` : ''}
            </p>
            ${attachCount > 0 ? `<p style="margin:10px 0 0;font-size:12px;color:#555555;line-height:1.65;">
              <strong>${attachCount} attachment${attachCount === 1 ? '' : 's'}</strong> submitted with this booking — see attached file${attachCount === 1 ? '' : 's'}.
            </p>` : ''}
          </td>
        </tr>

        <!-- ── COMPANY FOOTER ────────────────────────────────────────────── -->
        <tr>
          <td style="padding:12px 28px 16px;border-top:1px solid #dddddd;">
            <p style="margin:0;font-size:11px;color:#777777;line-height:1.9;">
              <strong>Kept Cold Ltd</strong> | 020 8146 3671 |
              service@keptcold.co.uk | keptcold.co.uk
            </p>
            <p style="margin:1px 0 0;font-size:10px;color:#bbbbbb;">
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
