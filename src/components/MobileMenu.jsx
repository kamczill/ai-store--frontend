import React from 'react'
import { NavLink, Link } from 'react-router-dom'
import { logout } from '../utils/navbarHelpers'

const MobileMenu = ({ user, handleClick }) => {
  return (
    <div className='border-t-2 m-3 pt-4 flex flex-col justify-center items-center gap-5 lg:hidden'>
        { user.logged_in ? (
            <>
            <div onClick={(e) => handleClick(e)}><NavLink  to='/' className='self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0 '>Główna</NavLink></div>
            <div onClick={(e) => handleClick(e)}><NavLink  to='/materialy' className='self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0 '>Moje materiały</NavLink></div>
            <div onClick={(e) => handleClick(e)}><NavLink  to='/produkty' className='self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Dostępne produkty</NavLink></div>
            <div onClick={(e) => handleClick(e)}><NavLink  to='/zamowienia' className='self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Zamówienia</NavLink></div>
            <div onClick={(e) => handleClick(e)}><NavLink  to='/konto'  className='self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Konto</NavLink></div>
            <div>
                <Link
                className='self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'
                to='/'
                onClick={() => logout(user)}
                >
                    Wyloguj
                </Link>
                </div>
            </>
            ) : (
            <>
                <div onClick={(e) => handleClick(e)}><NavLink  to='/' className='self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0 '>Główna</NavLink></div>
                <div onClick={(e) => handleClick(e)}><NavLink  to='/produkty' className='self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Dostępne produkty</NavLink></div>
                <NavLink to='/login' className='mt-1 bg-gray-700 text-white px-5 py-2'>Zaloguj się</NavLink>
            </>
            )
        }
    </div>
  )
}

export default MobileMenu