import { getDownloadURL, getStorage, ref, uploadBytesResumable } from 'firebase/storage';
import React, { useState } from 'react'
import { app } from '../firebase';
import {useSelector} from 'react-redux';
import { useNavigate } from 'react-router-dom';

export default function CreateListing() {
    const {currentUser} = useSelector((state)=>state.user);
    const [files,setFiles] = useState([]);
    const [error,setError] = useState(false);
    const [loading,setLoading] = useState(false);
    const navigate = useNavigate();
    const [formData,setFormData] = useState({
        imageUrls:[],
        name:'',
        description:'',
        type:'',
        address:'',
        bedrooms:1,
        bathrooms:1,
        regularPrice:50,
        discountPrice:0,
        offer:false,
        parking:false,
        furnished:false,
    });

    console.log(formData);

    const [imageUploadError,setImageUploadError] = useState(false);
    const [uploading,setUploading] = useState(false);

    const handleImageSubmit=(e)=>{
        if(files.length > 0 && files.length + formData.imageUrls.length<7){
            setUploading(true);
            setImageUploadError(false);
            const promises = [];

            for (let i=0; i<files.length ; i++){
                promises.push(storeImage(files[i]));
            }
            Promise.all(promises).then((urls)=>{
                setFormData({...formData,imageUrls:formData.imageUrls.concat(urls)});
                setImageUploadError(false);
                setUploading(false);
                
            }).catch((error)=>{
                setImageUploadError('Image upload failed (2 mb max per image)');
                setUploading(false);
            })
        }
        else if(files.length === 0){
            setImageUploadError('Image field is required');
            setUploading(false);
        }
        else{
            setImageUploadError('You can only uploaded 6 image per listing');
        }
    };
    const storeImage = async(file)=>{
        return new Promise((resolve,reject)=>{
            const storage = getStorage(app);
            const fileName = new Date().getTime() + file.name;
            const storageRef = ref(storage,fileName);
            const uploadTask = uploadBytesResumable(storageRef,file);
            uploadTask.on(
                "state_changed",
                (snapshot) =>{
                    const progress = (snapshot.bytesTransferred/snapshot.totalBytes) * 100;
                    console.log(`upload is ${progress}% done`)
                },
                (error)=>{
                    reject(error);
                },
                ()=>{
                    getDownloadURL(uploadTask.snapshot.ref).then((downloadURL)=>{
                    resolve(downloadURL);
                    });
                }
                
            )
        });
    }

    const handleRemoveImage = (index)=>{
        setFormData({
            ...formData,
            imageUrls:formData.imageUrls.filter((_,i) => i !== index),
        })
    }

    const handelChange =(e) =>{
        if(e.target.id === 'sale' || e.target.id === 'rent'){
            setFormData({
                ...formData,
                type:e.target.id
            });
        }
        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.checked
            })
        }
        if(e.target.type === 'number' || e.target.type === 'text' || e.target.type === 'textarea'){
            setFormData({
                ...formData,
                [e.target.id]:e.target.value
            })
        }
    }

    const handelSubmit = async(e) =>{
        e.preventDefault();
       
        try{
            if(!formData.name || !formData.address || !formData.description || !formData.bedrooms || !formData.bathrooms || !formData.regularPrice || formData.imageUrls.length<1){
                return setError('All field are required');
            }
            if(formData.regularPrice < formData.discountPrice){
                return setError('Discount price must br lower than regular price')
            }

           
            setLoading(true);
            setError(false);
            const res = await fetch('/api/listing/create',{
                method:'POST',
                headers:{
                    'Content-Type':'application/json',
                },
                body:JSON.stringify({
                    ...formData,
                    userRef:currentUser._id
                }),
            })
            const data = await res.json();

            setLoading(false);
            if(data.success === false){
                setError(data.message);
                
            }

            navigate(`/listing/${data._id}`)
        }
        catch(error){
            setError(error.message);
            setLoading(false);
        } 
    }

  return (
    <div className='p-3 max-w-4xl mx-auto'>
        <h1 className='font-bold text-center text-3xl my-7'>
            Create Listing
        </h1>
      <form onSubmit={handelSubmit}>
      <div className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' id='name'  className='border-none rounded-lg' required onChange={handelChange} value={formData.name}/>
            <textarea type="text" placeholder='Description' id='description' className='border-none rounded-lg' required onChange={handelChange} value={formData.description}/>
            <input type="text" placeholder='Address' id='address' className='border-none rounded-lg' required onChange={handelChange} value={formData.address}/>
        </div>
        <div>
           <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2'>
               <input type="checkbox" id='sale' className=' focus:ring-transparent w-5 h-5 border-gray-300 ' onChange={handelChange} checked={formData.type === 'sale'}/>
               <span className=''>Sell</span>
            </div>
            <div className='flex gap-2'>
               <input type="checkbox" id='rent' className=' focus:ring-transparent w-5 h-5 border-gray-300' onChange={handelChange} checked={formData.type === 'rent'}/>
               <span>Rent</span>
            </div>
            <div className='flex gap-2'>
               <input type="checkbox" id='parking' className=' focus:ring-transparent w-5 h-5 border-gray-300' onChange={handelChange} checked={formData.parking}/>
               <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
               <input type="checkbox" id='furnished' className=' focus:ring-transparent w-5 h-5 border-gray-300' onChange={handelChange} checked={formData.furnished}/>
               <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
               <input type="checkbox" id='offer' className=' focus:ring-transparent w-5 h-5 border-gray-300' onChange={handelChange} checked={formData.offer}/>
               <span>Offer</span>
            </div>
            
           </div>
           <div className='flex gap-3'>
            <div className='flex gap-2 py-3'>
                <input type="number" max='10' min='1' name="beds" id="bedrooms" className='h-18 w-30 border-none rounded-lg' onChange={handelChange} checked={formData.bedrooms}/>
                <span>Beds</span>
            </div>
            <div className='flex gap-2 py-3'>
                <input type="number" max='5' min='1' name="bath" id="bathrooms" className='h-16 w-30 border-none rounded-lg' onChange={handelChange} checked={formData.bathrooms}/>
                <span>Baths</span>
            </div>
           </div>
           <div className='flex flex-row gap-2'>
           <div className='flex gap-2'>
            <input type="number" className='w-40 h-14 border-none rounded-lg' id='regularPrice' min='50' onChange={handelChange} checked={formData.regularPrice}/>
            <div className='flex flex-col'>
            <span>Regular price</span>
            {formData.type === 'rent' &&(
                <p>($/Month)</p>
            )}
            </div>
           </div>
           {formData.offer && (
            <div className='flex gap-2'>
            <input type="number" className='w-40 h-14 border-none rounded-lg' id='discountPrice' min='0' onChange={handelChange} checked={formData.discountPrice}/>
            <div className='flex flex-col'>
            <span>Discounted price</span>
            {formData.type === 'rent' &&(
                <p>($/Month)</p>
            )}
            </div>
           </div>
           )}
           
           </div>
        </div>
      </div>

      <div>
            <div className='flex py-5 gap-2'>
                <span className='font-semibold'>Images:</span>
                <p className='text-gray-500'>The first image will be the cover (max 6)</p>
            </div>
            <div>
                <input type="file" accept='image/*' id='images' multiple onChange={(e)=>setFiles(e.target.files)} />
                <button className=' p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80' type='button' onClick={handleImageSubmit} disabled={uploading || loading}>
                    {uploading ? 'Uploading...' : 'Upload'}
                </button>
            </div>

            <p className='text-red-600 py-3'>
                {imageUploadError && imageUploadError}
            </p>

            <div className=''>
            {
                formData.imageUrls.length > 0 && formData.imageUrls.map((url,index)=>(
                    <div className='flex justify-between py-3 ' key={url}>
                        <img src={url} alt='listing image' className='w-40 h-40 ' />
                        <button className='text-sm text-red-700 hover:underline uppercase' type='button' onClick={()=>handleRemoveImage(index)}>Delete</button>
                    </div>
                ))
            }
            </div>

            <div className=''>
            <button className='py-2 w-full  mt-4 rounded-lg bg-slate-700 text-white uppercase hover:opacity-95 disabled:opacity-80' disabled={loading || uploading} >
                {
                    loading ? 'Creating...': 'Create Listing'
                }
            </button>
            {error && <p className='text-red-700 text-sm my-3'>{error}</p>}
            </div>
        </div>
      </form>
      
      
    </div>
  )
}
