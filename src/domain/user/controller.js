//to check user already exist 
const User =require("./model");
const {hashData,verifyUserPassword} = require("../../util/HashData")
const createToken = require("../../util/createToken");

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
//authenticating a user
const authenticateUser  = async (data)=>{
    try{
        const {email,password} =data;
        const fetchedUser = await User.findOne({
            email
        });
        if(!fetchedUser)
        {
            throw Error("invalid credentials");
        }
        const hashedPassword= fetchedUser.password;
        const checkPassword = verifyUserPassword(password,hashedPassword); 
        if(!checkPassword)
        {
            throw error("invalid credentials");
        }
        //create a token for the user
        const tokenData  = {email,userId : fetchedUser._Id};
        const token = await createToken(tokenData);

        //assign user token
        fetchedUser.token = token;
        return fetchedUser;
    }
    catch(err)
    {
        throw err;
    }
}
module.exports = {createNewUser,authenticateUser};