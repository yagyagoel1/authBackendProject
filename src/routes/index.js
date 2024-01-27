const express = require("express");
const router = express.Router();
const userRoutes=require("./../domain/user/index");
const OTPRoutes = require("./../domain/otp");
const ForgotPasswordRoutes = require("./../domain/forgot_password");
const emailVerificationRoutes= require("./../domain/email_verification")
router.use("/user",userRoutes);
router.use("/otp",OTPRoutes);
router.use("/forgot_password",ForgotPasswordRoutes);
router.use("/email_verification",emailVerificationRoutes);
module.exports = router;