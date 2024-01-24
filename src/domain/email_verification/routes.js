const express = require("express");
const {sendVerificationOTPEmail, verifyUserEmail} = require("./controller")
const router = express.Router();
//request new verficiation otp 
router.post("/",async (req,res)=>{
    try {
        const {email} =req.body;
        if(!email) 
        throw Error("emailnot foound ");
       const createdEmailVerificationOTP =await sendVerificationOTPEmail(email);
       res.status(200).json(createdEmailVerificationOTP)
    } catch (error) {
        res.status(400).send(error.message);
    }
})
router.post("/verify",async (req,res)=>{
    try {
        let {email,otp} = req.body;
        if(!(email&&otp))
        {
            throw Error("empty details");
        }
        await verifyUserEmail({email,otp});
        res.status(200).json({email,verified: true})
    } catch (error) {
        res.status(400).send(error.message);
    }
})
module.exports = router;