import React, { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import ListingItem from '../components/ListingItem';

export default function Home() {
  const [loading,setLoading] = useState(false);
  const [showMore,setShowMore] = useState(false);
  const [listing,setListing] = useState([]);

  useEffect(()=>{
    const fetchListing = async () =>{
      setLoading(true);
      setShowMore(false);
      
      const res = await fetch(`/api/listing/getlistings`);
      const data = await res.json();
      if(data.length > 8){
          setShowMore(true);
      }
      else{
          setShowMore(false);
      }
      setListing(data);
      setLoading(false);
  };
  fetchListing();
  },[listing._id])

  const onShowMoreClick = async () =>{
    const numberOfListings = listing.length;
    const startIndex = numberOfListings;
    const urlParams = new URLSearchParams(location.search);
    urlParams.set('startIndex',startIndex);
    const searchQuery = urlParams.toString();
    const res = await fetch(`/api/listing/getlistings?${searchQuery}`);
    const data = await res.json();
    if (data.length < 9) {
    setShowMore(false);
    }
    setListing([...listing, ...data]);
}

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
        <Link className='text-blue-800 font-semibold cursor-pointer hover:underline' to={'/search'}>Let's Start now...</Link>
      
      </div>
      
      <div>
        <img src="https://lirp.cdn-website.com/bf4fe880/dms3rep/multi/opt/estate+vs+a+house+-+Ranger+Ridge-1920w.jpeg" alt="home page photo" 
        className=''/>
      </div>

      <div className=''>
            <h1 className='text-3xl font-bold text-slate-700 p-4'>Listing result:</h1>
            <div className='p-7 flex flex-wrap gap-4'>
                {!loading && listing.length === 0 && (
                        <p className='text-lg text-center text-slate-700'>No result found..!</p>
                    )
                }
                {
                    loading && ( 
                        <p className='text-red-500 text-lg'>
                            Loading...
                        </p>
                    )
                }

                {
                    !loading && listing && listing.map((listing)=>(
                        <ListingItem key={listing._id} listing={listing} className=""/>
                    ))
                }



            </div>
            <div className='text-center mb-4'>
            {showMore && (
                <button onClick={onShowMoreClick} className='text-green-600 hover:underline'> Show More</button>
            )}
            </div>
        </div>
    </div>
  )
}
