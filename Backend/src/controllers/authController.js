const bcrypt = require('bcrypt');
const User = require('../models/user.js');
const generateToken = require('../utils/generateToken');
const generateOTP = require('../utils/generateOTP');
const sendOtpEmail = require('../utils/sendOtp');

const SALT_ROUNDS = 10;
const OTP_EXPIRES_MINUTES = 10;

// Signup 

const signup = async (req, res) => {
 try{
    const{name , email , password} = req.body;


    if(!name || !email || !password){
        return res.status(400).json({message : "All fields are required"});
    }

    if (password.length < 8) {
      return res.status(400).json({ message: "Password must be at least 8 characters" });
    }

   

    const existing = await User.findOne({ email });
    if (existing) {
      ;
      return res.status(400).json({ message: "User already exists" });
    } else {
      
    }
    const hashedPassword = await bcrypt.hash(password, SALT_ROUNDS);

    const user = await User.create({
        name,
        email,
        password: hashedPassword,
        role: req.body.role 
    });

    const token = generateToken(user);
    res.cookie("token", token, {
        maxAge: 60 * 60 * 1000,
    });

    return res.status(201).json({ message: "Signup successful", role: user.role });
  } catch (err) {
    return res.status(500).json({ message: "Server error", error: err.message });
  }


};

// Login

const login = async (req, res) => {

try{
     const { email, password } = req.body;

    if (!email || !password) {
      return res.status(400).json({ message: "All fields are required" });
    }

     const user = await User.findOne({ email });
    if (!user) return res.status(400).json({ message: "Invalid credentials" });

const match = await bcrypt.compare(password, user.password);
    if (!match) return res.status(400).json({ message: "Invalid credentials" });

      const token = generateToken(user);
    res.cookie("token", token, {
      maxAge: 60 * 60 * 1000,
    });
    return res.json({ message: "Login successful", role: user.role });
}catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

}

//Logout 

const logout = (req, res) => {
        res.clearCookie("token");
  return res.json({ message: "Logged out successfully" });
}

// Request reset password

const requestPasswordReset = async (req, res) => {
  
const { email } = req.body;
  if (!email) return res.status(400).json({ message: "Email required" });

  try {
    const user = await User.findOne({ email });
    if (!user) {
      // Don’t reveal user existence
      return res.status(200).json({ message: "If the email exists, an OTP has been sent" });
    }

    const otp = generateOTP();
    const otphash = await bcrypt.hash(otp, SALT_ROUNDS);

    user.resetotphash = otphash;
    user.resetotpexpiry = new Date(Date.now() + OTP_EXPIRES_MINUTES * 60 * 1000);
    user.resetAttempt = 0;
    await user.save();

    await sendOtpEmail(email, otp);
    

    return res.json({ message: "If the email exists, an OTP has been sent" });
  } catch (err) {
  console.error("Password reset error:", err); // full error in terminal
  return res
    .status(500)
    .json({ message: "Server error", error: err.message });
}


}

// Reset Password

const resetPassword = async (req, res) => {

const { email, otp, newPassword, confirmPassword } = req.body;

if (!email || !otp || !newPassword || !confirmPassword) {
    return res.status(400).json({ message: "All fields are required" });
  }
  if (newPassword !== confirmPassword) {
    return res.status(400).json({ message: "Passwords do not match" });
  }
  if (newPassword.length < 8) {
    return res.status(400).json({ message: "Password must be at least 8 characters" });
  }

  try {
    const user = await User.findOne({ email });
    if (!user || !user.resetotphash || !user.resetotpexpiry) {
      return res.status(400).json({ message: "Invalid or expired OTP" });
    }

    if (user.resetotpexpiry < new Date()) {
      user.resetotphash = null;
      user.resetotpexpiry = null;
      user.resetAttempt = 0;
      await user.save();
      return res.status(400).json({ message: "OTP expired" });
    }

    if (user.resetAttempt >= 5) {
      return res.status(429).json({ message: "Too many attempts" });
    }

    const match = await bcrypt.compare(otp, user.resetotphash);
    if (!match) {
      user.resetAttempt = (user.resetAttempt || 0) + 1;
      await user.save();
      return res.status(400).json({ message: "Invalid OTP" });
    }

    user.password = await bcrypt.hash(newPassword, SALT_ROUNDS);
    user.resetotphash = null;
    user.resetotpexpiry = null;
    user.resetAttempt = 0;
    await user.save();

    return res.json({ message: "Password reset successful" });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }

}


const getProfile = async (req, res) => {
  try {
    const user = await User.findById(req.user.id).select("-password -resetOtphash -resetOtpexpiry -resetAttempt");
    return res.json({ user });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}


// user List - Admin only

const getUserList = async (req, res) => {
  try {
    const users = await User.find().select("-password -resetOtphash -resetOtpexpiry -resetAttempt");
    return res.json({ users });
  } catch (err) {
    return res.status(500).json({ message: "Server error" });
  }
}

module.exports = {
  signup,
  login,
  logout,
  requestPasswordReset,
  resetPassword,
  getProfile,
  getUserList,
}