const User =require("./../user/model")
const {sendOTP,verifyOTP,deleteOTP} =require("./../otp/controller")
const {passwordSchema} = require("./../../util/inputcheck");
const {hashedData} = require("./../../util/HashData");



//reset password
const resetUserPassword = async ({email,otp,newPassword})=>{
    try {
        const validOTP = await verifyOTP({email,otp});
        if(!validOTP)
        {
            throw Error("invalid otp");
        }
        newPassword = passwordSchema.safeParse(newPassword);
        if(newPassword.error)
        {
            throw Error("invalid password");
        }
        const newHashedPass = await hashedData(newPassword);
        await User.updateOne({email},{password : newHashedPass});
        await deleteOTP(email);
       

    } catch (error) {
        throw error;
    }
}
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

module.exports = {sendPasswordOTPEmail,resetUserPassword};