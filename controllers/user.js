const _ = require('lodash');
const User = require("../modal/Users");
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const saltRounds = 10;
require('dotenv')
const { query, validationResult } = require('express-validator');

//register and login flow of user

module.exports.register = async(req, res)=>{
    try{
        const errors = validationResult(req);
        console.log("errors",errors)
        if(errors.array().length>0){
            console.log("inside errors")
            return res.status(403).json({
                data: errors.array()
            })
        }
        const {email, password, confirmPassword, name, gender} = req.body;

        // if(_.isEmpty(email) || _.isEmpty(password) || _.isEmpty(confirmPassword) || _.isEmpty(name)){
        //     return res.status(400).json({
        //         message:"please enter all the required fields",
        //         data:{}
        //     })
        // }
        // if(password != confirmPassword){
        //     return res.status(400).json({
        //         message:"please check password and confirmPassword",
        //         data:{}
        //     })
        // }
        const salt = await  bcrypt.genSalt(saltRounds);
        const hashPassword = await bcrypt.hash(password, salt);
        const newUser = await User.create({name:name,password:hashPassword, confirmPassword:hashPassword, email:email, gender:gender })
        console.log("newUser",newUser)
       
        if(newUser){
            return res.status(201).json({
                message:"user registered succesfully",
                data:newUser
            })
        }

       
    }catch(error){
        return res.status(400).json({
            message: "error while registering a user",
            data:newUser
        })
    }
}

module.exports.login = async(req, res)=>{
    try{
        const {email, password} = req.body;
        //email , password of the user
        // first case: To check whether user is registered with us or not
        // second case: To verify password .....we will read the old password at register time both should be matching
        // console.log("user login")
        if(_.isEmpty(email) || _.isEmpty(password)){
            return res.status(400).json({
                message:"please enter all the required fields",
                data:{}
            })
        }
   const user = await User.findOne({email:email})


   if(!user){
    return res.status(500).json({
        message: 'Email is not registered with us, please register and then login',
        data:{}
    })
   }
   console.log("user.password",user.password)
   const comparePassword =await bcrypt.compare(password, user.password)
   console.log("comparePassword",comparePassword)
   if(!comparePassword){
    return res.status(400).json({
        message:"please enter correct password",
        data:{}
    })
   }

   //take care of json web token
   console.log("user",user)
   //PAYLOAD DATA=> SOME USER INFO THAT MIGHT BE USEFUL TO THE CLIENT SIDE
   const token = jwt.sign({email:user.email, id:user._id, name:user.name},process.env.JWT_SECRET_KEY)
   return res.status(200).json({
    message:"user login successful",
    data:token
   })
      
   
    }catch(error){
        return res.status(400).json({
            message: "error while login a user",
            data:{}
        })
    }
}