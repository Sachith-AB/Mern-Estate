import React from 'react'
import {useSelector} from 'react-redux'
export default function Profile() {
  const {currentUser} = useSelector((state)=>state.user);

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>
        Profile
      </h1>
      <div className='flex justify-center'>
      <img src={currentUser.avatar} className='rounded-full h-40 w-40'/>
      </div>
      
        <form action="" className='flex flex-col gap-4 mt-4'>
          <input type="text" value={currentUser.username} className='border-none rounded-lg' placeholder='username'/>
          <input type="text" value={currentUser.email} className='border-none rounded-lg' placeholder='username'/>
          <input type="password"  className='border-none rounded-lg' placeholder='password'/>
          <button className='bg-slate-700 py-3 rounded-lg text-white hover:scale-105 transition-transform duration-200'>Update</button>
          <button className='bg-green-600 py-3 text-white rounded-lg hover:scale-105 transition-transform duration-200'>Create Listing</button>
        </form>
        <div className='flex justify-between text-red-600 mt-3'>
          <span className='cursor-pointer hover:underline'>
            Delete Account
          </span>
          <span className='cursor-pointer hover:underline'>
            Sign Out
          </span>
        </div>

        <p className='text-center text-green-600 cursor-pointer hover:underline'>
          Show Listing
        </p>
        
      
    </div>
  )
}
