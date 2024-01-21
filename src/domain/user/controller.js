//to check user already exist 
const User =require("./model");
const hashData = require("../../util/HashData")


//creating a user
async function createNewUser(data){
    try {
        
        const {name,email,password} = data;
        const existing = await User.findOne({email});
        if(existing)
        {
            throw new Error("User with the provided email already exists");
        }    
        //hashing the password
        const HashedPassword = await hashData(password);
        const newUser = await User.create({
            name,
            email,
            password : HashedPassword,
        });
        return newUser;
    } catch (error) {
        throw error;
    }
} 
module.exports = {createNewUser};