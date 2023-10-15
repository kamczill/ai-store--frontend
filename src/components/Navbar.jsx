import React, { useState, useContext, useRef, useEffect } from 'react'
import { NavLink, Link } from 'react-router-dom';
import { AiOutlineMenu, AiOutlineClose } from 'react-icons/ai'
import { BsCartFill } from 'react-icons/bs'
import { BiSolidUser } from 'react-icons/bi'
import { AuthContext, CartContext } from '../App';
import Cart from './Cart';
import { setOverlay, logout } from '../utils/navbarHelpers';
import MobileMenu from './MobileMenu';


const Navbar = ({mainRef, containerRef}) => {
    const [menuIsOpen, setMenuIsOpen ] = useState(false);
    const [cartIsOpen, setCartIsOpen ] = useState(false);
    const [userNavIsOpen, setUserNavIsOpen] = useState(false)
    const [clickedOutside, setClickedOutside] = useState(false);
    
    const {currentUser: user, setCurrentUser} = useContext(AuthContext)
    const {amountOfProducts} = useContext(CartContext)

    const cartRef = useRef(null);
    const cartIconRef = useRef(null);
    const cartIconDesktopRef = useRef(null);


    const handleClick = (e) => {
        if (!e) return;
        setCartIsOpen(false)
        if (userNavIsOpen) setUserNavIsOpen(false)
        if (menuIsOpen) setMenuIsOpen(false)
    }

    const toggleCart = () => {
        setCartIsOpen(prev => !prev );
        setUserNavIsOpen(false)
    }

    const toggleUserNav = () => {
        setUserNavIsOpen(prev => !prev);
        setCartIsOpen(false)
    }

    const handleClickOutside = (event) => {
        if (
            cartRef.current 
            && !cartRef.current.contains(event.target) 
            && !cartIconRef.current.contains(event.target) 
            && !cartIconDesktopRef.current.contains(event.target)
        ) {
        toggleCart();
        }
    };

    const handleOpenMenu = () => {
        if(menuIsOpen){
            setMenuIsOpen(false)
        } else {
            setMenuIsOpen(true)
            if(cartIsOpen) setCartIsOpen(false)
        }
    }
    
    const handleOpenCart = () => {
        if(cartIsOpen){
            setCartIsOpen(false)
        } else {
            setCartIsOpen(true)
            if(menuIsOpen) setMenuIsOpen(false)
        }
    }

    useEffect(() => {
        setOverlay(mainRef, containerRef, cartIsOpen, menuIsOpen);
    }, [mainRef, containerRef, cartIsOpen, menuIsOpen])


    useEffect(() => {
        document.addEventListener('click', handleClickOutside);
        
        return () => {
            document.removeEventListener('click', handleClickOutside);
        };
    }, [])

  return (
    <header>
    <nav className='flex justify-between items-center p-5 font-ms'>
        <h2 className='col-span-1 text-3xl font-bold lg:col-start-2 lg:text-center' onClick={() => handleClick()}>
            <Link to='/' className='hover:text-black'>
            <span className='text-green-400'>AI</span>Szef
            </Link>
        </h2>
        <div className='flex gap-5 lg:hidden'>
            { user.logged_in ? (                    
                <div className='relative' onClick={() => handleOpenCart()} ref={cartIconRef}>
                    <BsCartFill size={30}/> 
                        {amountOfProducts > 0 ?
                        <div className='absolute top-[-5px] right-[-5px] text-black w-[20px] h-[20px] rounded-xl bg-white flex items-center justify-center'>{amountOfProducts}</div>: 
                        null
                        }
                        
                </div>
                ): ''
                }

            {menuIsOpen ? 
                <AiOutlineClose size={30} onClick={() => handleOpenMenu()} />:
                <AiOutlineMenu size={30} onClick={() => handleOpenMenu()}/> 
            }
        </div>
        {user.logged_in ?
        <div className='hidden lg:flex lg:justify-center lg:items-center lg:gap-3'>
                
                <div onClick={(e) => handleClick(e)}><NavLink  to='/' className='hidden self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0 '>Główna</NavLink></div>
                <div onClick={(e) => handleClick(e)}><NavLink  to='/materialy' className='hidden self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0 '>Moje materiały</NavLink></div>
                <div onClick={(e) => handleClick(e)}><NavLink  to='/produkty' className='hidden self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Dostępne produkty</NavLink></div>
                <div onClick={(e) => handleClick(e)}><NavLink  to='/zamowienia' className='hidden self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Zamówienia</NavLink></div>
                
                <div className='relative cursor-pointer' onClick={() => toggleUserNav()} ref={cartIconDesktopRef}>
                    <BiSolidUser size={30}/>
                    { userNavIsOpen ?
                        <div  className='absolute top-9 right-0 bg-white px-[3rem] py-3 flex flex-col items-center gap-1 z-10 sm:rounded sm:drop-shadow-xl'>
                            
                            <div onClick={(e) => handleClick(e)}><NavLink  to='/konto'  className='hidden self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Konto</NavLink></div>
                            <Link
                            className='hidden self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'
                            to='/'
                            onClick={() => logout()}
                            >
                                Wyloguj
                            </Link>
                        </div> 
                        : ''    
                    }
                </div>


                <div className='relative cursor-pointer' onClick={() => toggleCart()} ref={cartIconDesktopRef}>
                <BsCartFill size={30}/> 
                {
                    amountOfProducts > 0 ?
                    <div className='absolute top-[-5px] right-[-5px] text-black w-[20px] h-[20px] rounded-xl bg-white flex items-center justify-center'>{amountOfProducts}</div>: 
                    ''
                }
                </div>
         </div>
        :
        <div className='hidden lg:flex'>
        <div onClick={(e) => handleClick(e)}><NavLink  to='/' className='hidden self-end mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0 '>Główna</NavLink></div>
        <div onClick={(e) => handleClick(e)}><NavLink  to='/produkty' className='hidden  mt-5 text-slate-700 font-bold px-5 py-2 lg:block lg:justify-self-end lg:mt-0'>Dostępne produkty</NavLink></div>
        <Link
        className='hidden self-end mt-5 bg-gray-700 text-white px-5 py-2 lg:block lg:justify-self-end lg:mt-0 lg:ml-7'
        to='/login'
        >
            Zaloguj się
        </Link>
        </div>
    }
    </nav>
    {menuIsOpen && (
        <MobileMenu user={user} handleClick={handleClick} />
    )}
    
        { cartIsOpen && user.logged_in ? (
            <div className='absolute w-full min-h-screen z-30 bg-transparent'>
                <div ref={cartRef}>
                    <Cart closeState={clickedOutside} isOpen={setCartIsOpen}/>
                </div> 
            </div> 
        ): null
        }
    </header>
  )
}

export default Navbar