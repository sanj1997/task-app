import mongoose from "mongoose";
const dbConnect=()=>{
    return mongoose.connect("mongodb+srv://s:sanjay1997@cluster0.qnkuqjj.mongodb.net/scheduler")
}

module.exports=dbConnect