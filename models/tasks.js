import {Schema,model,models} from "mongoose"
const TaskSchema=new Schema({
    name:{type:String,required:true},
    date:{type:String,required:true},
    user:{type:Schema.Types.ObjectId,ref:"user"}
})

const TaskModel=models.task||model("task",TaskSchema)
module.exports=TaskModel