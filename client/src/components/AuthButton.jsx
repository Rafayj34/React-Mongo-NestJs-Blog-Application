import React from 'react'
import { FaArrowRight } from 'react-icons/fa'
import { CgSpinner } from 'react-icons/cg'

const AuthButton = ({text,className,loading,...props}) => {
  return (
    <>
            <button   disabled={loading} {...props} className={` 
                    w-full flex items-center justify-center gap-x-2 text-white bg-accent disabled:bg-accent-disable py-3 rounded-sm cursor-pointer ${className}
                `}>
                    <span>{text}</span>
                    {
                        loading ? <CgSpinner className='animate-spin'/> :<FaArrowRight/>
                    }
                </button>
    </>
  )
}

export default AuthButton