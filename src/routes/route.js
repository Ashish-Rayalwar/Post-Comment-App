
const { createComment,updateComment,deleteComment } = require("../Controller/CommentController")
const {createPost,getAllPost,getPostById,UpdatePost,deletePost} = require("../Controller/postController")
const { replyOnComment } = require("../Controller/replyController")
const { loginUser,logout } = require("../Controller/UserController")
const { verifyToken, verifyTokenAndAuthorization, verifyComment } = require("../Middleware/auth")

const router = require("express").Router()

router.post("/user/login", loginUser)
router.post("/user/logout", logout)

router.post("/user/post/:userId", verifyToken , createPost)
router.put("/user/:userId/post/:postId", verifyTokenAndAuthorization, UpdatePost)
router.delete("/user/:userId/post/:postId", verifyTokenAndAuthorization, deletePost)
router.get("/user/post",getAllPost)
router.get("/user/post/:postId",getPostById)

router.post("/user/:userId/post/:postId/comment",verifyToken, createComment)
router.put("/user/:userId/comment/:commentId", verifyToken,verifyComment, updateComment)
router.delete("/user/:userId/comment/:commentId", verifyToken,verifyComment, deleteComment)

router.post("/user/reply/:commentId",replyOnComment)



router.all("/**", (req, res) => {
    return res.status(404).send({ status: false, msg: "This API request is not available!" })
});

module.exports = router