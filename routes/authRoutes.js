const express = require("express");
const router = express.Router();
const {
  registerUser,
  loginUser,
  forgotPassword,
  verifyOtp,
  resendOtp
} = require("../controllers/authController");

// creating a user
router.post("/register", registerUser);

// login user
router.post("/login", loginUser);

// forgot password
router.post("/forgot-password", forgotPassword);

// verify otp
router.post("/verify-otp" , verifyOtp)

// resend otp
router.post("/resend-otp" , resendOtp)

module.exports = router;
