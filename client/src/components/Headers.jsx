import React, { useEffect, useState } from 'react'
import {FaSearch} from 'react-icons/fa'
import {Link, useNavigate} from 'react-router-dom'
import {useSelector} from 'react-redux'


export default function Headers() {
  const {currentUser} = useSelector((state)=>(state.user));
  const [searchTerm,setSearchTerm] = useState(' ');
  const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault();
    const urlParams = new URLSearchParams(window.location.search);
    urlParams.set('searchTerm', searchTerm);
    const searchQuery = urlParams.toString();
    navigate(`/search?${searchQuery}`);
  };

  useEffect(() =>{
    const urlParams = new URLSearchParams(window.location.search);
    const searchTermFromUrl = urlParams.get('searchTerm');
    setSearchTerm(searchTermFromUrl);
  },[location.search]);

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
        <form action="" className='bg-slate-100  rounded-full flex items-center ' onSubmit={handleSubmit}>
            <input type="text" placeholder='Search...' className='custom-input bg-transparent border-none w-24 lg:w-64 '
            value={searchTerm}
            onChange={(e) =>setSearchTerm(e.target.value)}/>
            <button><FaSearch className='text-slate-500 mr-4'/></button>
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
            <Link to='/profile'>
            {currentUser ? (
              <img
                className='rounded-full h-7 w-7 object-cover'
                src={currentUser.avatar}
                alt='profile'
              />
            ) : (
              <li className=' text-slate-700 hover:underline'> Sign in</li>
            )}
          </Link>
        </ul>
      </div>
    </div>
  )
}
