const nodemailer = require("nodemailer");
 const AUTH_EMAIL=process.env.AUTH_EMAIL;
 const AUTH_PASS = process.env.AUTH_PASS;



//creating transporter
let transporter = nodemailer.createTransport({
    host : "smtp.gmail.com",
    port : 465,
    secure : true,
    auth : {
        user : AUTH_EMAIL,
        pass : AUTH_PASS,
    },
});


//verifiying transporter
transporter.verify((error,success)=>{
    console.log("hello")
    if(error)
    {
        console.log(error);
    }
    else{
        console.log("ready for messages");
        console.log(success);
    }

})
const sendEmail = async (mailOptions) => {
    return new Promise((resolve, reject) => {
        transporter.sendMail(mailOptions, (error, info) => {
            if (error) {
                reject(error);
            } else {
                resolve(info);
            }
        });
    });
};
module.exports = sendEmail;