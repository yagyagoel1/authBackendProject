const express =  require("express");
const router = express.Router();
const {sendOTP} = require ("./controller");

router.post("/",async(req,res)=>{
    try {
        const {email,subject,message,duration} =req.body;
        const createdOTP = await sendOTP({
            email,
            subject,
            message,
            duration,
        });
        res.status(200).json(createdOTP);
    } catch (error) {
        res.status(400).json(error);
        
    }
})
module.exports =router;