const  mongoose  = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const commentSchema = new mongoose.Schema({

    postId: {
        type: ObjectId,
        ref: "Post"
    },

    userId:{
        type:ObjectId,
        ref:"User"
    },

    comment: [{
        // type:String,
        text : {type:String},
        isDeleted:{type:Boolean,default:false},
        dateOfComment : {type:Date},
        reply:[{
            text: {type:String},
            // commentId : {type:ObjectId}
            dateOfReply:{type:Date},
          }],
    }],

    //   reply:[{
    //     text: {type:String},
    //     commentId : {type:ObjectId}
    //   }],

      isDeleted:{
        type:Boolean,
        default:false
      }
},{timestamps:true})


module.exports = mongoose.model("Comment", commentSchema)