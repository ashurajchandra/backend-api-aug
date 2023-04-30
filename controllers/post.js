 const _ = require('lodash');
const { post } = require('../routes/post');
const Post = require('../modal/Posts');
const posts = []

// logic to create a post
//CRUD
module.exports.createPost = async(req, res) =>{
  try{
    //destructuring fields  from body
    const {title, imageUrl , description} = req.body;
    console.log("userId",req.body.userId)

       //   if( content == '' | imageUrl =='' | userName ==''){
        if(_.isEmpty(title)){
          return res.status(403).json({
              message: 'please enter value in all the required fields',
              data: []
          })
        }
     const createPost = await Post.create({title:title, imageUrl:imageUrl,description:description , user:req.body.userId })
    //const createPost = await Post.create({title:req.body.title, imageUrl:req.body.imageUrl,description:req.body.description })
    // const createPost = await Post.create(req.body)
    console.log("createPost",createPost)
    return res.status(201).json({
      message:'post created ',
      data: createPost
    })

  }catch(error){
    console.log("error ",error)
    return res.status(400).json({
      message:'error ocurred while creating post ',
      data:[]
    })
  }
}
  
    

//logic to fetch all posts
module.exports.getPosts = async(req, res) =>{
   
  try{
    const posts = await Post.find().populate('user').exec()
    
    
    return res.status(200).json({
      message:'Posts fetched successfully!',
      data: posts
  })
  }catch(error){
    console.log("error ",error)
    return res.status(400).json({
      message:'error ocurred while fetching post ',
      data:[]
    })
  }
   
}


module.exports.editPost = async(req,res)=>{

  //need to check in case of wrong post id

  try{
    console.log("editing post with id", req.params.postId)
    const postId = req.params.postId;
    console.log("postId to edit", postId)

    const post  = await Post.findByIdAndUpdate(postId, {$set:req.body})  //set takes whole body info replaces the old record

  console.log("updated post",post)
  return res.status(200).json({
    message:"post updated ",
    data:post._id
  })
  
   


  }catch(error){
    console.log("error ",error)
    return res.status(400).json({
      message:'error ocurred while editing post ',
      data:[]
    })
  }
}


module.exports.deletePost = async(req,res)=>{
  try{
    const postId = req.params.postId;

    const deletedPost = await Post.findByIdAndDelete(postId);

    return res.status(200).json({
      message:"post deleted succesfully",
      data:deletedPost._id
    })
  



  }catch(error){
    console.log("error ",error)
    return res.status(400).json({
      message:'error ocurred while deleting post ',
      data:[]
    })
  }
}