import axios from "axios"
import instance from "../middlewares/axios.middleware"

export const createUserAccount=async(creds)=>{
     try{
        const response=await axios.post("/api/users/signup",creds)
        return response
     }catch(e){
        return Promise.reject(e)
     }
}

export const authenticateUser=async(creds)=>{
    try{
        const response=await axios.post("/api/users/signin",creds)
        return response
    }catch(e){
        return Promise.reject(e)
    }
}

export const addUserTask=async(data)=>{
    try{
        const response=await instance.post("/tasks",data)
        return response
    }catch(e){
        return Promise.reject(e)
    }
}