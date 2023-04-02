const  mongoose  = require("mongoose");
const ObjectId = mongoose.Schema.Types.ObjectId
const postSchema = new mongoose.Schema({
    post : {type:String,required:true},

    userId: {
        type: ObjectId,
        ref: "User"
    },

    isDeleted:{
        type:Boolean,
        default:false
    }
},{timestamps:true})

module.exports = mongoose.model("Post",postSchema)