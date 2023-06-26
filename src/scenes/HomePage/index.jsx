import React from 'react'
import tabletLogo from '../../assets/tablet-logo.png'
const index = () => {
  return (
    <div className='justify-self-center self-center flex flex-col gap-5 justify-center items-center font-poppins lg:flex-row'>
      <div class='max-w-[70%]'>
        <img src={tabletLogo} />
      </div>
      <div className='flex flex-col gap-5 px-10 max-w-[800px]'>
        <h1 class='font-poppins font-bold text-3xl text-center xl:text-5xl'><span class='text-green-500'>Włosy</span> szczęścia nie dają, ale ich brak nie daje również!!</h1>
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

export default index