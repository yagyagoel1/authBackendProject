const express =  require("express");

const { sendPasswordOTPEmail } = require("./controller");
const router = express.Router();

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