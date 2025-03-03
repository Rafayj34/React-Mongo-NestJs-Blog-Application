import React, { useEffect, useState } from 'react'
import {Formik,Form,ErrorMessage, Field} from 'formik'
import * as yup from 'yup'
import {toast} from 'react-toastify' 
import Editor from '../components/Editor'
import AuthButton from '../components/AuthButton'
import { useMainContext } from '../context/mainContext'
import { useNavigate } from 'react-router'
import Loader from '../components/Loader'
import { axiosClient } from '../utils/AxiosClient'
const CreateBlogPage = () => {
  const [loading,setLoading] = useState(false);
  const {user,fetchAllBlogs} = useMainContext()
  const navigate = useNavigate()
  const [loader,setLoader] = useState(true)


  const initalValues = {
    title: '',
    content: '', 
    tags: '',
    image: '',
  }
  const validationSchema = yup.object({
    title: yup.string().required('Title is required'),
    content: yup.string().required('Content is required'),
    tags: yup.string().required('Tags are required'),
    image: yup.string().required('Image is required').url("Image should be a valid url"),
  })
  const onSubmit = async(values, {resetForm}) => {
      try {
        setLoading(true)
          // Your form submission logic goes here

          const response = await axiosClient.post('/blog/add',values,{
            headers: {
              'Authorization': `Bearer ${localStorage.getItem('token')}`
            }
          })
          const data =await response.data
          await fetchAllBlogs()
    toast.success(data.msg)
    resetForm()
      } catch (error) {
          toast.error(error.message)
      }finally{
        setLoading(false)
      }
  }

  useEffect(()=>{
    if(!user){
      navigate('/login')
    }else{
      setLoader(false)
    }
  },[])
  if(loader){
    return <div className="min-h-[80vh] w-full flex items-center justify-center overflow-hidden">
      <Loader/>
    </div>
  }

  return (
    <>
        <div className="py-10 w-[96%] xl:w-[90%] mx-auto ">
          <div className="mb3">
           <h1 className='text-3xl lg:text-5xl poppins-semibold py-3'> Hi, Krishna <span class="wave">👋</span> </h1>
          </div>

        <Formik validationSchema={validationSchema} onSubmit={onSubmit} initialValues={initalValues}>
          {
            ({handleSubmit,values,setFieldValue})=>(
              <form onSubmit={handleSubmit} className=" w-[96%] xl:w-[80%] mx-auto bg-white py-10 px-10 rounded-md shadow-2xs">
              <div className="mb-3">
                <label className='poppins-medium' htmlFor="title">Title <span className="text-red-500 text-xs ">*</span> </label>
                <Field name="title" type="text" className="w-full py-2 bg-transparant border border-primary outline-none px-4 rounded-sm" placeholder='Enter Blog Title' />
                <ErrorMessage name="title" component="p" className="text-red-500 text-xs capitalize" />
              </div>
              <div className="mb-3">
                <label className='poppins-medium' htmlFor="image">Image <span className="text-red-500 text-xs ">*</span> </label>
                <Field name="image" type="text" className="w-full py-2 bg-transparant border border-primary outline-none px-4 rounded-sm" placeholder='Enter Blog Image URL' />
                <ErrorMessage name="image" component="p" className="text-red-500 text-xs capitalize" />
              </div>
              <div className="mb-3">
                <label className='poppins-medium' htmlFor="tags">Tags <span className="text-red-500 text-xs ">*</span> <span className="text-sm poppins-regular"> (seperated by Comma) </span> </label>
                <Field name="tags" type="text" className="w-full py-2 bg-transparant border border-primary outline-none px-4 rounded-sm" placeholder='Enter Blog Tags ' />
                <ErrorMessage name="tags" component="p" className="text-red-500 text-xs capitalize" />
              </div>
              <div className="mb-3">
                <label className='poppins-medium' htmlFor="tags">Content <span className="text-red-500 text-xs ">*</span> <span className="text-sm poppins-regular">  </span> </label>
                  <Editor  value={values.content} setFieldValue={setFieldValue}/>

                <ErrorMessage name="content" component="p" className="text-red-500 text-xs capitalize" />
              </div>
      <div className="mb-3">
        <AuthButton type="submit"  loading={loading} text={'Add Blog'}  />
      </div>
            </form>
            )
          }
        </Formik>
      

        </div>
    </>
  )
}

export default CreateBlogPage