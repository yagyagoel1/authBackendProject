const express = require("express");
const router = express.Router();
const userRoutes=require("./../domain/user/index");
const OTPRoutes = require("./../domain/otp");
router.use("/user",userRoutes);
router.use("/otp",OTPRoutes);
module.exports = router;