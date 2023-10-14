import React from 'react'
import shape from './../assets/feature-shape-1.png'

const Feature = ({img, headline, text}) => {
  return (
    <div class='font-poppins flex flex-col justify-center items-center gap-3'>
        <div class='w-[80vw] max-w-[250px] relative'>
            <img src={shape} />
            <div class='absolute inset-0 flex justify-center items-center'>
              {img}
            </div>
        </div>
        <div class='flex flex-col justify-center items-center'>
            <h3 class='font-bold text-2xl text-gray-600'>{headline}</h3>
            <p class='text-lg text-center'>{text}</p>
        </div>
    </div>
  )
}

export default Feature