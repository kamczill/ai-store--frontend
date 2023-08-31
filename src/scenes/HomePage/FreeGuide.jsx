import React from 'react'

const FreeGuide = () => {
  return (
    <div class='w-full flex justify-center items-center bg-white py-12 p-5 font-poppins'>
        <div class='flex flex-col justify-center items-center gap-5 max-w-[1280px]'>
        <h2 class='text-3xl text-center'>
            Załóż konto i <span class='text-green-600 font-bold'>otrzymaj za darmo</span> PDF z ponad 600 najlepszymi zapytaniami do ChatuGPT!
        </h2>
        <button class='rounded border px-5 py-3 outline-dashed max-w-[200px]'>Zarejestruj mnie!</button>
        </div>  
    </div>
  )
}

export default FreeGuide