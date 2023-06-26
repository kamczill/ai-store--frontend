import React from 'react'

const AiTool = ({icon, name, description, href}) => {
  return (
    <div class='flex flex-col max-w-[350px] border border-slate-400 rounded-xl p-4 font-poppins'>
        <img src={icon} class='w-[30%] justify-self-end self-end'/>
        <a href={href}><h2 class='font-bold text-xl underline underline-offset-4'>{name}</h2></a>
        <p>{description}</p>
    </div>
  )
}

export default AiTool