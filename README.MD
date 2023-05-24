# Backend Developer
Pre-Interview Task

## Create a Post-Comment App API,

-Where,
-User can create a post and comment on it
-User can comment on a comment as well
-User can edit and delete the post
-User can edit and delete the comment


### Models
- User Model
```yaml
{ 
  name: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    password: {
        type: String,
        required: true,
        minLen: 8,
        maxLen: 15,
        trim: true
    }

}, { timestamps: true })
}
```
- Post Model

```yaml
{ 
   post : {type:String,required:true},

    userId: {
        type: ObjectId,
        ref: "User"
    },

    isDeleted:{
        type:Boolean,
        default:false
    }
}, { timestamps: true }
}
```


- Comment Model
- 
```yaml
{ 
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
            dateOfReply:{type:Date},
          }],
    }],
      isDeleted:{
        type:Boolean,
        default:false
      }
},{timestamps:true})
}
```
## User APIs 
### POST /login

-user can register and login with name, email & password
- On a successful login attempt return a JWT token contatining the userId, exp, iat. The response should be a JSON object like [this](#successful-response-structure)
- If the credentials are incorrect return a suitable error message with a valid HTTP status code. The response should be a JSON object like [this](#error-response-structure)

```yaml
{
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
}
```




## Posts APIs 
### POST /user/post/:userId

-with this api login user can create a post 

```yaml
{
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
}
```


## Posts APIs 
### POST /user/post/:userId


PUT - "/user/:userId/post/:postId" Authorisation required

-with this api login user can edit or update a post 

-responce will be look like this
```yaml
{
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
}
```




DELETE  /user/:userId/post/:postId  Authorisation required

-with this api login user can delete a post 

-responce will be look like this

```yaml
{
 {
    
"status": true,
    "message": "post deleted"
   
    }
}
}
```
###NOTE : while deleting post, comment and reply will be removed


GET /user/post"  

-with this api any user can see all post 

-responce will be look like this


```yaml
{
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
}
```

GET /user/post/:postId"

-with this api any user can see details of post, like comments and reply on comments

-responce will be look like this


```yaml
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
}
```



POST /user/:userId/post/:postId/comment 

-with this api login user can see comment on post

-responce will be look like this

```yaml
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
```



PUT /user/:userId/comment/:commentId

-with this api only login user can update or edit their own comment on post

-responce will be look like this

```yaml
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
```


DELETE /user/:userId/comment/:commentId 

-with this api login user can delete their own comment

-responce will be look like this

```yaml
   {
    "status": true,
    "message": "comment deleted successfully"
}

```

POST /user/reply/:commentId"

-with this api login user can reply on any comment of post

-responce will be look like this


```yaml
   
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


```

