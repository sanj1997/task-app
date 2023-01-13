import dbConnect from "../../../../config/dbConnect"
import UserModel from "../../../../models/user"
const jwt=require("jsonwebtoken")
export default async function handler(req,res){
    const {method}=req
    const {username,email,password}=req.body
    await dbConnect()
    switch(method){
        case "POST":
            try{ 
               if(!email||!username||!password)
               {
                 return res.status(401).send({message:"Missing details"})
               } 
               const isExisting=await UserModel.findOne({email:email})
               if(isExisting)
               {
                  return res.status(401).send({message:"Account already exists"})
               }
               else
               {
                const newUser=await UserModel.create(req.body)
                const accessToken=jwt.sign({id:newUser._id},"expertia2023AccessToken",{
                    expiresIn:"7 days"
                })
                const refreshToken=jwt.sign({id:newUser._id},"expertia2023RefreshToken",{
                    expiresIn:"28 days"
                })
                return res.send({message:"Account created successfully",accessToken:accessToken,refreshToken:refreshToken,id:newUser._id,username:newUser.username})
               }
               
            }catch(e){
               return res.status(401).send({message:e.message})
            }
        default: return res.status(401).send({message:"Failed"})    
    }
}