const bcrypt  = require("bcrypt");
const hashData =async (data,saltRounds =10)=>{
    try {
        const hashedData = await bcrypt.hash(data,saltRounds);
        return hashedData;
    } catch (error) {
        throw error;
    }
}
const verifyUserPassword = async (unhashed,hashed)=>{
    try {
       const match=  bcrypt.compare(unhashed,hashed);
       return match;
    } catch (error) {
        throw error;
    }
}
module.exports={hashData,verifyUserPassword};