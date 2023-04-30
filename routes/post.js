const express = require('express')

const router = express.Router();

const  {getPosts, createPost, editPost,deletePost} = require('../controllers/post')
const {verifyToken} = require('../security/token')

//read from body  req.body.content
// read from params  req.params.postId

// console.log("editPost in routes",editPost)
//createPost
router.post('/createPost', verifyToken,createPost)

//getPost
router.get('/getPosts', getPosts)

router.put('/editPost/:postId', editPost);

router.delete('/deletePost/:postId', deletePost)





module.exports = router