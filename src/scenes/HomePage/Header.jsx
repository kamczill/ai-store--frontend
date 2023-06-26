import React from 'react'
import tabletLogo from '../../assets/tablet-logo.png'
import brainSVG from '../../assets/Brain-Computer.svg'
const Header = () => {
  return (
    <div className='justify-self-center self-center flex flex-col gap-5 justify-center items-center font-poppins lg:flex-row mt-8'>
    <div class='w-[80%] max-w-[450px]'>
      <img src={brainSVG} class='w-full'/>
    </div>
    <div className='flex flex-col gap-5 px-10 max-w-[700px]'>
      <h1 class='font-poppins font-bold text-3xl text-center xl:text-5xl'><span class='text-green-500'>AI</span> nie zabierze Ci pracy, <span class='text-green-500'>AI</span> da Ci pracę!!</h1>
      <p class='text-center text-xl font-ms font-medium'>Kup ebooka i dowiedz się wszystkiego czego potrzebujesz, aby mieć bujną czuprynę w 2023 roku.</p>
      <div className='flex flex-col gap-5 lg:flex-row pt-6'>
        <button className='bg-green-300 border-slate-400 p-2 lg:w-3/6 rounded-2xl'>
          Kup E-booka
        </button>
        <button className='bg-red-400 text-white border-black p-2 lg:w-3/6 rounded-2xl'>
          Więcej informacji
        </button>
      </div>
    </div>
  </div>
  )
}

export default Header