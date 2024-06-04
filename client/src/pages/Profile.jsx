import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';
import { 
  updateUserStart,
  updateUserFailure,
  updateUserSucess ,
  signOutSucess,
  deleteUserStart,
  deleteUserSuccess,
  deleteUserFailure} from '../redux/user/userSlice.js';
import { useDispatch } from 'react-redux';
import { Link  } from 'react-router-dom';
import {Modal,Button} from 'flowbite-react';
import {HiOutlineExclamationCircle} from 'react-icons/hi'






export default function Profile() {

  const {currentUser,loading,error} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined)
  const [filePerc,setFilePerc] = useState(0);
  const[fileUploadError,setFieUploadError] = useState(false);
  const [formData,setFormData]=useState({});
  const dispatch = useDispatch();
  const [updateSuccess,setUpdateSuccess] = useState(false);
  const [showModal,setShowModal] = useState(false);
  const [showListingError,setShowListingError] = useState(false);
  const [getListings,setGetListings] = useState([]);
  
  


  useEffect(()=>{
    if(file){
      handleFileUpload(file);
    }
  },[file])

  const handleFileUpload=async(file)=>{
    const storage = getStorage(app);
    const fileName = new Date().getTime()+file.name;
    const storageRef = ref(storage,fileName)
    const uploadTask = uploadBytesResumable(storageRef,file);

    uploadTask.on('state_changed',
      (snapshot)=>{
        const progress = (snapshot.bytesTransferred/snapshot.totalBytes)*100;
        setFilePerc(Math.round(progress))
      },
  
    (error)=>{
      setFieUploadError(true);
    },
    ()=>{
      getDownloadURL(uploadTask.snapshot.ref).then
      ((downloadURL) =>{
        setFormData({...formData,avatar:downloadURL})
      })
    })
  }
const handleChange = (e) => {
  setFormData({...formData,[e.target.id]:e.target.value})
}

const handleSubmit = async (e) => {
  e.preventDefault();
  try{
    dispatch(updateUserStart());
    const res = await fetch(`/api/user/update/${currentUser._id}`,{
      method:"PUT",
      headers:{
        'Content-Type' : 'application/json',
      },
      body:JSON.stringify(formData),
    });
    const data = await res.json();
    if(data.success === false){
      dispatch(updateUserFailure(error.message));
      return
    }
    dispatch(updateUserSucess(data));
    setUpdateSuccess(true);
  }
  catch(error){
    dispatch(updateUserFailure(error.message))
  }
}

const handleSignOut=async()=>{
  try{
    const res= await fetch('/api/user/signout',{
        method:'POST'
    })
    const data = await res.json();
    if(!res.ok){
        console.log(data.message)
    }
    else{
        dispatch(signOutSucess())
    }

}
catch(error){
    console.log(data.message)
  }

 
}
const handleDeleteUser=async()=>{
    setShowModal(false);
    try{
      dispatch(deleteUserStart());
      const res = await fetch(`/api/user/delete/${currentUser._id}`,{
        method:'DELETE',
      });
      const data = await res.json();
      if(!res.ok){
        dispatch(deleteUserFailure(data.message));
      }
      else{
        dispatch(deleteUserSuccess(data));
      }
    }
    catch(error){
      dispatch(deleteUserSuccess(error.message));
    }
}

const handleShowListing = async () => {
  try{
    setShowListingError(false);
    const res = await fetch(`/api/user/listings/${currentUser._id}`);
    
    const data = await res.json();
    if(data.success === false){
      setShowListingError(true);
      return;
    } 
    setGetListings(data);
  }
  catch(error){
    setShowListingError(true);
  }
}
  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-semibold text-center my-7'>Profile</h1>

      <form onSubmit={handleSubmit} className='flex flex-col gap-4'>
        <input
          onChange={(e) => setFile(e.target.files[0])}
          type='file'
          ref={fileRef}
          hidden
          accept='image/*'
        />
        <img
          onClick={() => fileRef.current.click()}
          src={formData.avatar || currentUser.avatar}
          alt='profile'
          className='rounded-full h-24 w-24 object-cover cursor-pointer self-center mt-2'
        />
        <p className='text-sm self-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-700'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
        <input
          type='text'
          placeholder='username'
          defaultValue={currentUser.username}
          id='username'
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='email'
          placeholder='email'
          id='email'
          defaultValue={currentUser.email}
          className='border p-3 rounded-lg'
          onChange={handleChange}
        />
        <input
          type='password'
          placeholder='password'
          onChange={handleChange}
          id='password'
          className='border p-3 rounded-lg'
        />
        <button
          disabled={loading}
          className='bg-slate-700 text-white rounded-lg p-3 uppercase hover:opacity-95 disabled:opacity-80'
        >
          {loading ? 'Loading...' : 'Update'}
        </button>
        <Link
          className='bg-green-700 text-white p-3 rounded-lg uppercase text-center hover:opacity-95'
          to={'/create-listing'}
        >
          Create Listing
        </Link>
      </form>
      <div className='flex justify-between mt-5'>
        <span
          onClick={() => setShowModal(true)} className='text-red-700 cursor-pointer hover:underline'>
          Delete account
        </span>
        <span onClick={handleSignOut} className='text-red-700 cursor-pointer hover:underline' >
          Sign out
        </span>
      </div>
      <p className='text-red-600 text-center' >
        {error ? error:''}
      </p>
      <p className='text-green-600 text-center'>
        {updateSuccess ? 'User updated successfully':''}
      </p>

      <div className='flex justify-center'>
      <button className='text-green-700 cursor-pointer hover:underline' onClick={handleShowListing}>
        Show Listing
      </button>
      </div>

      <p className='text-red-600'>
        {showListingError && 'Error showing listing'}
      </p>

      {
        getListings && getListings.length>0 && 
          <div className='text-center'>
            <h1 className='text-3xl font-bold text-slate-700'>
              Your Listings
            </h1>
          </div>
        
      }

      { 
        getListings && getListings.length > 0 && getListings.map((listing) =>(
         <div key={listing._id} className='flex justify-between border rounded-lg items-center p-3 mt-3'>
            <Link className='' to={`/listing/${listing._id}`}>
              <img src={listing.imageUrls[0]} alt="listings cover" className='h-16 w-16 object-contain'/>
              
            </Link>
            <Link to={`/listing/${listing._id}`}>
            <p className='text-slate-700 font-semibold hover:underline truncate'>{listing.name}</p>
            </Link>
            <div className='flex gap-2'>
              <button className='uppercase text-red-600 hover:underline'>
                delete
              </button>
              <button className='uppercase text-green-600 hover:underline'>
                edit
              </button>
            </div>
         </div> 
          )
        )
      }

      <Modal show = {showModal} onClose={() => setShowModal(false)} popupsize='md' className=''>
      <Modal.Header/>
             <Modal.Body>
                <div className='text-center'>
                    <HiOutlineExclamationCircle className='h-14 w-14 text-gray-400
                    dark:text-gray-200 mb-4 mx-auto'/>
                    <h3 className='mb-5 text-gray-500 text-lg'>
                        Are you sure you want to delete this account?
                    </h3>
                    <div className='flex justify-center gap-4'>
                         <Button color='failure' onClick={handleDeleteUser} className='px-4'>
                            Yes, I'm sure
                        </Button>
                        <Button 
                        color = 'gray' onClick={() => setShowModal(false)} className='px-4'>
                            No, cancel 

                        </Button>
                    </div>
                   </div>

            </Modal.Body>
      </Modal>
    </div>
  )
}
