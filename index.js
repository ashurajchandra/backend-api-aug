const express = require('express');
var cors = require('cors')
require('dotenv').config()
const app = express() ;
const PORT  =  process.env.PORT || 8000;
const db = require("./utils/database");
const postRoute = require('./routes/post');
const userRoute = require('./routes/user')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

const corsOption = {
   origin:'*',
   method: ['POST', 'GET', 'PUT', 'DELETE']
}

app.use(cors(corsOption))
app.get('/home', (req, res, next)=>{

     return res.status(200).json({
        message:'succesfully getting response',
        data: 'hi world'
     })
})

//
app.use('/post', postRoute)
app.use("/user",userRoute)




app.listen(PORT,()=>{console.log('app is up and running',PORT)})



