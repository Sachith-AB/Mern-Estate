import React from 'react'

export default function CreateListing() {
  return (
    <div className='p-3 max-w-4xl mx-auto'>
        <h1 className='font-bold text-center text-3xl my-7'>
            Create Listing
        </h1>
      
      <form className='flex flex-col sm:flex-row gap-4'>
        <div className='flex flex-col gap-4 flex-1'>
            <input type="text" placeholder='Name' id='name'  className='border-none rounded-lg' required/>
            <textarea type="text" placeholder='Description' id='description' className='border-none rounded-lg' required/>
            <input type="text" placeholder='Address' id='address' className='border-none rounded-lg' required/>
        </div>
        <div>
           <div className='flex flex-wrap gap-6'>
            <div className='flex gap-2'>
               <input type="checkbox" id='sell' className=' focus:ring-transparent w-5 h-5 border-gray-300 py-2'/>
               <span className=''>Sell</span>
            </div>
            <div className='flex gap-2'>
               <input type="checkbox" id='rent' className=' focus:ring-transparent w-5 h-5 border-gray-300'/>
               <span>Rent</span>
            </div>
            <div className='flex gap-2'>
               <input type="checkbox" id='parking' className=' focus:ring-transparent w-5 h-5 border-gray-300'/>
               <span>Parking spot</span>
            </div>
            <div className='flex gap-2'>
               <input type="checkbox" id='furnished' className=' focus:ring-transparent w-5 h-5 border-gray-300'/>
               <span>Furnished</span>
            </div>
            <div className='flex gap-2'>
               <input type="checkbox" id='offer' className=' focus:ring-transparent w-5 h-5 border-gray-300'/>
               <span>Offer</span>
            </div>
            
           </div>
           <div className='flex gap-3'>
            <div className='flex gap-2 py-3'>
                <input type="number" max='10' min='1' name="beds" id="beds" className='h-18 w-30 border-none rounded-lg'/>
                <span>Beds</span>
            </div>
            <div className='flex gap-2 py-3'>
                <input type="number" max='5' min='1' name="bath" id="bath" className='h-16 w-30 border-none rounded-lg'/>
                <span>Baths</span>
            </div>
           </div>
           <div className='flex flex-row gap-2'>
           <div className='flex gap-2'>
            <input type="number" className='w-40 h-14 border-none rounded-lg' />
            <div className='flex flex-col'>
            <span>Regular price</span>
            <p>($/Month)</p>
            </div>
           </div>
           <div className='flex gap-2'>
            <input type="number" className='w-40 h-14 border-none rounded-lg' />
            <div className='flex flex-col'>
            <span>Discounted price</span>
            <p>($/Month)</p>
            </div>
           </div>
           </div>
        </div>
      </form>
      <div>
            <div className='flex py-5 gap-2'>
                <span className='font-semibold'>Images:</span>
                <p className='text-gray-500'>The first image will be the cover (max 6)</p>
            </div>
            <div>
                <input type="file" accept='image/*' />
                <button className='p-3 text-green-700 border border-green-700 rounded uppercase hover:shadow-lg disabled:opacity-80'>upload</button>
            </div>
            <button className='py-2 px-72 mt-4 rounded-lg bg-gray-600 text-white uppercase hover:opacity-95 disabled:opacity-80'>create listing</button>
        </div>
      
    </div>
  )
}
