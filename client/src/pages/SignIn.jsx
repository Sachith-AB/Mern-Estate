import React, { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom';
import {Alert} from 'flowbite-react';

export default function SignIn() {
  const [formData,setFormData] = useState({});
  const [error,setError] = useState(null);
  const [loading,setLoading] = useState(false);
  const navigate=useNavigate();

  const handleSubmit=async(e)=>{
    e.preventDefault();
    
    try{
      setLoading(true);
      const res= await fetch('/api/auth/signin',{
        method:'POST',
        headers:{
          'Content-Type':'application/json',
        },
        body:JSON.stringify(formData),
      });
     const data = await res.json();

     
     
     if(data.success === false){
      setError(data.message);
      setLoading(false);
      return;
     }
     
     setLoading(false);
     setError(null);
     navigate('/')
    }
    catch(error){
      setLoading(false);
      setError(error);
    }
      
    }
    

 const handleChange=async(e)=>{
      setFormData({
        ...formData,
        [e.target.id]: e.target.value,
      });
      if(formData){
        setError(error);
        return;
       }
    
   
 };

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold lg:text-4xl flex justify-center my-7'>
        Sign In
      </h1>
      <form action="" className=' mt-4 flex flex-col gap-4' onSubmit={handleSubmit}>
        
        <input type="email" placeholder='email' className='border-none bg-slate-200 p-3 rounded-lg' id='email' onChange={handleChange}/>
        <input type="password" placeholder='password' className='border-none bg-slate-200 p-3 rounded-lg' id='password' onChange={handleChange}/>
        <button disabled={loading} className='bg-slate-700 py-3 rounded-lg text-white hover:opacity-95 disabled:opacity-80'>
          {loading ? 'Loading' : 'Sign In'}
        </button>
        <button className='bg-red-700 py-3 rounded-lg text-white'>
          CONTINUE WITH GOOGLE
        </button>
        <div className='text-sm font-semibold'>
          <span>
            Don't have an account?
          </span>
          {' '}
          <Link to={'/sign-up'}>
          <span className='text-blue-700 hover:underline cursor-pointer'>
            Sign Up
          </span>
          </Link>
        </div>
        
      </form>
      {error && <p className='text-red-500 mt-5'>{error}</p>}
    </div>
  )
}
