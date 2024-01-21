const express =require("express");
const router = express.Router();
const zod = require("zod");
const {createNewUser,authenticateUser} = require("./controller") 

//zod input schema
const nameSchema = zod.string().min(2).max(50);
const emailSchema = zod.string().email();
const passwordSchema = zod.string().min(8);
//signup route of user
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
router.post("/",async(req,res)=>{
    try {
        let {email,password}= req.body;
        email=email.trim();
        password = password.trim();
        try {
            email = emailSchema.parse(email);
            password = passwordSchema.parse(password);
        } catch (error) {
            throw error("wrong format of credentials");
        }
        const authenticatedUser = await authenticateUser({email,password});
        res.status(200).json(authenticatedUser);
    }
    catch(err)
    {
        res.status(400).json(error.message);
    }
})
module.exports =router;