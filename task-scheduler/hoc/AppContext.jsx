import React, { useEffect, useState } from "react"
import { getLocalStorageItem } from "../utils/localStorage"

export const AppContext=React.createContext()
export const AppContextProvider=({children})=>{
    const [accToken,setAccToken]=useState("")
    const [refToken,setRefToken]=useState("")
    const [id,setId]=useState("")
    const handleAuth=(rToken,aToken,id,username)=>{
       setAccToken(aToken)
       setRefToken(rToken)
       setId(id)
       localStorage.setItem("accessToken",JSON.stringify(aToken))
       localStorage.setItem("refreshToken",JSON.stringify(rToken))
       localStorage.setItem("id",JSON.stringify(id))
       localStorage.setItem("username",JSON.stringify(username))
    }
    useEffect(()=>{
        setAccToken(getLocalStorageItem("accessToken"))
        setRefToken(getLocalStorageItem("refreshToken"))
    },[])
    return <AppContext.Provider value={{accToken,setAccToken,setRefToken,refToken,handleAuth,id}}>{children}</AppContext.Provider>
}