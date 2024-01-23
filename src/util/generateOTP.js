const  generateOTP = async ()=>{
    try{
        return (otp=`${1000+Math.random()*9000}`)
    }
    catch(err)
    {
        throw error;
    }
}
module.exports =generateOTP;