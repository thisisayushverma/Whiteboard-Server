const mongoose = require("mongoose");
const User = require("./user.model");


const whiteboardSchema= new mongoose.Schema({
    name:{
        type:String,
        required:true
    },
    path:{
        type:String,
        required:true
    },
    user:{
        type:mongoose.Schema.Types.ObjectId,
        ref:User
    }
},{timestamps:true})


const Whiteboard = mongoose.model("Whiteboard",whiteboardSchema)

module.exports=Whiteboard