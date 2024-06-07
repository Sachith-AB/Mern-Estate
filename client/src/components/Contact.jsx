import React, { useEffect, useState } from 'react'
import {Link} from 'react-router-dom'

export default function Contact({listing}) {

    const [landloard,setLandloard] = useState(null);
    const [message,setMessage] = useState(' ')

    useEffect(()=>{
       const fetchLandlord = async () =>{
        try{
            const res = await fetch(`/api/user/${listing.userRef}`);
            const data = await res.json();
            setLandloard(data);
            console.log(data);

        }catch(error){
            console.log(error.message);
        }
       }
       fetchLandlord();
    },[listing.userRef])

    const onChange = async (e) =>{
        setMessage(e.target.value);
    }

  return (
    <>
        {landloard && (
            <div className='flex flex-col gap-2'>
                <p>
                    Contact <span className='font-semibold'>{landloard.username}</span> for <span className='font-semibold'>{listing.name.toLowerCase()}</span>
                </p>
                <textarea name="message" id="message" rows="2" value={message} onChange={onChange} className='rounded-lg w-full border-none' placeholder='Enter your message here...'></textarea>
                <Link to={`mailto:${landloard.email}?subject=Regarding ${listing.name}&body=${message}`} className='w-full'>
                <button className='bg-slate-700 py-3 rounded-lg text-white hover:opacity-95 w-full'>Send message</button>
                </Link>
                
            </div>
        )}
    </>
  )
}
