import mongoose from "mongoose";
const dbConnect=()=>{
    return mongoose.connect(process.env.NEXT_PUBLIC_MONGODB_URL)
}

module.exports=dbConnect