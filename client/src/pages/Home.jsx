import React from 'react'
import { Link } from 'react-router-dom'

export default function Home() {
  return (
    <div>
      <div className='py-28 px-20'>
      <div className='text-3xl lg:text-5xl '>
       <p className=''>
       <span className='text-slate-500 font-bold'>
       Find your next {' '}
       </span>
       <span className='text-slate-700 font-bold'>
       perfect
       </span>
       </p>
        <p className='text-slate-500 font-bold'>
       place with ease
       </p>
       </div>
       <p className='text-sm py-4 text-gray-400 font-sans'>
        Sahand Estate will help you find your home fast, easy and comfortable.Our expert support are always available.
        </p>
        <Link className='text-blue-800 font-semibold cursor-pointer hover:underline'>Let's Start now...</Link>
      
      </div>
      
      <div>
        
      </div>
    </div>
  )
}
