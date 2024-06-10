import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import  SwiperCore  from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';
import {FaMapMarkerAlt,FaBath,FaBed,FaChair,FaMapMarkedAlt,FaParking} from 'react-icons/fa'
import { useSelector} from 'react-redux'
import Contact from '../components/Contact';

export default function Listing_Page() {
    SwiperCore.use([Navigation]);
    const param = useParams();
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError]  = useState(false);
    const currentUser = useSelector((state)=>state.user);
    const [contact,setContact] = useState(false);

useEffect(()=>{
    
    const fetchListing = async () => {
        try{
            setLoading(true);
            setError(false);
            const res = await fetch(`/api/listing/getlisting/${param.listingId}`);
            const data = await res.json();

        if(data.success === false){
            setError(true);
            setLoading(false);
            return;
        }
        setListing(data);
        }
        catch(error){
            setError(true);
            setLoading(false);
            console.log(error.message);
        }
        setLoading(false);
    }
    fetchListing();
},[])

  return (
    <main>
        {loading && <p className='text-center my-7 text-2xl'>Loading...</p>}
        {error && <p className='text-center my-7 text-2xl text-red-600'>something went wrong!</p>}
        {listing && !loading && !error &&(
            <>
            <Swiper navigation>
                {
                    listing.imageUrls.map((url)=>(
                        <SwiperSlide key={url}>
                            <div className='h-[550px]' style={{background:`url(${url}) center no-repeat`, backgroundSize:'cover'}}>
                            
                            </div>
                        </SwiperSlide>
                    ))
                }
            </Swiper>
            <div className='p-4'>
            <h1 className='text-3xl font-semibold'>
                {listing.name}{' - $ '}{listing.regularPrice}
            </h1>
            <p className='flex items-center  gap-2 text-slate-600  text-sm'>
              <FaMapMarkerAlt className='text-green-700' />
              {listing.address}
            </p>
            <div className='flex gap-4 py-3'>
              <p className='bg-red-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                {listing.type === 'rent' ? 'For Rent' : 'For Sale'}
              </p>
              {listing.offer && (
                <p className='bg-green-900 w-full max-w-[200px] text-white text-center p-1 rounded-md'>
                  ${+listing.regularPrice - +listing.discountPrice} discount
                </p>
              )}
            </div>
            <p className='text-slate-800 mt-4'>
              <span className='font-semibold text-black'>Description - </span>
              {listing.description}
            </p>
            <ul className='flex gap-4 text-green-800 text-sm flex-wrap items-center font-semibold mt-4'>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBed className='text-lg' />
                {listing.bedrooms > 1
                  ? `${listing.bedrooms} beds `
                  : `${listing.bedrooms} bed `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaBath className='text-lg' />
                {listing.bathrooms > 1
                  ? `${listing.bathrooms} baths `
                  : `${listing.bathrooms} bath `}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaParking className='text-lg' />
                {listing.parking ? 'Parking spot' : 'No Parking'}
                </li>
                <li className='flex items-center gap-1 whitespace-nowrap '>
                <FaChair className='text-lg' />
                {listing.furnished ? 'Furnished' : 'Unfurnished'}
                </li>
            </ul>
           {
            currentUser && listing.userRef !== currentUser._id && !contact && (
              <button onClick={()=>setContact(true)} className='bg-slate-700 w-full rounded-lg text-center py-2 text-white mt-4'>Contact landlord</button>
            )
           }
           {
            contact && <Contact listing = {listing}/>
           }
            </div>

            </>
        )}
        
    </main>
  )
}
