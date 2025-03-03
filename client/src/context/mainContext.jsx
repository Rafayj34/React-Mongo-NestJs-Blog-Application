import React, { createContext, useContext, useEffect, useState } from 'react'
import { useNavigate } from 'react-router'
import { toast } from 'react-toastify'
import { axiosClient } from '../utils/AxiosClient'
import Loader from '../components/Loader'
const mainContext = createContext({
    user:null,
    LogoutHandler(){},
    fetchProfile(){},
    blogs:[],
    fetchAllBlogs(){}
})

export const useMainContext = ()=> useContext(mainContext)

export const MainContextProvider = ({children}) => {

    const [user,setUser] = useState(null) 
    const navigate = useNavigate()
    const [loader,setLoader] = useState(true)
    const [blogs,setBlogs] = useState([]) 


    const fetchProfile = async()=>{
      try {
        setLoader(true)
        const token = localStorage.getItem("token") || ''
        if(!token) return
        const response = await axiosClient.get("/auth/profile",{
          headers:{
            Authorization:`Bearer ${token}`
          }
        })
        const data = await response.data;
        setUser(data)
      } catch (error) {
        navigate("/login")
      }finally{
        setLoader(false)
      }
    }

    const fetchAllBlogs=async()=>{
      try {
          const response = await axiosClient.get("/blog/get-all");
          const data = await response.data;
          setBlogs(data)
      } catch (error) {
        toast.error( error?.response?.data?.message ||error.message)
      }
    }

    const LogoutHandler = ()=>{
      localStorage.removeItem("token")
      setUser(null)
        navigate("/login")
        toast.success("Logout Success")
    }

    useEffect(()=>{
      fetchProfile()
      fetchAllBlogs()
    },[])

    if(loader){
      return <div className="min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
        <Loader/>
      </div>
    }

  return (
    <mainContext.Provider value={{user,LogoutHandler,fetchProfile,blogs,fetchAllBlogs}}>{children}</mainContext.Provider>
  )
} 