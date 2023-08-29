import React from 'react'

const AiTool = ({icon, name, description, href, grid, smallImage}) => {
  return (
    <div class={`flex flex-col items-start max-w-[350px] border border-slate-400 bg-grey-50 rounded-xl p-4 font-poppins lg:max-w-full ${grid}`}>
        <img src={icon} class={`${smallImage ? 'w-[50%] lg:w-[30%]' : 'w-[50%]'} rounded-xl`}/>
        <a href={href}><h2 class='font-bold text-xl underline underline-offset-4 py-3'>{name}</h2></a>
        <p className='font-ms '>{description}</p>
    </div>
  )
}

export default AiTool