import React, { useEffect, useState } from 'react'
import {useNavigate} from 'react-router-dom'
import ListingItem from '../components/ListingItem';


export default function Search() {
    const navigate = useNavigate();
    const [loading,setLoading] = useState(false);
    const [listing,setListing] = useState([]);

    useEffect(()=>{
        const urlParams = new URLSearchParams(location.search);
        const searchTermFromUrl = urlParams.get('searchTerm');
        const typeFromUrl = urlParams.get('type');
        const parkingFromUrl = urlParams.get('parking');
        const furnishedFromUrl = urlParams.get('furnished');
        const offerFromUrl = urlParams.get('offer');
        const sortFromUrl = urlParams.get('sort');
        const orderFromUrl = urlParams.get('order');

        if(searchTermFromUrl ||
            typeFromUrl ||
            parkingFromUrl ||
            furnishedFromUrl ||
            offerFromUrl ||
            sortFromUrl ||
            orderFromUrl 
        ){
            setSideBarDate({
                searchTerm:searchTermFromUrl || '',
                type:typeFromUrl || 'all',
                parking:parkingFromUrl === 'true' ? true : false,
                furnished:furnishedFromUrl === 'true' ? true : false,
                offer:offerFromUrl === 'true' ? true : false,
                sort:sortFromUrl === 'created_at',
                order:orderFromUrl || 'desc'
         });
        }

        const fetchListing = async () =>{
            setLoading(true);
            const searchQuery = urlParams.toString();
            const res = await fetch(`/api/listing/getlistings?${searchQuery}`);
            const data = await res.json();
            setListing(data);
            setLoading(false);
        };
        fetchListing();

    },[location.search]);


    const [sideBarData,setSideBarDate] = useState({
        searchTerm:'',
        type:'',
        parking:false,
        furnished:false,
        offer:false,
        sort:'created_at',
        order:'desc'
    })
    
    const handelChanege = async(e)=>{
        if(e.target.id === 'all' || e.target.id === 'rent' || e.target.id === 'sale'){
            setSideBarDate({...sideBarData,type:e.target.id})
        }

        if(e.target.id === 'searchTerm'){
            setSideBarDate({...sideBarData,searchTerm:e.target.value})
        }

        if(e.target.id === 'parking' || e.target.id === 'furnished' || e.target.id === 'offer'){
            setSideBarDate({...sideBarData,[e.target.id]:e.target.checked || e.target.checked === 'true' ? true:false})
        }

        if(e.target.id === 'sort_order'){
            const sort = e.target.value.split('_')[0] || 'created_at';
            const order = e.target.value.split('_')[1] || 'desc';
            setSideBarDate({...sideBarData,sort,order});
        }
    }

    const handleSubmit = async (e) => {
        e.preventDefault();

        const urlParams = new URLSearchParams();
        urlParams.set('searchTerm',sideBarData.searchTerm);
        urlParams.set('type',sideBarData.type);
        urlParams.set('parking',sideBarData.parking);
        urlParams.set('furnished',sideBarData.furnished);
        urlParams.set('offer',sideBarData.offer);
        urlParams.set('sort',sideBarData.sort);
        urlParams.set('order',sideBarData.order);
        const searchQuery = urlParams.toString();
        navigate(`/search?${searchQuery}`);

    }

    
    

  return (
    <div className='flex flex-col md:flex-row '>
        {/*left*/}
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen lg:w-1/3'>
            <form action="" className='flex flex-col gap-8' onSubmit={handleSubmit}>
                <div className='flex items-center flex-wrap gap-4 p-6'>
                    <label htmlFor="">Search Term:</label>
                    <input type="text" id='searchTerm' placeholder='Search...' className='focus:ring-0 rounded-lg p-3 w-full border-none ' 
                    value={sideBarData.searchTerm}
                    onChange={handelChanege}/>
                    
                    <div className='flex gap-2'>
                        <label htmlFor="" className='font-semibold'>Type:</label>
                        <input type="checkbox" name="type" id="all" className='focus:ring-transparent w-5 h-5 border-gray-300'
                        onChange={handelChanege}
                        checked={sideBarData.type === 'all'}/>
                        <span className='font-semibold'>Sale & Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="rent" id="rent" className='focus:ring-transparent w-5 h-5 border-gray-300'
                        onChange={handelChanege}
                        checked={sideBarData.type === 'rent'}
                        />
                        <span className='font-semibold'>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="sale" id="sale" className='focus:ring-transparent w-5 h-5 border-gray-300'
                         onChange={handelChanege}
                         checked={sideBarData.type === 'sale'}/>
                        <span className='font-semibold'>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="offer" id="offer" className='focus:ring-transparent w-5 h-5 border-gray-300'
                         onChange={handelChanege}
                         checked={sideBarData.offer === true}/>
                        <span className='font-semibold'>Offer</span>
                    </div>
                    
                </div>

                <div className='flex items-center flex-wrap gap-4 p-6'>
                   
                    <div className='flex gap-2'>
                        <label htmlFor="" className='font-semibold'>Amentities:</label>
                        <input type="checkbox" name="parking" id="parking" className='focus:ring-0 w-5 h-5 border-gray-300'
                         onChange={handelChanege}
                         checked={sideBarData.parking === true}/>
                        <span className='font-semibold'>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="furnished" id="furnished" className='focus:ring-transparent w-5 h-5 border-gray-300'
                         onChange={handelChanege}
                         checked={sideBarData.furnished === true}/>
                        <span className='font-semibold'>Furnished</span>
                    </div>
                    
                    
                </div>

                <div className='flex gap-3'>
                    <label htmlFor="" className='font-semibold'>
                        Sort:
                    </label>
                    <select name="" id="sort_order" className='border-none rounded-lg focus:ring-0'
                    onChange={handelChanege}
                    defaultValue={'created_at_desc'}>
                        <option value="regularPrice_desc">Price low to high</option>
                        <option value="regularPrice_asc">Price high to low</option>
                        <option value="createdAt_desc">Latest</option>
                        <option value="createdAt_asc">Oldest</option>
                    </select>
                </div>
                <button disabled={loading} className='w-full rounded-lg text-white bg-slate-700 py-3 uppercase hover:opacity-95'>search</button>
            </form>
        </div>
        {/*right*/}
        <div className='items-center text-center'>
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
        </div>
    </div>
  )
}
