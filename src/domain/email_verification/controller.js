const User = require("./../user/model")
const {sendOTP,verifyOTP,deleteOTP} = require("./../otp/controller");
const sendVerificationOTPEmail = async (email)=>{
    try {
        //check if an account exist 
        const existingUser = await User.findOne({email});
        if (!existingUser)
        {
            throw Error("there is no account for the provided email");

        }
        const otpDetails = {
            to : email,
            subject : "Email verification ",
            message : "Verify your email with code below",
            duration : 1,

        }
        const createdOTP = await sendOTP(otpDetails);
        return createdOTP;
    } catch (error) {
        throw error;
    }
}
const verifyUserEmail = async ({email,otp})=>{
    try {
        const validOTP =await verifyOTP({email,otp});
        if(!validOTP)
        {
            throw Error("invalid coe passed check your inbox");
        }
        //update the user record to show verified 
        await User.updateOne({email},{
            verified : true,
        });
        await deleteOTP(email);
        return ;
    } catch (error) {
        throw error;
    }
}
module.exports = {sendVerificationOTPEmail,verifyUserEmail};