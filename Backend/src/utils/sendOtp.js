const nodemailer = require("nodemailer");





// Create a reusable transporter object using Gmail or custom SMTP
const transporter = nodemailer.createTransport({
  service: "gmail", 
  auth: {
    user: process.env.EMAIL_USER, 
    pass: process.env.EMAIL_PASS,
  },
});


async function sendOtpEmail(email, otp) {
  try {
    const mailOptions = {
      from: `"Auth System" <${process.env.EMAIL_USER}>`,
      to: email,
      subject: "Your OTP Code",
      text: `Your OTP code is: ${otp}. It is valid for 10 minutes.`,
      html: `<p>Your OTP code is: <b>${otp}</b></p><p>It is valid for 10 minutes.</p>`,
    };

    const info = await transporter.sendMail(mailOptions);
    console.log(" OTP email sent:", info.messageId);
    return true;
  } catch (err) {
    console.error(" Error sending OTP email:", err.message);
    return false;
  }
}

module.exports = sendOtpEmail;
