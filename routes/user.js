const express = require("express");
const router = express.Router();
const { body, validationResult } = require('express-validator');



// const {register, login} = require('../controllers/user')
const userController = require('../controllers/user')

//post http request to register and login of a user

router.post("/register",
body('email', "please provide valid email").notEmpty().isEmail(),
body('password').isLength({min:8}).withMessage("please provide proper password"),
body('confirmPassword').custom((value, {req})=>{
    console.log("value",value)
 if(value != req.body.password){
    throw new Error("password and confirm password does not matches")
 }else{
   return true
 }
})
, userController.register)

router.post("/login", userController.login)



module.exports = router;