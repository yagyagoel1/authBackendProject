const generateOTP = require("../../util/generateOTP");
const sendEmail = require("../../util/sendEmail");
const OTP=require("./model");
const {hashData,verifyHashedData} =require("../../util/HashData")

const {AUTH_EMAIL} = process.env;




const verifyOTP = async ({email,otp})=>
{
    try {
        if(!(email&&otp))
        {
            throw Error("provide values for email otp");
        }


        //ennsume otp record exists
        const matchedOTPRecord = await OTP.findOne({email});
        if(!matchedOTPRecord)
        {
            throw Error("wrong email or otp");
        }
        const {expiresAt} = matchedOTPRecord;
        //checking for expired code
        if(expiresAt<Date.now())
        {
            await OTP.deleteOne({email});
            throw Error("code  has expired request for a new one ");
        }
        //nott yet expired verify value
        const hashedOTP=matchedOTPRecord.otp;
        const validOTP= await verifyHashedData(otp,hashedOTP);
        return validOTP;
    } catch (error) {
        
    }
}
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
            letter-spacing : 2px;"><b>${generatedOTP}</b></p><p>
            This code expires in ${duration} hour(s)</b></p>`,
        }
        await sendEmail(mailOptions);

        //save otp record
        const hashedOTP = await hashData(generatedOTP);
        const newOTP =await new OTP({
            email,
            otp : hashedOTP,
            createdAt : Date.now(),
            expiresAt : Date.now()+3600000*duration,
        });
        const createdOTPRecord = await newOTP.save();
        return createdOTPRecord;

    } catch (error) {
        throw error;
    }
}
const deleteOTP = async(email)=>{
    try {
        await OTP.deleteOne({email});
    } catch (error) {
        throw error;
    }
}
module.exports = {sendOTP,verifyOTP,deleteOTP};