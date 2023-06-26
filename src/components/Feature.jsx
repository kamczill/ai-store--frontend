import React from 'react'
import shape from './../assets/feature-shape-1.png'

const Feature = ({img, headline, text}) => {
  return (
    <div class='font-poppins flex flex-col justify-center items-center gap-3'>
        <div class='w-[80vw] max-w-[250px] relative'>
            <img src={shape} />
            <img src={img}  class='w-[170px] absolute m-auto top-9 left-0 right-0'/>
        </div>
        <div class='flex flex-col justify-center items-center'>
            <h3 class='font-bold text-2xl text-gray-600'>{headline}</h3>
            <p class='text-lg text-center'>{text}</p>
        </div>
    </div>
  )
}

export default Feature