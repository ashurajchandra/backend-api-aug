 const _ = require('lodash');
const { post } = require('../routes/post');
const posts = []

// logic to create a post
module.exports.createPost = async(req, res) =>{
     // const {content, imageUrl, userName} = req.body;
     //console.log("req.body", req.body)
      const content = req.body.content;
      const imageUrl = req.body.imageUrl;
      const userName = req.body.userName;

    //   if( content == '' | imageUrl =='' | userName ==''){
        if(_.isEmpty(content) | _.isEmpty(imageUrl) |_.isEmpty(userName)){
        return res.status(403).json({
            message: 'please enter value in all the required fields',
            data: []
        })
      }

      const post = {
        id: Math.floor(Math.random()*1000 +1),
        content: content,
        imageUrl: imageUrl,
        userName: userName
      }

     posts.push(post)
      return res.status(200).json({
        message:'post created ',
        data: post
      })
}

//logic to fetch all posts
module.exports.getPosts = async(req, res) =>{
      
    return res.status(200).json({
        message:'Posts fetched successfully!',
        data: posts
    })
}


module.exports.editPost = async(req,res)=>{

  try{
    console.log("editing post with id", req.params.postId)
    const postId = req.params.postId;

    const index = posts.findIndex(post => post.id == Number(postId))  //-1 in case of non existence of post
    if(index == -1){
      return res.json(400).json({
        message: 'Please check post id.....seems in correct',
        data: []
      })
    }

    posts[index].content = req.body.content;
    posts[index].imageUrl = req.body.imageUrl;
    posts[index].userName = req.body.userName;


   return res.status(200).json({
    message:'post updated!!',
    data:posts[index]
   })
  }catch(error){
    console.log("error ",error)
    return res.status(400).json({
      message:'error ocurred while editing post ',
      data:[]
    })
  }
}
