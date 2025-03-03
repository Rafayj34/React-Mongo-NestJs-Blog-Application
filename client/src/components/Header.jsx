import React from 'react'
import { Link } from 'react-router'
import { LiaSignOutAltSolid } from "react-icons/lia";
import { useMainContext } from '../context/mainContext';
import { AiOutlineLogin } from "react-icons/ai";


const Header = () => {
  const {LogoutHandler,user} = useMainContext()
  return (
    <div className='w-[96%] py-5 justify-between  flex items-center lg:w-[90%] mx-auto'>
        <Link to={'/'} className='py-2 px-2 text-2xl  poppins-semibold  border shadow'>
        Code<span className='bg-accent py-1 px-2 rounded-[2px] shadow text-white'>Blogs</span>
        </Link>
        <ul className="flex items-center gap-x-3">
        {!user ?  <>
          <li>
            <Link className='py-2 px-2  poppins-semibold transition-all duration-300 border-b border-b-transparent hover:border-b-accent text-xl hover:text-accent flex items-center justify-center gap-x-2' to='/login'>Login <AiOutlineLogin className='poppins-bold text-xl'/> </Link>
          </li>
          </>:
          <>
          <li>
            <Link className='py-2 px-2  poppins-semibold transition-all duration-300 border-b border-b-transparent hover:border-b-accent text-xl hover:text-accent' to='/create-blog'>Create</Link>
          </li>
        <button onClick={LogoutHandler} className='text-3xl cursor-pointer'>
            <LiaSignOutAltSolid />
        </button>
          </>}
        </ul>
    </div>
  )
}

export default Header