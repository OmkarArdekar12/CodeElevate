import axios from "axios";

export const sendEmail = async ({ to, subject, html, text }) => {
  if (!process.env.BREVO_API_KEY || !process.env.EMAIL_FROM) {
    throw new Error(
      "Email provider is not configured (BREVO_API_KEY / EMAIL_FROM)",
    );
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

const PURPOSE_TEXT = {
  enable: "turn on Two-Factor Authentication",
  "link-email": "link this email to your account",
  reset: "reset Two-Factor Authentication",
};

export const sendOtpEmail = async ({ to, otp, purpose }) => {
  const action = PURPOSE_TEXT[purpose] || "verify your email";
  await sendEmail({
    to,
    subject: `${otp} is your CodeElevate verification code`,
    text: `Your CodeElevate verification code is ${otp}. Use it to ${action}. It expires in 10 minutes. If you didn't request this, you can ignore this email.`,
    html: `
      <div style="font-family:Arial,sans-serif;max-width:480px;margin:auto;padding:24px;border:1px solid #e5e7eb;border-radius:8px">
        <h2 style="margin:0 0 12px">CodeElevate</h2>
        <p>Use this code to ${action}:</p>
        <p style="font-size:32px;letter-spacing:8px;font-weight:bold;margin:16px 0">${otp}</p>
        <p style="color:#6b7280;font-size:14px">This code expires in 10 minutes. If you didn't request it, you can safely ignore this email.</p>
      </div>`,
  });
};
