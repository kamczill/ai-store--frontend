import React, { useState, useContext } from 'react'
import { Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { AuthContext } from '../App';
import axios from 'axios';

const Navbar = () => {
    const [menuIsOpen, setMenuIsOpen ] = useState(false);
    const user = useContext(AuthContext)

    const logout = async () => {
        await axios('http://127.0.0.1:8001/users/logout/', {
            withCredentials: true,
            headers: {
                'Content-Type': 'application/json'
            }
        })
        .then(res => {
            user.logged_in = false
            window.location.reload(false);
        })
    }

  return (
    <header>
    <nav class='flex justify-between items-center p-5'>
        <h2 className='col-span-1 text-3xl font-bold lg:col-start-2 lg:text-center'>
            <Link to='/' class='hover:text-black'>
            <span className='text-green-400'>ai.</span>swiat
            </Link>
        </h2>
        <div class='lg:hidden'>
            {menuIsOpen ? 
                <AiOutlineClose size={30} onClick={() => setMenuIsOpen(!menuIsOpen)} />:
                <AiOutlineMenu size={30} onClick={() => setMenuIsOpen(!menuIsOpen)}/> 
            }
        </div>
        {user.logged_in ?
        <div class='flex gap-3'>
          <Link to='/materialy' class='hidden self-end mt-5 bg-gray-700 text-white px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Moje materiały</Link>
                <Link to='/produkty' class='hidden self-end mt-5 bg-gray-700 text-white px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Dostępne produkty</Link>
                <Link to='/zamowienia' class='hidden self-end mt-5 bg-gray-700 text-white px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Zamówienia</Link>
                <Link to='/konto'  class='hidden self-end mt-5 bg-gray-700 text-white px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Konto</Link>
            <Link
            class='hidden self-end mt-5 bg-gray-700 text-white px-5 py-2 lg:block lg:justify-self-end lg:mt-0'
            to='/'
            onClick={() => logout()}
            >
                Wyloguj
            </Link>
         </div>
        :
        <Link
        class='hidden self-end mt-5 bg-gray-700 text-white px-5 py-2 lg:block lg:justify-self-end lg:mt-0'
        to='/login'
        >
            Zaloguj się
        </Link>
    }
    </nav>
    {menuIsOpen && (
        <div class='border-t-2 mt-3 flex flex-col justify-center lg:hidden'>
            { user.logged_in ? (
                <>
                <Link to='/materialy' class='mt-5 bg-gray-700 text-white px-5 py-2 text-center'>Moje materiały</Link>
                <Link to='/produkty' class='mt-5 bg-gray-700 text-white px-5 py-2 text-center'>Produkty</Link>
                <Link to='/zamowienia' class='mt-5 bg-gray-700 text-white px-5 py-2 text-center'>Zamówienia</Link>
                <Link to='/konto'  class='mt-5 bg-gray-700 text-white px-5 py-2 text-center'>Konto</Link>
                <Link to='/login' onClick={() => logout()} class='mt-5 bg-gray-700 text-white px-5 py-2 text-center'>Wyloguj się</Link>

                </>
                ) :
                <Link to='/login' onClick={() => logout()} class='mt-5 bg-gray-700 text-white px-5 py-2'>Zaloguj się</Link>
            }
        </div>
    )}
    
    </header>
  )
}

export default Navbar