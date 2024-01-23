const jwt  = require("jsonwebtoken");
const {TOKEN_KEY} = process.env;
const verifyToken = async(req,res,next)=>{
    const token = req.body.token||req.headers["x-access-token"]||req.query.token;
///check for provided toke n
    if(!token)
    {
        return res.status(403).json({
            msg : "an authentication token is required"
        })
    }
    try{
        const decodedToken = await jwt.verify(token,TOKEN_KEY);
       req.currentUser = decodedToken;
    }
    catch(err)
    {
        return res.status(401).send("invalid token provided");
    }
    return next();
};
module.exports = verifyToken;