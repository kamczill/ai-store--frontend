import React, {useState} from 'react'
import { RiArrowDownSLine, RiArrowUpSLine } from 'react-icons/ri'

const Contents = ({contents}) => {
    const [isOpen, setIsOpen] = useState(false)
  return (
    <div className='w-full p-3 flex flex-col items-center justify-center'>
        <div className='w-full max-w-lg py-2 bg-slate-500 flex gap-4 items-center justify-center text-white cursor-pointer' onClick={() => setIsOpen(!isOpen)}>
            <h3>Spis treści</h3>
            {isOpen ? <RiArrowDownSLine size={30}/> : <RiArrowUpSLine size={30}/> }
        </div>
        {isOpen ? (
            <div className='bg-slate-50 w-full max-w-lg'>
                {Object.entries(contents).map(el => <p>{el[0]}   {el[1]}</p>)}
            </div>
        ): ''}
    </div>
  )
}

export default Contents