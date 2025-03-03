import React, { Suspense, useEffect, useState } from 'react'
import BlogArtical from '../components/BlogArtical'
import Loader from '../components/Loader'
import ErrorComponent from '../components/ErrorComponent'
import { useParams } from 'react-router' 
import { axiosClient } from '../utils/AxiosClient'
import moment from 'moment'
const BlogPage = () => {

  const [loading,setLoading] = useState(true)
  const params = useParams()
  const [data,setData] = useState({})
  const [error,setError] = useState(false)


  const fetchBlog=async()=>{
      try {
          const response = await axiosClient.get("/blog/get/"+params.slug) 
          const data = await response.data
          setData(data)
      } catch (error) {
        setError(true)
        // toast.error(error.response.data.message || error.message)
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
    fetchBlog()
  },[])

  if(loading){
    return <div className="min-h-screen w-full flex items-center justify-center">
      <Loader/>
    </div>
  }

  if(error){
    return <div className="text-center text-xl font-bold w-full flex items-center justify-center">
          <ErrorComponent/>

    </div>
  }




  return (
    <>
                <div className="py-10  w-[96%] lg:w-[80%]  mx-auto">
                    <div className="mb-3 h-[50vh] overflow-hidden rounded-md  shadow-xl">
                        <img src={data.image} alt="" className=' w-full h-full object-cover mx-auto hover:scale-125 transition-all duration-300' />
                    </div>  

                    <div className="py-6  text-2xl lg:text-4xl poppins-semibold capitalize">
                        {data.title}
                    </div>
                    <div className="mb-3">
                        <span className="text-lg poppins-semibold">Posted by: {data.user.name}</span>
                        <span className="text-accent ml-2 poppins-semibold">{moment(data.createdAt).format('LL')}</span>
                    </div>
                <Suspense fallback={<div>loading...</div>}>
                <BlogArtical data={data.content} />
                </Suspense>


                </div>
    </>
  )
}

export default BlogPage