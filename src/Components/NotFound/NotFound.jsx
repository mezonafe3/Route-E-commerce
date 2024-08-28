import React from 'react'
import img404 from '../../assets/images/error.jpg'
export default function NotFound() {
  return (
   <>
   <section className='min-h-[70vh] flex justify-center items-center bg-[#bdebe4] pt-16'>
    <div className="img-404 w-1/3 py-5 ">
      <img src={img404} alt="" className='w-full rounded-full' />
    </div>
   </section>
   </>
  )
}
