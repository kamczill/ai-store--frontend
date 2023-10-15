import React from 'react'

const AiTool = ({icon, name, description, href, grid, smallImage}) => {
  return (
    <div className={`flex flex-col items-start max-w-[350px] bg-slate-50 rounded-xl shadow-xl p-5 py-8 font-poppins lg:max-w-full ${grid}`}>
        <img src={icon} className={`${smallImage ? 'w-[50%] lg:w-[30%]' : 'w-[50%]'} max-h-[100px] object-cover rounded-xl shadow-sm`}/>
        <a href={href}><h2 className='font-bold text-xl underline underline-offset-4 py-3'>{name}</h2></a>
        <p className='font-ms '>{description}</p>
        <div className='h-full flex items-end'>
          <button className='h-min px-5 py-3 bg-green-600 text-white rounded-2xl'>
            Więcej informacji
          </button>
        </div>
    </div>
  )
}

export default AiTool