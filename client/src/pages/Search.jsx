import React from 'react'

export default function Search() {
  return (
    <div className='flex flex-col md:flex-row '>
        {/*left*/}
        <div className='p-7 border-b-2 md:border-r-2 md:min-h-screen lg:w-1/3'>
            <form action="" className='flex flex-col gap-8'>
                <div className='flex items-center flex-wrap gap-4 p-6'>
                    <label htmlFor="">Search Term:</label>
                    <input type="text" id='searchTerm' placeholder='Search...' className='focus:ring-0 rounded-lg p-3 w-full border-none ' />
                    
                    <div className='flex gap-2'>
                        <label htmlFor="" className='font-semibold'>Type:</label>
                        <input type="checkbox" name="type" id="type" className='focus:ring-transparent w-5 h-5 border-gray-300'/>
                        <span className='font-semibold'>Sale & Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="rent" id="rent" className='focus:ring-transparent w-5 h-5 border-gray-300'/>
                        <span className='font-semibold'>Rent</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="sale" id="sale" className='focus:ring-transparent w-5 h-5 border-gray-300'/>
                        <span className='font-semibold'>Sale</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="offer" id="offer" className='focus:ring-transparent w-5 h-5 border-gray-300'/>
                        <span className='font-semibold'>Offer</span>
                    </div>
                    
                </div>

                <div className='flex items-center flex-wrap gap-4 p-6'>
                   
                    <div className='flex gap-2'>
                        <label htmlFor="" className='font-semibold'>Amentities:</label>
                        <input type="checkbox" name="parking" id="parking" className='focus:ring-0 w-5 h-5 border-gray-300'/>
                        <span className='font-semibold'>Parking</span>
                    </div>
                    <div className='flex gap-2'>
                        <input type="checkbox" name="furnished" id="furnished" className='focus:ring-transparent w-5 h-5 border-gray-300'/>
                        <span className='font-semibold'>Furnished</span>
                    </div>
                    
                    
                </div>

                <div className='flex gap-3'>
                    <label htmlFor="" className='font-semibold'>
                        Sort:
                    </label>
                    <select name="" id="sort_order" className='border-none rounded-lg focus:ring-0'>
                        <option value="">Price low to high</option>
                        <option value="">Price high to low</option>
                        <option value="">Latest</option>
                        <option value="">Oldest</option>
                    </select>
                </div>
                <button className='w-full rounded-lg text-white bg-slate-700 py-3 uppercase hover:opacity-95'>search</button>
            </form>
        </div>
        {/*right*/}
        <div className='items-center text-center'>
            <h1 className='text-3xl font-bold text-slate-700 p-4'>Listing result:</h1>
        </div>
    </div>
  )
}
