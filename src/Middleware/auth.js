const  JWT  = require("jsonwebtoken");
const  mongoose  = require("mongoose");
const postModel = require("../Models/postModel")

const verifyToken = async (req,res,next)=>{

    try {
        const token = req.cookies.token;

       if(!token) return res.status(400).send({status:false,message:"Login for create post"})
 

    if(token){
     
        JWT.verify(token, "ashish-r-jwt" ,(err,tokenDetails)=>{
        if(err) return res.status(403).send({status:false,message:err.message})
        req.tokenDetails = tokenDetails
        next()
    })
    }else{
        return res.status(401).send({status:false,msg:"you are not authenticated"})
    }
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyToken", error.message)
    }
   
}



const verifyTokenAndAuthorization = async(req,res,next)=>{
    try {
        verifyToken(req,res,async()=>{
            let postId = req.params.postId;
            let userId = req.params.userId;
         
            
            if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"Invalid userId"})
            if(!mongoose.isValidObjectId(postId)) return res.status(400).send({status:false,message:"Invalid userId"})
            let checkUserByPostId = await postModel.findOne({userId:userId,isDeleted:false})
            if(req.tokenDetails.userId == userId  && checkUserByPostId.userId==userId){
                next()
            }else{
                res.status(403).send({status:false,message:"you are not authorized to perform this task"})
            }
        })
    } catch (error) {
        res.status(500).send({status:false,message:error.message})
        console.log("error in verifyTokenAndAuthorization", error.message)
    }
}


const verifyComment = async(req,res,next)=>{

   try {
    let commentId = req.params.commentId
    let userId = req.params.userId
    if(!mongoose.isValidObjectId(commentId)) return res.status(400).send({status:false,message:"Invalid commentId"})
    if(!mongoose.isValidObjectId(userId)) return res.status(400).send({status:false,message:"Invalid userId"})
    let validateComment = await commentModel.findOne({"comment._id":commentId,"comment.isDeleted":false,isDeleted:false})
    if(!validateComment) return res.status(404).send({status:false,message:"not found"})

    if(validateComment.userId.toString()!=userId ) {
        return res.status(400).send({status:false,message:"this operation is not allowed"})
    }else{
        next()
    }
   } catch (error) {
    res.status(500).send({status:false,message:error.message})
    console.log("error in verifyComment", error.message)
   }
}



module.exports = {verifyToken,verifyTokenAndAuthorization,verifyComment}