import { useToast } from "@chakra-ui/react";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { useContext, useEffect, useRef, useState } from "react";
import { AppContext } from "../hoc/AppContext";
import team from "../utils/images/team.svg";
import { createUserAccount } from "../utils/requests";
import { parseCookies, setCookie, destroyCookie } from 'nookies'
const signup = () => {
  const cookies = parseCookies()
  const [creds, setCreds] = useState({ username: "", email: "", password: "" });
  const router=useRouter()
  const {handleAuth}=useContext(AppContext)
  const toast=useToast()
  const ref = useRef(null);
  const handleChange = (e) => {
    const { name, value } = e.target;
    setCreds({ ...creds, [name]: value });
  };
  const handleSubmit = async(e) => {
    e.preventDefault();
    if (ref.current.value != creds.password) {
      toast({
        description:"Passwords does not match",
        status:"error",
        isClosable:false,
        duration:2000
      })
      return
    }
    createUserAccount(creds).then((res)=>{
       toast({
        description:"Account created successfully",
        status:"success",
        duration:2000,
        isClosable:false
       })
       setCookie(null, 'accessToken', res.data.accessToken)
       handleAuth(res.data.refreshToken,res.data.accessToken,res.data.id,res.data.username)
       router.push("/")
    }).catch((e)=>{
      toast({
        description:e.response.data.message,
        status:"error",
        duration:2000,
        isClosable:false
       })
    })
  };
  return (
    <>
      <div className="flex justify-evenly p-8 items-center relative">
        <div className="xs:full sm:full md:4/12 lg:w-3/12 p-7 border border-grey-600 shadow-lg">
          <p className="text-xl">Welcome !</p>
          <p className="mt-1 text-xl font-medium">Sign up to</p>
          <p className="mt-0.5 text-xs">task scheduler</p>
          <form onSubmit={handleSubmit} className=" w-full flex flex-col">
            <div className="mt-2">
              <label className="text-xs font-medium" htmlFor="email">
                Email
              </label>
              <br />
              <input
                className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded"
                onChange={handleChange}
                name="email"
                id="email"
                type="text"
                placeholder="Enter your email"
              />
            </div>
            <div className="mt-2">
              <label className="mt-0.5 text-xs font-medium" htmlFor="name">
                User name
              </label>
              <br />
              <input
                className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded"
                onChange={handleChange}
                name="username"
                id="name"
                type="text"
                placeholder="Enter your user name"
              />
            </div>
            <div className="mt-2">
              <label className="mt-0.5 text-xs font-medium" htmlFor="password">
                Password
              </label>
              <br />
              <input
                className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded"
                onChange={handleChange}
                name="password"
                id="password"
                type="password"
                placeholder="Enter your password"
              />
            </div>
            <div className="mt-2">
              <label className="mt-0.5 text-xs font-medium" htmlFor="confirm">
                Confirm Password
              </label>
              <br />
              <input
                className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded"
                ref={ref}
                id="confirm"
                type="password"
                placeholder="Confirm your password"
              />
            </div>
            <button className="bg-black text-white py-2 text-xs mt-5 border rounded">
              Register
            </button>
          </form>
          <div className="mt-2">
            <span className="flex justify-center m-auto w-full">
              <p className="text-xs font-thin px-1">Already have an Account?</p>
              <Link href={"/signin"}><p className="cursor-pointer font-bold text-xs px-1">Login</p></Link>
            </span>
          </div>
        </div>
        <div className="sm:hidden lg:flex w-7/12  xs:hidden ">
          <Image src={team} alt="error" />
        </div>
      </div>
    </>
  );
};

export default signup;
