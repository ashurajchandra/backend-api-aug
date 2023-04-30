const jwt = require('jsonwebtoken');

require("dotenv")
module.exports.verifyToken = (req, res , next)=>{
try{
    //headers 
    console.log(process.env.JWT_SECRET_KEY,"secret key")
    const token = req.headers.authorization;
    // console.log("token from headers", token)

    const payload = jwt.verify(token,  process.env.JWT_SECRET_KEY)

    // console.log("payload data ",payload)
    req.body.userId = payload.id

    
   next()

}catch(error){
    //if token verification failed
    return res.status(500).json({
        message:"invalid token",
        data:{}
    })
}
}