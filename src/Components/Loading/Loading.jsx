import React from 'react'

export default function Loading() {
  return (
    <>
        <section className='min-h-[70vh] flex justify-center items-center  pt-16'>
            <div className="loading w-1/3 py-5 flex justify-center items-center">
            <i class="fa-solid fa-spinner fa-spin fa-2xl"></i>
            </div>
        </section>
    </>
  )
}
