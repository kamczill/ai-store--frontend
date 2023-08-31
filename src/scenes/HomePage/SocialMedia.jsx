import React from 'react'
import { FaSquareInstagram, FaSquareFacebook, FaSquarePinterest, FaSquareTumblr } from 'react-icons/fa6'

const SocialMedia = () => {
  return (
    <div className='w-full flex justify-center items-center bg-white py-12'>
    <div className='max-w-[1200px] w-full flex flex-col justify-end items-center gap-5 lg:flex-row lg:pr-4 xl:pr-0'>
      <h3 className='text-lg font-ms'>Sprawdź nasze social media</h3>
      <div className='flex gap-3'>
      <FaSquareInstagram size={50} className='scale-90 cursor-pointer hover:scale-100'/>
      <FaSquareFacebook size={50} className='scale-90 cursor-pointer hover:scale-100'/>
      <FaSquareTumblr size={50} className='scale-90 cursor-pointer hover:scale-100'/>
      <FaSquarePinterest size={50} className='scale-90 cursor-pointer hover:scale-100'/>
      </div>
    </div>
    </div>
  )
}

export default SocialMedia