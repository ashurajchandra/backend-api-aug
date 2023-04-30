const mongoose = require('mongoose');

const {Schema} = mongoose;


const postSchema = new Schema({
    title:{
        type: String,
        required:true
    },

    imageUrl:{
        type:String
    },

    description:{
        type:String,

    },

    user:{
        type: Schema.Types.ObjectId,
        ref:'User'
    }
},{timestamps:true})


const Post = mongoose.model("Post", postSchema);

module.exports = Post;