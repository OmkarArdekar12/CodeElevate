import nodemailer from "nodemailer";

const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

export const sendOtpEmail = async (toEmail, otp) => {
  await transporter.sendMail({
    from: `"CodeElevate" <${process.env.EMAIL_USER}>`,
    to: toEmail,
    subject: "CodeElevate - Your verification OTP",
    html: `
      <div style="font-family:sans-serif;max-width:400px">
        <h2>CodeElevate Verification</h2>
        <p>Your OTP is:</p>
        <h1 style="letter-spacing:8px;color:#3b82f6">${otp}</h1>
        <p>This OTP expires in <strong>10 minutes</strong>.</p>
        <p style="color:#888;font-size:12px">If you didn't request this, ignore this email.</p>
      </div>
    `,
  });
};
