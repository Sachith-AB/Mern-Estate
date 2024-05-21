import React from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link} from 'react-router-dom'


export default function Headers() {
  return (
    <div className='bg-slate-200 shadow-md'>
      <div className='flex justify-between items-center max-w-6xl mx-auto p-3'>
        <Link to={'/'}>
        <h1 className='text-sm lg:text-xl font-bold flex flex-wrap'>
            <span className='text-slate-500'>
                Marcketplace
            </span>
            {" "}
            <span className='text-slate-700'>
                Estat
            </span>
        </h1>
        </Link>
        <form action="" className='bg-slate-100  rounded-full flex items-center '>
            <input type="text" placeholder='Search...' className=' bg-transparent border-none focus:outline-none  w-24 lg:w-64'/>
            <FaSearch className='text-slate-500 mr-4'/>
        </form>
        <ul className='flex gap-4 text-sm text-slate-700 cursor-pointer font-semibold'>
            <Link to={'/'}>
            <li className='hidden sm:inline hover:underline'>
                Home
            </li>
            </Link>
            <Link to={'/about'}>
            <li className='hidden sm:inline hover:underline'>
                About
            </li>
            </Link>
            <Link to={'/sign-in'}>
            <li className='hidden sm:inline hover:underline'>
                Sign in
            </li>
            </Link>
        </ul>
      </div>
    </div>
  )
}
