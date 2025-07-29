require("dotenv").config();
const nodemailer = require("nodemailer");

// Configure Email Transporter
const transporter = nodemailer.createTransport({
  service: "gmail",
  auth: {
    user: process.env.EMAIL_USER,
    pass: process.env.EMAIL_PASS,
  },
});

const sendOTPEmail = async (toEmail, otp) => {
  try {
    const info = await transporter.sendMail({
      from: process.env.EMAIL_USER,
      to: toEmail,
      subject: "Your OTP Code",
      html: `<p>Your OTP code is <b>${otp}</b>. It is valid for 10 minutes.</p>`,
    });

    console.log("OTP Email sent:", info.messageId);
  } catch (error) {
    console.error("Error sending OTP email:", error);
    throw error;
  }
};

module.exports = sendOTPEmail;
