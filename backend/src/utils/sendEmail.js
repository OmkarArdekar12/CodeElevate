import axios from "axios";

export const sendEmail = async ({ to, subject, html, text }) => {
  if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
    throw new Error("Email provider is not configured");
  }

  await axios.post(
    "https://api.brevo.com/v3/smtp/email",
    {
      sender: {
        name: process.env.EMAIL_FROM_NAME || "CodeElevate",
        email: process.env.EMAIL_FROM,
      },
      to: [{ email: to }],
      subject,
      htmlContent: html,
      textContent: text,
    },
    {
      headers: {
        "api-key": process.env.BREVO_API_KEY,
        "Content-Type": "application/json",
        Accept: "application/json",
      },
      timeout: 10000,
    },
  );
};

const PURPOSE_CONTENT = {
  enable: {
    heading: "Turn on Two-Factor Authentication",
    lead: "Enter this code to verify your email and finish turning on 2FA.",
  },
  "link-email": {
    heading: "Verify your email",
    lead: "Enter this code to verify this email address for your account.",
  },
  reset: {
    heading: "Reset Two-Factor Authentication",
    lead: "Enter this code to confirm it's you before resetting 2FA.",
  },
};

const buildOtpEmailHtml = ({ otp, purpose, frontendUrl }) => {
  const mail = PURPOSE_CONTENT[purpose] || PURPOSE_CONTENT.enable;
  const logoUrl = `${frontendUrl}/icons/LogoCodeElevate-share.png`;

  const otpDisplay = `
  <div
    style="
      display:inline-block;
      padding:12px 20px;
      background-color:#FFFFFF;
      border-radius:8px;
      border:1px solid #CBD5E1;
      font-family:'Courier New',Courier,monospace;
      font-size:30px;
      line-height:40px;
      font-weight:750;
      letter-spacing:8px;
      color:#16A34A;
      text-align:center;
      white-space:nowrap;
    "
  >
    ${otp}
  </div>
`;

  return `<!doctype html>
<html lang="en">
<head>
<meta charset="utf-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<meta name="color-scheme" content="dark light">
<title>${mail.heading}</title>
</head>
<body style="margin:0;padding:0;background-color:transparent;font-family:-apple-system,BlinkMacSystemFont,'Segoe UI',Roboto,Helvetica,Arial,sans-serif;">
  <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="background-color:transparent;padding:32px 16px;">
    <tr>
      <td align="center">
        <table role="presentation" width="100%" cellpadding="0" cellspacing="0" border="0" style="max-width:480px;background-color:#1E2533;border:1px solid #2E3D5A;border-radius:12px;overflow:hidden;">

          <tr>
            <td align="center" style="padding:36px 32px 20px 32px;">
              <img src="${logoUrl}" width="56" height="56" alt="CodeElevate"
                   style="display:block;width:56px;height:56px;border-radius:50%;object-fit:cover;background-color:#0f172a;border:2px solid #FF932F;" />
              <div style="margin-top:16px;font-size:22px;line-height:28px;font-weight:700;color:#FFFFFF;letter-spacing:0.2px;">
                CodeElevate
              </div>
              <div style="margin-top:4px;font-size:13px;line-height:18px;color:#94A3B8;letter-spacing:1.2px;">
                Elevate Your Coding Journey
              </div>
            </td>
          </tr>

          <tr><td style="padding:0 32px;"><hr style="border:none;border-top:1px solid #2E3D5A;margin:0;"></td></tr>

          <tr>
            <td style="padding:28px 32px 8px 32px;">
              <div style="font-size:18px;line-height:26px;font-weight:600;color:#FFFFFF;text-align:center;">
                ${mail.heading}
              </div>
              <div style="margin-top:8px;font-size:14px;line-height:22px;color:#94A3B8;text-align:center;">
                ${mail.lead}
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:20px 32px 4px 32px;">
              ${otpDisplay}
            </td>
          </tr>

          <tr>
            <td align="center" style="padding:16px 32px 0 32px;">
              <span style="display:inline-block;padding:6px 14px;background-color:#0f172a;border-radius:999px;font-size:12px;color:#FDBA74;">
                Expires in 10 minutes
              </span>
            </td>
          </tr>

          <tr><td style="padding:28px 32px 0 32px;"><hr style="border:none;border-top:1px solid #2E3D5A;margin:0;"></td></tr>

          <tr>
            <td style="padding:20px 32px 36px 32px;">
              <div style="font-size:12px;line-height:18px;color:#64748B;text-align:center;">
                Didn't request this? You can safely ignore this email - your account is still secure.
              </div>
              <div style="margin-top:16px;font-size:11px;line-height:16px;color:#475569;text-align:center;">
                &copy; ${new Date().getFullYear()} CodeElevate. This is an automated message, please don't reply.
              </div>
            </td>
          </tr>

          <tr>
            <td align="center" style="padding: 3px">
              <a
                href="${frontendUrl}"
                target="_blank"
                style="
                  color:#60A5FA;
                  text-decoration:none;
                  font-size:14px;
                  font-weight:600;
                "
              >
                Visit CodeElevate
              </a>
            </td>
          </tr>

        </table>
      </td>
    </tr>
  </table>
</body>
</html>`;
};

export const sendOtpEmail = async ({ to, otp, purpose }) => {
  const mail = PURPOSE_CONTENT[purpose] || PURPOSE_CONTENT.enable;
  const frontendUrl = (process.env.FRONTEND_URL || "").replace(/\/$/, "");

  await sendEmail({
    to,
    subject: `${otp} is your CodeElevate verification code`,
    text: `${mail.heading}\n\nYour CodeElevate verification code is ${otp}. ${mail.lead}\nIt expires in 10 minutes. If you didn't request this, you can ignore this email.`,
    html: buildOtpEmailHtml({ otp, purpose, frontendUrl }),
  });
};

// import axios from "axios";

// export const sendEmail = async ({ to, subject, html, text }) => {
//   if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
//     throw new Error(
//       "Email provider is not configured (BREVO_API_KEY / EMAIL_FROM)",
//     );
//   }

//   await axios.post(
//     "https://api.brevo.com/v3/smtp/email",
//     {
//       sender: {
//         name: process.env.EMAIL_FROM_NAME || "CodeElevate",
//         email: process.env.EMAIL_FROM,
//       },
//       to: [{ email: to }],
//       subject,
//       htmlContent: html,
//       textContent: text,
//     },
//     {
//       headers: {
//         "api-key": process.env.BREVO_API_KEY,
//         "Content-Type": "application/json",
//         Accept: "application/json",
//       },
//       timeout: 10000,
//     },
//   );
// };

// const PURPOSE_TEXT = {
//   enable: "turn on Two-Factor Authentication",
//   "link-email": "link this email to your account",
//   reset: "reset Two-Factor Authentication",
// };

// export const sendOtpEmail = async ({ to, otp, purpose }) => {
//   const action = PURPOSE_TEXT[purpose] || "verify your email";
//   await sendEmail({
//     to,
//     subject: `${otp} is your CodeElevate verification code`,
//     text: `Your CodeElevate verification code is ${otp}. Use it to ${action}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`,
//     html: `
//       <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
//         <h2 style="margin:0 0 12px">CodeElevate</h2>
//         <p>Use this code to ${action}:</p>
//         <p style="font-size:32px;letter-spacing:8px;font-weight:bold;margin:16px 0">${otp}</p>
//         <p style="color:#6b7280;font-size:14px">This code expires in 10 minutes. If you didn't request it, you can safely ignore this email.</p>
//       </div>`,
//   });
// };
