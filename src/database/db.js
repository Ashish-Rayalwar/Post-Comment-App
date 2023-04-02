const  mongoose  = require("mongoose");

const dbConnection = async (url)=>{
    try {
        await mongoose.connect(url,{useNewUrlParser:true})
        console.log("Database is connected");
    } catch (error) {
        console.log("error while connecting db",error.message);
    }
}

module.exports = {dbConnection}