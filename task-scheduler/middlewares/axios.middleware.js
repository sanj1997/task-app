import axios from "axios";
// require("dotenv").config()
// const APP_URL=process.env.REACT_APP_URL
const instance=axios.create({
    baseURL:"/api"
})

instance.interceptors.request.use(
    (config)=>{
        const token=JSON.parse(localStorage.getItem("accessToken"))
        config.headers={}
        if(token)
        {
            config.headers["Authorization"]=JSON.parse(localStorage.getItem("accessToken"))
        }
        return config
    },
    (error)=>{
        return Promise.reject(error)
    }
)
instance.interceptors.response.use(
    (response) => {
      return response;
    },
    async (error) => {
      const previousRequest=error?.config
      if(error?.response?.data?.message==="jwt expired" && !previousRequest?.sent)
      {
         previousRequest.sent=true
         let rToken = JSON.parse(localStorage.getItem("refreshToken"))
         const res=await axios("/api/users",{
            headers:{
                "Authorization":rToken
            },
         })
         localStorage.setItem("accessToken",JSON.stringify(res.data.accessToken))
         return instance(previousRequest)
      }
      return Promise.reject(error)
    }
  );

  export default instance