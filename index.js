const express = require('express');
// const route = require('./src/routes/route.js');

const multer = require("multer");
const app = express();
// require("dotenv").config();

const cors = require('cors');

const cookieParser = require('cookie-parser');
const  {dbConnection}  = require('./src/database/db');
const router = require('./src/routes/route');
app.use(cors({ origin: "http://localhost:3000", credentials: true }));
app.use(cookieParser());
app.use(express.json())
app.use(express.urlencoded({extended:true}))
app.use(multer().any())
app.use('/', router)

const url = "mongodb+srv://Ashish:WeUTlaZDDXnrAyKM@test.ghtltbu.mongodb.net/PostMangement"
const PORT = 5001
dbConnection(url)




app.listen(PORT,()=>{
    console.log("server start");
})