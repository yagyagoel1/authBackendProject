const mongoose = require("mongoose");
 
//userschema
const UserSchema = new mongoose.Schema({
    name : String,
    email : {type : String,unique : true},
    password : String,
    token : String,
    verified : {type :Boolean ,default :false}
});

const User = new mongoose.model(
    "User", UserSchema
);
module.exports  = 
    User;
