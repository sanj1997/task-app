import Image from "next/image";
import React from "react";
import team from "../utils/team.svg"
const signup = () => {
  return (
    <div className="flex justify-evenly p-8 items-center">
      <div className="xs:full sm:full md:4/12 lg:w-3/12 p-7 border border-grey-600 shadow-lg">
        <p className="text-xl">Welcome !</p>
        <p className="mt-1 text-xl font-medium">Sign up to</p>
        <p className="mt-0.5 text-xs">task scheduler</p>
        <form className=" w-full flex flex-col">
          <div className="mt-2">
          <label className="text-xs font-medium" htmlFor="email">Email</label><br />
          <input className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded" id="email" type="text" placeholder="Enter your email" />
          </div>
          <div className="mt-2">
          <label className="mt-0.5 text-xs font-medium" htmlFor="name">User name</label><br />
          <input className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded" id="name" type="text" placeholder="Enter your user name" />
          </div>
          <div className="mt-2">
          <label className="mt-0.5 text-xs font-medium" htmlFor="password">Password</label><br />
          <input className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded" id="password" type="password" placeholder="Enter your password" />
          </div>
          <div className="mt-2">
          <label className="mt-0.5 text-xs font-medium" htmlFor="confirm">Confirm Password</label><br />
          <input className="w-full px-3 py-2 mt-0.5 text-xs font-thin border border-black rounded" id="confirm" type="password" placeholder="Confirm your password" />
          </div>
          <button className="bg-black text-white py-2 text-xs mt-5 border rounded">Register</button>
        </form>
        <div className="mt-2">
        <span className="flex justify-center m-auto w-full"><p className="text-xs font-thin px-1">Already have an Account?</p><p className="cursor-pointer font-bold text-xs px-1">Login</p></span>
      </div>
      </div>
      <div className="sm:hidden lg:flex w-7/12  xs:hidden ">
          <Image src={team} alt="error" />
      </div>
    </div>
  );
};

export default signup;
