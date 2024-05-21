import React from 'react'
import {TextInput} from 'flowbite-react';
import { Link } from 'react-router-dom';

export default function SignIn() {
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold lg:text-4xl flex justify-center my-7'>
        Sign Up
      </h1>
      <form action="" className=' mt-4 flex flex-col gap-4'>
        <input type="text" placeholder='username' className='border-none bg-slate-200 p-3 rounded-lg' id='username'/>
        <input type="email" placeholder='email' className='border-none bg-slate-200 p-3 rounded-lg' id='email'/>
        <input type="password" placeholder='password' className='border-none bg-slate-200 p-3 rounded-lg' id='password'/>
        <button  className='bg-slate-700 py-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80'>
          Sign Up
        </button>
        <button className='bg-red-700 py-3 rounded-lg text-white'>
          CONTINUE WITH GOOGLE
        </button>
        <div className='text-sm font-semibold'>
          <span>
            Have an account?
          </span>
          {' '}
          <Link to={'/sign-in'}>
          <span className='text-blue-700 hover:underline cursor-pointer'>
            Sign in
          </span>
          </Link>
        </div>
        
      </form>
    </div>
  )
}
