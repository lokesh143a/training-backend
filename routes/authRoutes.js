const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resendOtp,
  resetPassword,
} = require("../controllers/authController");

// creating a user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

// forgot password
router.post("/forgot-password", forgotPassword);

// verify otp
router.post("/verify-otp", verifyOtp);

// resend otp
router.post("/resend-otp", resendOtp);

// reset password
router.post("/reset-password", resetPassword);

module.exports = router;
