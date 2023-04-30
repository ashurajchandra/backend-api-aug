const express = require('express');

const app =  express() ;
const PORT  = 8000;
const db = require("./utils/database");
const postRoute = require('./routes/post');
const userRoute = require('./routes/user')
app.use(express.json())
app.use(express.urlencoded({extended:true}))

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



