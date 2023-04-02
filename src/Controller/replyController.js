const commentModel = require("../Models/commentModel")


const replyOnComment = async(req,res)=>{
    let data =req.body
    let {reply} = data
    let commentId = req.params.commentId
    
    let replyOnComment = await commentModel.findOneAndUpdate({"comment._id":commentId,"comment.isDeleted":false,isDeleted:false},{$push:{"comment.$.reply":{text:reply}}},{new:true})

    return res.status(200).send({status:true,data:replyOnComment})

}
module.exports = {replyOnComment}