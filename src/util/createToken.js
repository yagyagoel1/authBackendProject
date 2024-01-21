const jwt  = require("jsonwebtoken");
const {TOKEN_KEY,TOKEN_EXPIRY} = process.env;
const createToken = async(tokenData,tokenKey=TOKEN_KEY,expiresIn = TOKEN_EXPIRY)=>{
try{
    const token = await jwt.sign(tokenData,tokenKey,{
        expiresIn,
    });
    return token;
}
catch(err)
{
    throw err("unable to sign the token");
}
}
module.exports =createToken;