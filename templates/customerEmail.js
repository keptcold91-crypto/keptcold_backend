'use strict';

function escapeHtml(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#039;');
}

function customerEmailTemplate(data) {
  const formattedDate = new Date().toLocaleDateString('en-GB', {
    day: 'numeric', month: 'long', year: 'numeric',
  });

  const ref           = escapeHtml(data.bookingReference || '');
  const priority      = data.calloutPriority  ? escapeHtml(data.calloutPriority)  : '&mdash;';
  const price         = data.totalWithVAT    ? escapeHtml(data.totalWithVAT)    : '&mdash;';
  const equipmentType = data.equipmentType    ? escapeHtml(data.equipmentType)    : '&mdash;';
  const firstName     = escapeHtml((data.contactName || '').split(' ')[0]);

  return `<!DOCTYPE html>
<html lang="en">
<head>
  <meta charset="UTF-8" />
  <meta name="viewport" content="width=device-width,initial-scale=1.0" />
  <title>Booking Confirmation — Kept Cold</title>
</head>
<body style="margin:0;padding:0;background-color:#e8e8e8;
             font-family:Arial,Helvetica,sans-serif;">

<table width="100%" cellpadding="0" cellspacing="0" border="0"
       style="background-color:#e8e8e8;padding:28px 0;">
  <tr>
    <td align="center">

      <table width="600" cellpadding="0" cellspacing="0" border="0"
             style="max-width:600px;width:100%;background-color:#ffffff;
                     border:1px solid #d0d0d0;">

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
                  <span style="font-size:11px;color:#aaaaaa;">${formattedDate}</span>
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

        <!-- ── BOOKING CONFIRMATION / TITLE / INTRO ─────────────────────── -->
        <tr>
          <td style="padding:24px 28px 0;">

            <p style="margin:0 0 8px;font-size:10px;color:#aaaaaa;
                       text-transform:uppercase;letter-spacing:1.8px;">
              Booking Confirmation
            </p>

            <h1 style="margin:0 0 16px;font-size:22px;font-weight:700;
                        color:#0d1b2a;line-height:1.3;
                        font-family:Georgia,'Times New Roman',serif;">
              Your Booking is Confirmed
            </h1>

            <p style="margin:0 0 6px;font-size:13px;color:#333333;line-height:1.6;">
              Dear ${firstName},
            </p>
            <p style="margin:0 0 22px;font-size:13px;color:#444444;line-height:1.65;">
              Thank you for booking with Kept Cold. We have received your service
              request and a member of our team will be in touch shortly to confirm
              your engineer&#8217;s attendance time.
            </p>

            <!-- Booking Reference box -->
            <table cellpadding="0" cellspacing="0" border="0"
                   style="margin-bottom:8px;">
              <tr>
                <td style="border:1px solid #cccccc;padding:10px 18px;">
                  <span style="font-size:10px;color:#aaaaaa;
                                text-transform:uppercase;letter-spacing:1.2px;">
                    Booking Reference&nbsp;&nbsp;
                  </span>
                  <span style="font-size:14px;font-weight:700;
                                color:#0d1b2a;letter-spacing:1.5px;">
                    ${ref}
                  </span>
                </td>
              </tr>
            </table>
            <p style="margin:0 0 22px;font-size:11px;color:#aaaaaa;line-height:1.5;">
              Please quote this reference in any correspondence with us.
            </p>

          </td>
        </tr>

        <!-- thin rule -->
        <tr>
          <td style="padding:0 28px;">
            <div style="border-top:1px solid #eeeeee;"></div>
          </td>
        </tr>

        <!-- ── BOOKING SUMMARY ───────────────────────────────────────────── -->
        <tr>
          <td style="padding:18px 28px 0;">
            <p style="margin:0 0 12px;font-size:10px;color:#aaaaaa;font-weight:700;
                       text-transform:uppercase;letter-spacing:1.8px;">
              Booking Summary
            </p>
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="padding:8px 0;font-size:12px;color:#888888;
                            width:38%;border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  Business
                </td>
                <td style="padding:8px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  ${escapeHtml(data.businessName)}
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:12px;color:#888888;
                            border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  Job Address
                </td>
                <td style="padding:8px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  ${escapeHtml(data.jobAddress)}
                </td>
              </tr>
              <tr>
                <td style="padding:8px 0;font-size:12px;color:#888888;
                            border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  Equipment
                </td>
                <td style="padding:8px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  ${equipmentType}
                </td>
              </tr>
              ${priority && priority !== '&mdash;' ? `<tr>
                <td style="padding:8px 0;font-size:12px;color:#888888;
                            border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  Service
                </td>
                <td style="padding:8px 0;font-size:12px;color:#111111;
                            border-bottom:1px solid #f0f0f0;vertical-align:top;">
                  ${priority}
                </td>
              </tr>` : ''}
              <tr>
                <td style="padding:8px 0 16px;font-size:12px;color:#888888;vertical-align:top;">
                  Amount Paid
                </td>
                <td style="padding:8px 0 16px;font-size:12px;color:#111111;vertical-align:top;">
                  ${price}
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

        <!-- ── WHAT TO EXPECT ────────────────────────────────────────────── -->
        <tr>
          <td style="padding:18px 28px 0;">
            <p style="margin:0 0 14px;font-size:10px;color:#aaaaaa;font-weight:700;
                       text-transform:uppercase;letter-spacing:1.8px;">
              What to Expect
            </p>

            <!-- Step 1 -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="margin-bottom:14px;">
              <tr>
                <td style="width:32px;vertical-align:top;padding-top:1px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:26px;height:26px;background-color:#0d1b2a;
                                  border-radius:50%;text-align:center;vertical-align:middle;">
                        <span style="font-size:12px;font-weight:700;color:#ffffff;
                                      line-height:26px;display:block;">1</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="padding-left:12px;font-size:12px;color:#444444;
                            line-height:1.6;vertical-align:top;">
                  <strong style="color:#111111;">We review your booking</strong>
                  and assign the right engineer for your equipment and fault.
                </td>
              </tr>
            </table>

            <!-- Step 2 -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="margin-bottom:14px;">
              <tr>
                <td style="width:32px;vertical-align:top;padding-top:1px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:26px;height:26px;background-color:#0d1b2a;
                                  border-radius:50%;text-align:center;vertical-align:middle;">
                        <span style="font-size:12px;font-weight:700;color:#ffffff;
                                      line-height:26px;display:block;">2</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="padding-left:12px;font-size:12px;color:#444444;
                            line-height:1.6;vertical-align:top;">
                  <strong style="color:#111111;">We will contact you</strong>
                  on ${escapeHtml(data.contactNumber)} to confirm your
                  engineer&#8217;s estimated arrival time.
                </td>
              </tr>
            </table>

            <!-- Step 3 -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0"
                   style="margin-bottom:20px;">
              <tr>
                <td style="width:32px;vertical-align:top;padding-top:1px;">
                  <table cellpadding="0" cellspacing="0" border="0">
                    <tr>
                      <td style="width:26px;height:26px;background-color:#0d1b2a;
                                  border-radius:50%;text-align:center;vertical-align:middle;">
                        <span style="font-size:12px;font-weight:700;color:#ffffff;
                                      line-height:26px;display:block;">3</span>
                      </td>
                    </tr>
                  </table>
                </td>
                <td style="padding-left:12px;font-size:12px;color:#444444;
                            line-height:1.6;vertical-align:top;">
                  <strong style="color:#111111;">Your engineer arrives</strong>,
                  carries out a full diagnosis, and discusses all findings with
                  you before any repairs begin.
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

        <!-- ── NEED TO SPEAK TO US? ──────────────────────────────────────── -->
        <tr>
          <td style="padding:18px 28px 22px;">
            <p style="margin:0 0 10px;font-size:10px;color:#aaaaaa;font-weight:700;
                       text-transform:uppercase;letter-spacing:1.8px;">
              Need to Speak to Us?
            </p>
            <p style="margin:0 0 20px;font-size:12px;color:#444444;line-height:1.65;">
              If you have any questions about your booking, please do not hesitate
              to get in touch. Please quote your reference
              <strong style="color:#0d1b2a;">${ref}</strong>
              when contacting us.
            </p>

            <!-- CTA Buttons -->
            <table width="100%" cellpadding="0" cellspacing="0" border="0">
              <tr>
                <td style="width:50%;padding-right:6px;">
                  <a href="tel:02081463071"
                     style="display:block;background-color:#0d1b2a;color:#ffffff;
                             font-size:12px;font-weight:700;text-align:center;
                             padding:13px 10px;text-decoration:none;
                             border-radius:4px;letter-spacing:0.3px;">
                    &#128222;&nbsp; Call Us: 020 8146 3071
                  </a>
                </td>
                <td style="width:50%;padding-left:6px;">
                  <a href="mailto:service@keptcold.co.uk"
                     style="display:block;background-color:#ffffff;color:#0d1b2a;
                             font-size:12px;font-weight:700;text-align:center;
                             padding:12px 10px;text-decoration:none;
                             border-radius:4px;letter-spacing:0.3px;
                             border:1px solid #0d1b2a;">
                    &#9993;&nbsp; Email Us
                  </a>
                </td>
              </tr>
            </table>
          </td>
        </tr>

        <!-- ── COMPANY FOOTER ────────────────────────────────────────────── -->
        <tr>
          <td style="padding:12px 28px 16px;border-top:1px solid #dddddd;">
            <p style="margin:0;font-size:11px;color:#777777;line-height:1.9;">
              <strong>Kept Cold Ltd</strong> | 020 8146 3071 |
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

module.exports = { customerEmailTemplate };
