const express = require('express')

const router = express.Router();

const  {getPosts, createPost, editPost,checkingEditPost} = require('../controllers/post')

//read from body  req.body.content
// read from params  req.params.postId

console.log("editPost in routes",editPost)
//createPost
router.post('/createPost', createPost)

//getPost
router.get('/getPosts', getPosts)

router.put('/editPost/:postId', editPost)
//router.put('/editPost/:postId', checkingEditPost)




module.exports = router