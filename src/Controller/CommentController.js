const { default: mongoose } = require("mongoose");
const commentModel = require("../Models/commentModel");
const postModel = require("../Models/postModel");



const createComment = async (req,res)=>{
    
    try {   
        let data = req.body
    let {comment} = data
    let postId = req.params.postId
    let userId = req.params.userId
    let commentData = {
        postId:postId,
        userId:userId,
        comment : [{text:comment}]
    }

    let checkPostExist = await postModel.findOne({_id:postId,isDeleted:false})
    if(!checkPostExist) return res.staus(404).send({status:false,message:"post not found"})
    let checkForComment = await commentModel.findOne({postId:postId})
   
    if(!checkForComment){
        let createComment = await commentModel.create(commentData)
        let {reply,...rest} = createComment._doc
        return res.status(201).send({status:true,data:rest})
        
    }else{
        let createComment = await commentModel.findOneAndUpdate({postId:postId,userId:userId},{$push:{comment:{text:comment}}},{new:true})
        let {reply,...rest} = createComment._doc
        return res.status(201).send({status:true,data:rest})
    }

    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in createComment", error.message);
    }

}


const updateComment = async(req,res)=>{
   try {
    let data = req.body
    let {comment} = data
    let commentId = req.params.commentId
    let userId = req.params.userId
    if(!mongoose.isValidObjectId(commentId)) return res.status(400).send({status:false,message:"Invalid commentId"})
    if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"Invalid userId"})
   
    let validateComment = await commentModel.findOne({"comment._id":commentId,"comment.isDeleted":false,isDeleted:false})
    if(!validateComment) return res.status(404).send({status:false,message:"not found"})
    if(validateComment.userId.toString()!=userId ) return res.status(400).send({status:false,message:"this operation is not allowed"})
    
    let findComment = await commentModel.findOneAndUpdate({"comment._id":commentId,"comment.isDeleted":false},{"comment.$.text":comment},{new:true})
   
    let {reply,__v,...rest} = findComment._doc
    return res.status(200).send({status:true,message:"doc updated",data:rest})

   } catch (error) {
       console.log("error in update comment", error.message);
    return res.status(400).send({msg:error.message})
   }
}


const deleteComment = async(req,res)=>{

    try {
        let commentId = req.params.commentId

    await commentModel.findOneAndUpdate({"comment._id":commentId,"comment.isDeleted":false,isDeleted:false},{"comment.$.isDeleted":true,$set:{"comment.$.reply":[]}},{new:true})

    return res.status(200).send({status:true,message:"comment deleted successfully"})
    } catch (error) {
        console.log(error.message,"error in delete comment");
    }


}

module.exports = {createComment,updateComment,deleteComment}