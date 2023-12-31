import React from 'react'
import brainSVG from '../../assets/Brain-Computer.svg'
import { Link } from 'react-router-dom'
import bg from '../../assets/ffflux.svg'
const Header = () => {
  return (
    <div className={`relative w-full max-w-[1280px] justify-self-center self-center flex flex-col gap-5 justify-center items-center font-poppins py-12 lg:py-[150px] my-12 lg:flex-row bg-[url(${bg})]`}>
    <div className='absolute top-0 h-full w-full px-4'>
      <img src={bg} className='w-full h-full object-cover rounded-[50px]'/>
    </div>
    <div className='z-10 w-[80%] max-w-[450px] lg:pl-5'>
      <img src={brainSVG} alt='Brain illustration' className='w-full'/>
    </div>
    <div className='z-10 flex flex-col gap-5 px-10 max-w-[700px]'>
      <h1 className='font-poppins font-bold text-3xl text-center leading-relaxed xl:text-5xl'><span className='text-green-600'>AI</span> nie zabierze Ci pracy, <span className='text-green-600'>AI</span> da Ci pracę!!</h1>
      <p className='text-center text-xl font-ms leading-relaxed font-medium'>Kup ebooka i dowiedz się wszystkiego czego potrzebujesz, aby być na bieżąco z najnowszymi technologiami w 2023 roku.</p>
      <div className='flex flex-col gap-5'>
        <div className='flex flex-col gap-5 lg:flex-row pt-6'>
        <button className='bg-green-600 text-white border-slate-400 p-2 lg:w-3/6 rounded-2xl'>
          <Link to='/produkty'>Kup E-booka</Link>
        </button>
        <button className='bg-green-600 text-white border-black p-2 lg:w-3/6 rounded-2xl'>
          Więcej informacji
        </button>
        </div>
        <button className='bg-green-600 text-white border-black p-2 lg:w-full rounded-2xl'>
          Polecane narzędzia AI
        </button>
      </div>
    </div>
  </div>
  )
}

export default Header