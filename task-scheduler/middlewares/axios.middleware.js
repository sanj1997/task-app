import axios from "axios";
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
         const res=await axios("https://task-1801prxc3-sanj1997.vercel.app/api/users",{
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