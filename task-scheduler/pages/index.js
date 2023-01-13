import Head from 'next/head'
// import Image from 'next/image'
import { Inter } from '@next/font/google'
import Dashboard from '../components/Dashboard'
import axios from 'axios'
import nookies from 'nookies'
import dbConnect from "../config/dbConnect"
import TaskModel from "../models/tasks"
// import jwt from "jsonwebtoken"
const jwt=require("jsonwebtoken")
const inter = Inter({ subsets: ['latin'] })

export default function Home({tasks}) {
  return (
    <>
      <Head>
        <title>Scheduler</title>
        <meta name="description" content="Generated by create next app" />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        {/* <link rel="icon" href="/favicon.ico" /> */}
      </Head>
      <Dashboard tasks={tasks}/>
    </>
  )
}
export const getServerSideProps=async(ctx)=>{
  const cookies = nookies.get(ctx)
  await dbConnect()
  let currDate=""+new Date()
  currDate=currDate.split(" ").splice(0,4).join(" ")
  let tasks
  try{
    const verifyUserToken=jwt.verify(cookies.accessToken,"expertia2023AccessToken")
    tasks=await TaskModel.find({date:currDate,user:verifyUserToken.id})
    tasks=JSON.stringify(tasks)
  }catch(e){
    tasks=JSON.stringify([])
    console.log(e)
  }
  return {
    props:{
      tasks
    }
  }
}