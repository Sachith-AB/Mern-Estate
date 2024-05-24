import React, { useEffect, useRef, useState } from 'react'
import {useSelector} from 'react-redux'
import {getDownloadURL, getStorage,ref, uploadBytesResumable} from 'firebase/storage'
import { app } from '../firebase';



export default function Profile() {

  const {currentUser} = useSelector((state)=>state.user);
  const fileRef = useRef(null);
  const [file,setFile] = useState(undefined)
  const [filePerc,setFilePerc] = useState(0);
  const[fileUploadError,setFieUploadError] = useState(false);
  const [formData,setFormData]=useState({});
  


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

  return (
    <div className='p-3 max-w-lg mx-auto'>
      <h1 className='text-3xl font-bold text-center my-7'>
        Profile
      </h1>
      <div className='flex justify-center'>
      <input type="file" ref={fileRef} hidden accept='image/*' onChange={(e)=>setFile(e.target.files[0])}/>
      <img onClick={()=>{fileRef.current.click()}} src={formData.avatar || currentUser.avatar} className='rounded-full h-40 w-40'/>
     
      </div>
      <p className='text-sm self-center flex flex-col text-center'>
          {fileUploadError ? (
            <span className='text-red-700'>
              Error Image upload (image must be less than 2 mb)
            </span>
          ) : filePerc > 0 && filePerc < 100 ? (
            <span className='text-slate-700'>{`Uploading ${filePerc}%`}</span>
          ) : filePerc === 100 ? (
            <span className='text-green-500'>Image successfully uploaded!</span>
          ) : (
            ''
          )}
        </p>
      
        <form action="" className='flex flex-col gap-4 mt-4'>
          
          <input type="text" value={currentUser.username} className='border-none rounded-lg' placeholder='username' id='username' />
          <input type="text" value={currentUser.email} className='border-none rounded-lg' placeholder='email' id='email'/>
          <input type="password"  className='border-none rounded-lg' placeholder='password' id='password'/>
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
