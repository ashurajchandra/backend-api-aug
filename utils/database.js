const mongoose = require('mongoose');

require('dotenv').config()

const MONGO_URI = process.env.MONGO_URI;

console.log("MONGO_URI",MONGO_URI)

mongoose.connect(MONGO_URI).then(()=>{
    console.log("database connected")
}).catch((error)=>{console.log("error while connecting to database",error)})



module.exports = mongoose.connection;
