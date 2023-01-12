import dbConnect from "../../../config/dbConnect"
import TaskModel from "../../../models/tasks"
const jwt = require("jsonwebtoken");
export default async function handler(req, res) {
  const { method } = req;
  const {name,date,user} = req.body;
  const token=req.headers.authorization
  await dbConnect();
  switch (method) {
    case "POST":
      try {
        if(!token)
        {
            return res.status(401).send({message:"Unauthorized"})
        }
        const verifyUserToken=jwt.verify(token,"expertia2023AccessToken")
        let currDate=""+new Date()
        currDate=currDate.split(" ").splice(0,4).join(" ")
        const AllTasks=await TaskModel.countDocuments({user:user,date:currDate})
        if(AllTasks>=5)
        {
            return res.status(401).send({message:"Cannot add more than 5 tasks per day"})
        }
        const newTask=await TaskModel.create(req.body)
        return res.send({message:"Task added successfully"})
      } catch (e) {
        return res.status(401).send({ message: e.message });
      }
    break  
    case "GET":
        try{
            if(!token)
            {
                return res.status(401).send({message:"Unauthorized"})
            }
            const verifyUserToken=jwt.verify(token,"expertia2023AccessToken")
            let currDate=""+new Date()
            currDate=currDate.split(" ").splice(0,4).join(" ")
            const tasks=await TaskModel.find({date:currDate})
            return res.send({message:"Successful",data:tasks})
        }catch(e){
            return res.status(401).send({message:e.message})
        }
    default:
      return res.status(401).send({ message: "Failed" });
  }
}
