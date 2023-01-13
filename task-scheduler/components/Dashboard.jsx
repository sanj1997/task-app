
import { useToast } from '@chakra-ui/react'
import axios from 'axios'
import { useRouter } from 'next/router'
import React, { useContext, useEffect, useState } from 'react'
import { AppContext } from '../hoc/AppContext'
import instance from '../middlewares/axios.middleware'
import { addUserTask } from '../utils/requests'
import { parseCookies, setCookie, destroyCookie } from 'nookies'
const Dashboard = ({tasks}) => {
  const cookies = parseCookies()
  const [token,setToken]=useState(cookies.accessToken)
  const [name,setName]=useState("")
  const [date,setDate]=useState("")
  const [list,setList]=useState(JSON.parse(tasks))
  const [data,setData]=useState({name:"",user:"",date:""})
  const toast=useToast()
  const router=useRouter()
  useEffect(()=>{
    setName(JSON.parse(localStorage.getItem("username")))
    let currDate=""+new Date()
    currDate=currDate.split(" ").splice(0,4).join(" ")
    setDate(currDate)
     if(!token)
     {
       router.push("/signup")
     }
  },[token])
  const handleLogout=()=>{
    destroyCookie(null,"accessToken")
    setToken("")
  }
  const handleChange=(e)=>{
    let currDate=""+new Date()
    currDate=currDate.split(" ").splice(0,4).join(" ")
    let id=JSON.parse(localStorage.getItem("id"))
    setData({...data,user:id,name:e.target.value,date:currDate})
  }
  const handleSubmit=(e)=>{
    e.preventDefault()
    addUserTask(data).then((res)=>{
       toast({
        description:"Task added successfully",
        status:"success",
        isClosable:false,
        duration:1000
       })
       setList([...list,data])
    }).catch((e)=>{
      toast({
        description:e.response.data.message,
        status:"error",
        isClosable:false,
        duration:1000
       })
    })
  }
  return (
    <div className='flex flex-col justify-center items-center xs:px-5 xs:py-24 sm:px-5 sm:py-24 md:px-80 md:py-20 lg:px-96 lg:py-36'>
        <div className='md:full sm:full xs:full lg:w-9/12 m-auto border border-black p-5'>
           <p className='text-xl'>Hello</p>
           <p className='text-2xl font-semibold mt-2'>{name}</p>
           <p className='text-sm mt-4'>Good to see you here!</p>
           <p className='text-sm font-bold mt-10'>Tasks for {date}:</p>
           <div className='ml-8 mt-6'>
           <ul className='list-disc'>
              {list?.map((el)=>{
                return <li key={el._id}>{el.name}</li>
              })}
           </ul>
           </div>
           <form onSubmit={handleSubmit} className='flex flex-col mt-24'>
            <input onChange={handleChange} className='w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded' type="text" placeholder='Eg. Need to finish my assignment' />
            <button className='w-full bg-black text-white py-2 text-xs mt-5 border rounded' type='submit'>Add New Task</button>
           </form>
           <button onClick={handleLogout} className='block m-auto text-xs font-bold my-5'>Logout</button>
        </div>
    </div>
  )
}

export default Dashboard

