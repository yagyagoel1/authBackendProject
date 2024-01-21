require("dotenv").config();
const mongoose = require("mongoose");

//url 
const {mongodb_url} = process.env;

const connectToDB = async ()=>{
    try{
        await mongoose.connect(mongodb_url);
    }catch(err)
    {
        console.log("unable to connect to the database"+err)
    }
}
connectToDB();