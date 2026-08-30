const nodemailer = require("nodemailer");

const transporter = nodemailer.createTransport({
  host: "smtp.gmail.com",
  port: 465,
  secure: true,

  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },

  tls: {
    rejectUnauthorized: false,
  },
});

// =========================
// SEND EMAIL
// =========================

const sendEmail = async (
  email,
  subject,
  text
) => {
  try {
    await transporter.sendMail({
      from: `"Zerodha Clone" <${process.env.EMAIL_USER}>`,
      to: email,
      subject,
      text,
    });

    console.log(
      "✅ Email Sent:",
      email
    );

  } catch (err) {
    console.error(
      "❌ EMAIL ERROR:",
      err
    );

    throw err;
  }
};

module.exports = sendEmail;