const express =require("express");
const router = express.Router();
const zod = require("zod");
const {createNewUser} = require("./controller") 

//zod input schema
const nameSchema = zod.string().min(2).max(50);
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(8);
router.post("/signup",async(req,res)=>{
    try {
        let {name,email,password} = req.body; 
        name = name.trim();
        email= email.trim();
        password = password.trim();
        try {
            name = nameSchema.parse(name);
            email = emailSchema.parse(email);
            password = passwordSchema.parse(password);
        } catch (error) {
            throw error;
        }
        
        const result =await createNewUser({name:name,email:email,password:password});
        
        res.status(200).json({msg : "created user"});
    } catch (error) {
        res.status(400).json({msg : error.message});
    }
});
module.exports =router;