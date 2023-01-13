import mongoose from "mongoose";

const dbConnect=()=>{
    return mongoose.connect(process.env.MONGODB_URL)
}

module.exports=dbConnect