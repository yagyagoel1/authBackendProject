const generateOTP = require("../../util/generateOTP");
const sendEmail = require("../../util/sendEmail");
const OTP=require("./model");
const {hashData} =require("../../util/HashData")

const {AUTH_EMAIL} = process.env;
 const sendOTP =async ({
    email,subject,message,duration=1
})=>{
    try {
        if(!(email&&subject&&message)){
            throw Error("provide a valid email or msg");
        }
        //clear old otp if any
        await OTP.deleteOne({email});

        //generated pin
        const generatedOTP = await generateOTP();

        //send email
        const mailOptions = {
            form : AUTH_EMAIL,
            to : email,
            subject : subject,
            html : `<p>${message}</p><p style = "color : tomato; font-size:25px;
            letter-spacing : 2px;"><b>${generateOTP}</b></p><p>
            This code expires in ${duration} hour(s)</b></p>`,
        }
        await sendEmail(mailOptions);

        //save otp record
        const hashedOTP = await hashData(generateOTP);
        const newOTP =await new OTP({
            email,
            otp : hashedOTP,
            createdAt : Date.now(),
            expiresAt : Date.now()+3600000*+duration,
        });
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;

    } catch (error) {
        throw error;
    }
}
module.exports = {sendOTP};