import React, { useState } from 'react'
import * as yup from 'yup'
import {Formik,Form,ErrorMessage, Field} from 'formik'
import { FaEye, FaEyeSlash } from 'react-icons/fa'
import AuthButton from '../components/AuthButton'
import {toast} from 'react-toastify'
import {Link, useNavigate} from 'react-router'
import { axiosClient } from '../utils/AxiosClient'
import { useMainContext } from '../context/mainContext'
const RegisterPage = () => {

    const [isHide,setIsHide] = useState(true)
    const [loading,setLoading] = useState(false)
    const {fetchProfile} = useMainContext()
    const navigate = useNavigate()

        const validationSchema = yup.object({
            name: yup.string().required('Name is required'),
            email: yup.string().email('Invalid email format').required('Email is required'),
            password: yup.string().min(6, 'Password should be at least 6 characters long').required('Password is required'),
          
        })
        const initialValues = {
            name: '',
            email: '',
            password: '',
        }
        const onSubmitHandler = async(values,helpers)=>{
            try {
                setLoading(true)
                const response = await axiosClient.post('/auth/register',values)
                const data = await response.data
                 //logic
                 toast.success(data)
                 localStorage.setItem("token",data.token)
                 helpers.resetForm()
                 await fetchProfile()
                 navigate("/")
            } catch (error) {
                toast.error( error.response.data.message ||error.message)
            }finally{
                setLoading(false)
            }
        }

  return (
    <>
            <div className="min-h-[80vh] flex items-center justify-center w-full">
                <Formik onSubmit={onSubmitHandler} initialValues={initialValues} validationSchema={validationSchema}>
                    <Form className=' w-[96%] md:1/2 lg:w-1/3 xl:w-1/4 bg-white   transition-all duration-300 hover:shadow-sm py-10 px-10 rounded-md border-primary border cursor-pointer'>
                        <div className="mb-3">
                            <label htmlFor="name">Name <span className="text-red-500">*</span> </label>
                            <Field id="name" name="name" type="text" className="w-full py-3 px-3 border-primary border rounded-md outline-none text-tertiary" placeholder='Enter Your Name' />
                            <ErrorMessage name='name' component={'p'} className='text-red-500' />
                        </div>
                        <div className="mb-3">
                            <label htmlFor="email">Email <span className="text-red-500">*</span> </label>
                            <Field id="email" name="email" className="w-full py-3 px-3 border-primary border rounded-md outline-none text-tertiary" placeholder='Enter Your Email' />
                            <ErrorMessage name='email' component={'p'} className='text-red-500' />

                        </div>
                        <div className="mb-3">
                            <label htmlFor="password">Password <span className="text-red-500">*</span> </label>
                          <div className="flex items-center px-2 border-primary border rounded-md">
                          <Field type={isHide?'password':'text'} id="password" name="password" className="w-full py-3 px-3  outline-none text-tertiary bg-transparent" placeholder='Enter Your Password' />
                          {
                            isHide? <FaEye 
                            className='text-xl'
                            onClick={()=>setIsHide(!isHide)}
                            /> : <FaEyeSlash 
                            className='text-xl'
                            onClick={()=>setIsHide(!isHide)}
                             />
                          }
                          </div>
                            <ErrorMessage name='password' component={'p'} className='text-red-500' />

                        </div>
                        <div className="mb-3">
                            <AuthButton
                            text="Register"
                           loading={loading}
                           className
                           />


                        </div>
                        <div className="mb-3">
                            <p className="text-end">
                                Already Have An Account ? <Link className='poppins-medium text-accent' to={'/login'}>Login </Link>
                            </p>
                        </div>
                    </Form>
                </Formik>
            </div>
    </>
  )
}

export default RegisterPage