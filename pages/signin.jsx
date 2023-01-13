import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect,useRef,useState } from "react";
import { AppContext } from "../hoc/AppContext";
import team from "../utils/images/team.svg"
import { authenticateUser } from "../utils/requests";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
const signin = () => {
  const cookies = parseCookies()
  const [creds, setCreds] = useState({email: "", password: "" });
  const email=useRef(null)
  const password=useRef(null)
  const router=useRouter()
  const {handleAuth}=useContext(AppContext)
  const toast=useToast()
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    email.current.value=""
    password.current.value=""
    authenticateUser(creds).then((res)=>{
       toast({
        description:"Logiin Successfull",
        status:"success",
        duration:2000,
        isClosable:false
       })
       setCookie(null, 'accessToken', res.data.accessToken)
       handleAuth(res.data.refreshToken,res.data.accessToken,res.data.id,res.data.username)
       router.push("/")
    }).catch((e)=>{
      console.log(e)
      toast({
        description:e.response.data.message,
        status:"error",
        duration:2000,
        isClosable:false
       })
    })
  };
  return (
    <div className="flex justify-evenly p-8 items-center">
      <div className="xs:full sm:full md:4/12 lg:w-3/12 p-7 border border-grey-600 shadow-lg">
        <p className="text-xl">Welcome !</p>
        <p className="mt-1 text-xl font-medium">Sign in to</p>
        <p className="mt-0.5 text-xs">task scheduler</p>
        <form onSubmit={handleSubmit} className=" w-full flex flex-col">
          <div className="mt-2">
          <label className="text-xs font-medium" htmlFor="email">Email</label><br />
          <input ref={email} name="email" onChange={handleChange} className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded" id="email" type="email" required="true" placeholder="Enter your email" />
          </div>
          <div className="mt-2">
          <label className="mt-0.5 text-xs font-medium" htmlFor="password">Password</label><br />
          <input ref={password} name="password" onChange={handleChange} className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded" required="true" id="password" type="password" placeholder="Enter your password" />
          </div>
          <div className="flex mt-3 justify-between">
            <span className="flex w-5/12 gap-1 items-center"><input type="checkbox" /><p className="text-xs">rememeber me</p></span>
            <p className="text-xs">Forgot Password ?</p>
          </div>
          <button type="submit" className="bg-black text-white py-2 text-xs mt-5 border rounded">Login</button>
        </form>
        <div className="mt-2">
        <span className="flex justify-center m-auto w-full"><p className="text-xs font-thin px-1">Don't have an Account?</p><Link href={"/signup"}><p className="cursor-pointer font-bold text-xs px-1">Register</p></Link></span>
      </div>
      </div>
      <div className="sm:hidden lg:flex w-7/12  xs:hidden ">
          <Image src={team} alt="error" />
      </div>
    </div>
  );
};

export default signin;
