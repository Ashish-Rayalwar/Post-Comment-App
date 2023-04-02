MERN Stack Developer
Pre-Interview Task

Create a Post App with API,

Where,
User can create a post and comment on it
User can comment on a comment as well
User can edit and delete the post
User can edit and delete the comment



Requirement:
Use any UI and API library to create the app


//-------------------------------------------------------------------------------------------------------//


router.post("/user/login", loginUser)
user can register and login with name, email & password


Login User Responce 

{
    "status": true,
    "data": {
        "_id": "64297ee38dca74bda191fe7b",
        "name": "bruce",
        "email": "batman@gmail.com",
        "createdAt": "2023-04-02T13:10:59.819Z",
        "updatedAt": "2023-04-02T13:10:59.819Z",
        "__v": 0
    }
}


//-------------------------------------------------------------------------------------------------------//


router.post("/user/logout", logout)

responce will be look like this

(User has been logged out.)  


//-------------------------------------------------------------------------------------------------------//

router.post("/user/post/:userId", verifyToken , createPost)

with this api login user can create a post 

responce will be look like this

{
    "status": true,
    "data": {
        "post": "amazon mern",
        "userId": "642938303953efa5ac16665a",
        "isDeleted": false,
        "_id": "642950be9340b1dd6791c54a",
        "createdAt": "2023-04-02T09:54:06.066Z",
        "updatedAt": "2023-04-02T09:54:06.066Z",
        "__v": 0
    }
}




//-------------------------------------------------------------------------------------------------------//




router.put("/user/:userId/post/:postId", verifyTokenAndAuthorization, UpdatePost)

with this api login user can edit or update a post 

responce will be look like this

{
    "status": true,
    "message": "post updated",
    "data": {
        "_id": "642938463953efa5ac16665c",
        "post": "updated post",
        "userId": "642938303953efa5ac16665a",
        "isDeleted": false,
        "createdAt": "2023-04-02T08:09:42.817Z",
        "updatedAt": "2023-04-02T10:14:47.565Z",
        "__v": 0
    }
}


//-------------------------------------------------------------------------------------------------------//




router.delete("/user/:userId/post/:postId", verifyTokenAndAuthorization, deletePost)

with this api login user can delete a post 

responce will be look like this

{
    "status": true,
    "message": "post deleted"
}
NOTE : while deleting post, comment and reply will be removed



//-------------------------------------------------------------------------------------------------------//




router.get("/user/post",getAllPost)

with this api any user can see all post 

responce will be look like this

{
    "status": true,
    "data": [
        {
            "postId": "642981af4bce749b4d4889bc",
            "myPost": "amazon mern",
            "authorName": "bruce",
            "authorId": "64297ee38dca74bda191fe7b",
            "email": "batman@gmail.com",
            "createdAt": "2023-04-02T13:22:55.052Z"
        },
        {
            "postId": "642981b94bce749b4d4889be",
            "myPost": "flipkart mern",
            "authorName": "bruce",
            "authorId": "64297ee38dca74bda191fe7b",
            "email": "batman@gmail.com",
            "createdAt": "2023-04-02T13:23:05.785Z"
        },
        {
            "postId": "642981c84bce749b4d4889c0",
            "myPost": "TypeScript ADV",
            "authorName": "bruce",
            "authorId": "64297ee38dca74bda191fe7b",
            "email": "batman@gmail.com",
            "createdAt": "2023-04-02T13:23:20.025Z"
        }
    ]
}




//-------------------------------------------------------------------------------------------------------//




router.get("/user/post/:postId",getPostById)

with this api any user can see details of post, like comments and reply on comments

responce will be look like this

{
    "status": true,
    "data": {
        "name": "bruce",
        "post": "flipkart mern",
        "postCreatedAt": "2023-04-02T13:23:05.785Z",
        "comment": [
            {
                "text": "great project",
                "isDeleted": false,
                "_id": "6429824c4bce749b4d4889ca",
                "reply": [
                    {
                        "text": "best",
                        "_id": "642982684bce749b4d4889cc"
                    }
                ]
            }
        ]
    }
}




//-------------------------------------------------------------------------------------------------------//





router.post("/user/:userId/post/:postId/comment",verifyToken, createComment)

with this api login user can see comment on post

responce will be look like this

{
    "status": true,
    "data": {
        "name": "bruce",
        "post": "flipkart mern",
        "postCreatedAt": "2023-04-02T13:23:05.785Z",
        "comment": [
            {
                "text": "great project",
                "isDeleted": false,
                "_id": "6429824c4bce749b4d4889ca",
                "reply": ["no reply yet"]
            }
        ]
    }
}






//-------------------------------------------------------------------------------------------------------//





router.put("/user/:userId/comment/:commentId", verifyToken,verifyComment, updateComment)

with this api login user can update or edit comment on post

responce will be look like this

{
    "status": true,
    "message": "doc updated",
    "data": {
        "_id": "642922f9081e79f40fd564a1",
        "postId": "642877c5a79df9fe86b8e001",
        "userId": "642849927e32c3714eff5dc9",
        "comment": [
            {
                "text": "bad",
                "isDeleted": false,
                "_id": "642922f9081e79f40fd564a2",
                "reply": []
            }
        ],
        "isDeleted": false,
        "createdAt": "2023-04-02T06:38:49.997Z",
        "updatedAt": "2023-04-02T07:52:05.627Z"
    }
}





//-------------------------------------------------------------------------------------------------------//






router.delete("/user/:userId/comment/:commentId", verifyToken,verifyComment, deleteComment)

with this api login user can delete comment

responce will be look like this

{
    "status": true,
    "message": "comment deleted successfully"
}




//-------------------------------------------------------------------------------------------------------//




router.post("/user/reply/:commentId",replyOnComment)

with this api login user can reply on any comment of post

responce will be look like this

{
    "status": true,
    "data": {
        "_id": "6429824c4bce749b4d4889c9",
        "postId": "642981b94bce749b4d4889be",
        "userId": "64297ee38dca74bda191fe7b",
        "comment": [
            {
                "text": "great project",
                "isDeleted": false,
                "_id": "6429824c4bce749b4d4889ca",
                "reply": [
                    {
                        "text": "best",
                        "_id": "642982684bce749b4d4889cc"
                    }
                ]
            }
        ],
        "isDeleted": false,
        "createdAt": "2023-04-02T13:25:32.164Z",
        "updatedAt": "2023-04-02T13:26:00.740Z",
        "__v": 0
    }
}





//-------------------------------------------------------------------------------------------------------//





