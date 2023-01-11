import {Schema,model,models} from "mongoose"
const UserSchema=new Schema({
    username:{type:String,required:true},
    email:{type:String,required:true},
    password:{type:String,required:true}
})

const UserModel=models.user||model("user",UserSchema)
module.exports=UserModel