const { default: mongoose } = require("mongoose");
const commentModel = require("../Models/commentModel");
const postModel = require("../Models/postModel");


const createPost = async(req,res)=>{
   try {
    let data = req.body
    let userId = req.params.userId
   if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"enter valid userId"})
    data.userId=userId
    // let {post} = data
    let createPost = await postModel.create(data)
    console.log(createPost);
    return res.send({status:true,data:createPost})
   } catch (error) {
    console.log("error in createPost",error.message);
   }

}

const getAllPost = async(req,res)=>{
    let getAllPost = await postModel.find({isDeleted:false}).populate("userId")
    if(getAllPost.length===0) return res.status(404).send({status:false,message:"no data found"})
    let data = getAllPost.map((x)=>({postId:x._id, myPost:x.post, authorName:x.userId.name,authorId:x.userId._id,email:x.userId.email,createdAt:x.createdAt}))
    return res.status(200).send({status:true,data:data})
}

const getPostById = async(req,res)=>{
    let postId = req.params.postId

    let findPost = await postModel.findOne({_id:postId,isDeleted:false}).populate("userId")
    if(!findPost) return res.status(404).send({status:false,message:"post not found"})
    let getCommentData = await commentModel.findOne({postId:postId,isDeleted:false,"comment.isDeleted":false}).select({comment:1,reply:1})
    let commentData ;
    
    if(!getCommentData){
         commentData = ["be the first person to comment"]
    }else{
         commentData = getCommentData.comment
    }

    let data = {
        name : findPost.userId.name,
        post : findPost.post,
        postCreatedAt:findPost.createdAt,
        comment : commentData

    }
  
    return res.status(200).send({status:true,data:data})
}

const UpdatePost = async(req,res)=>{
    let data = req.body
    let {post} = data
    // let userId = req.params.userId
    let postId = req.params.postId

    let checkPost = await postModel.findOneAndUpdate({_id:postId,isDeleted:false},{post:post},{new:true})
    if(!checkPost) return res.status(404).send({status:false,message:"Post Not found"})

    return res.status(200).send({status:true,message:"post updated",data:checkPost})

}

const deletePost = async(req,res)=>{
    let userId = req.params.userId
    let postId = req.params.postId

     await postModel.findOneAndUpdate({_id:postId,isDeleted:false},{isDeleted:true},{new:true})
    await commentModel.findOneAndUpdate({postId:postId,isDeleted:false},{isDeleted:true},{new:true})
    return res.status(200).send({status:true,message:"post deleted"})

}

module.exports = {createPost,getAllPost,getPostById,UpdatePost,deletePost}