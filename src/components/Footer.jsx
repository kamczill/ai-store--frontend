import React from 'react'
import { Link, Navigate } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='w-full self-end item-center text-center py-12 p-5'>
        <div className='flex justify-center gap-5'>
            <Link to="/regulamin">Regulamin</Link>
            <Link to="/polityka-prywatnosci">Polityka Prywatności</Link>
        </div>
        <p>2023 © ai.swiat</p>
    </footer>
  )
}

export default Footer