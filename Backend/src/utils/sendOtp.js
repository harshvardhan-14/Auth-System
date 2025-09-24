async function sendOtpEmail(email, otp) {
  console.log(`OTP for ${email} : ${otp} `);
  // righ now just consoling it , will implement through nodemailer later
  return true;
}

export { sendOtpEmail };