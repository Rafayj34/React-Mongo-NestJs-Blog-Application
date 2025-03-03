import React from 'react'
import BlogCard from '../components/BlogCard'
import { useMainContext } from '../context/mainContext'

const HomePage = () => {

  const {blogs}= useMainContext()

  return (
    <>
          <div className="grid   grid-cols-1 md:grid-cols-2 xl:grid-cols-3 w-[96%] lg:w-[90%] mx-auto gap-x-4 gap-y-4
          ">
            {
              blogs && blogs.length>0 &&blogs.map((cur,i)=>{
                return <BlogCard  data={cur} key={i} />
              })
            }
          </div>
    </>
  )
}

export default HomePage