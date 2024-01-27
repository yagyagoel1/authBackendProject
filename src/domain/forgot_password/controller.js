const User =require("./../user/model")
const {sendOTP} =require("./../otp/controller")
const sendPasswordOTPEmail =async (email) =>{
try {
    //check if the user exist in the systm
    const existingUser = await User.findOne({emial});
    if(!existingUser){
        throw Error("There no account for the provided email")
    }
    if(!existingUser.verified)
    {
        throw Error("email has not been verified");
    }
    const otpDetails={
        email,
        subject : "Password reset",
        message : "enter the code beloow to reset your password",
        duration : 1,
    } 
    const createdOTP = await sendOTP(otpDetails);
    return createdOTP;
} catch (error) {
    throw error;
}}

module.exports = {sendPasswordOTPEmail};