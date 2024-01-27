const express =  require("express");

const { sendPasswordOTPEmail ,resetUserPassword} = require("./controller");
const router = express.Router();


//cre
router.post("/reset",async(req,res)=>{
    try {
        let {email,otp,newPassword} =res.body;
        if(!otp&&email&&newPassword)
        {
            throw Error("empty credentials are not allowed");
        }
        await resetUserPassword({email,otp,newPassword});
        res.status(200).json({msg : "password reset successfully"});
    } catch (error) {
        res.status(400),json(error.message);
    }
});
//password reset req 
router.post("/",async(req,res)=>{
    try{
        const {email} = req.body;
        if(!email)
        throw Error("an email is required");
    
    
   await sendPasswordOTPEmail(email);
   res.status(400).json({msg : "otp created and sent"});
    }
    catch(error)
    {
        res.status(400).json(error.message);
    }
})
module.exports = router;