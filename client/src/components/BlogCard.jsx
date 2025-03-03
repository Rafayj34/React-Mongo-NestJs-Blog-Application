import React, { useEffect, useId, useState } from 'react'
import { Link } from 'react-router'
import {toast}from 'react-toastify'
import { axiosClient } from '../utils/AxiosClient'
const BlogCard = ({data}) => {
  const [qoute,setQoute] = useState('')
  const fetchQoutes = async()=>{
    try {
      const response = await axiosClient.get("/qoute/random")
      const quote = response.data;
      setQoute(quote)
    } catch (error) {
      toast.error(error.response.data.message || error.message)
    }
  }
  useEffect(()=>{
    fetchQoutes()
  },[])


  const id = data.slug
  return (
    <>
        <Link to={'/blog/'+id} className="relative flex flex-col my-6 bg-white shadow-sm border border-slate-200 rounded-lg w-full">
  <div className="relative h-56 m-2.5 overflow-hidden text-white  object-center rounded-md">
    <img src={data.image} className='w-full h-full object-cover transition-all duration-300 hover:scale-125' alt="card-image" />
  </div>
  <div className="p-4">
    <h6 className="mb-2 text-slate-800 text-xl font-semibold capitalize">
      {data.title}
    </h6>
    <p id={qoute &&qoute.id} className="text-slate-600 leading-normal font-light">
      {qoute && qoute.quote}
    </p>
  </div>
  <ul className="flex items-center gap-x-2 px-4 xl:px-4 flex-wrap">
    {
     data.tags && data.tags.length>0 && data.tags.map((cur,i)=>{
        return <li className='px-6 poppins-medium py-1 rounded-md border-tertiary border text-tertiary' key={i}>#{cur}</li>
      })
    }
  </ul>
  <div className="px-4 pb-4 pt-0 mt-2">
    <button className="rounded-md bg-tertiary cursor-pointer py-2 px-4 border border-transparent text-center text-sm text-white transition-all shadow-md hover:shadow-lg focus:bg-slate-700 focus:shadow-none active:bg-slate-700 hover:bg-slate-700 active:shadow-none disabled:pointer-events-none disabled:opacity-50 disabled:shadow-none" type="button">
      Read more
    </button>
  </div>
</Link>

    </>
  )
}

export default BlogCard