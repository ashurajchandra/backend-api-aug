const mongoose = require('mongoose');

const {Schema} = mongoose;

//schema for users

const userSchema = new Schema({
    email:{
        type: String,
        required:true
    },
    password:{
        type:String,
        required:true
    },
    confirmPassword:{
        type:String,
        required:true
    },
    name:{
        type:String,
        required:true
    },
    gender:{
        type:String,
    }
},{timestamps:true})

const User = mongoose.model("User", userSchema);
module.exports = User;