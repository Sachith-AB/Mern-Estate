import React, { useEffect, useState } from 'react'
import { useParams } from 'react-router-dom'
import {Swiper,SwiperSlide} from 'swiper/react';
import  SwiperCore  from 'swiper';
import {Navigation} from 'swiper/modules';
import 'swiper/css/bundle';

export default function Listing_Page() {
    SwiperCore.use([Navigation]);
    const param = useParams();
    const [listing,setListing] = useState(null);
    const [loading,setLoading] = useState(false);
    const [error,setError]  = useState(false);

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
            </>
        )}
    </main>
  )
}
