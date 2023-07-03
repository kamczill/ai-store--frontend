import React from 'react'
import { Link, Navigate } from 'react-router-dom'

const Footer = () => {
  return (
    <footer className='self-end item-center text-center mt-12 p-5'>
        <div class='flex justify-center gap-5'>
            <Link to="/regulamin">Regulamin</Link>
            <a class='cursor-pointer'>Polityka Prywatności</a>
        </div>
        <p>2023 © ai.swiat</p>
    </footer>
  )
}

export default Footer