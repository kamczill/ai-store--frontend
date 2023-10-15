import React from 'react'
import { Link } from 'react-router-dom'
const FreeGuide = () => {
  return (
    <div className='w-full flex justify-center items-center bg-white py-12 p-5 font-poppins'>
        <div className='flex flex-col justify-center items-center gap-5 max-w-[1280px]'>
        <h2 className='text-3xl text-center'>
            Załóż konto i <span className='text-green-600 font-bold'>otrzymaj za darmo</span> PDF z ponad 600 najlepszymi zapytaniami do ChatuGPT!
        </h2>
        <button className='rounded border px-5 py-3 outline-dashed max-w-[200px]'>
          <Link to='/login'>Zarejestruj mnie!</Link>
          </button>
        </div>  
    </div>
  )
}

export default FreeGuide