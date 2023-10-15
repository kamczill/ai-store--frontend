// Third-party libraries
import { createContext, useState, useEffect, useRef } from 'react';
import { Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import Cookies from 'js-cookie';

// Components
import Navbar from './components/Navbar';
import Footer from './components/Footer';

// Scenes/Pages
import HomePage from './scenes/HomePage';
import ShopRulesPage from './scenes/ShopRulesPage';
import LoginPage from './scenes/LoginPage';
import AccountPage from './scenes/AccountPage';
import MaterialsPage from './scenes/MaterialsPage';
import OrdersPage from './scenes/OrdersPage';
import OrderPage from './scenes/OrderPage';
import ProductsPage from './scenes/ProductsPage';
import ProductPage from './scenes/ProductPage';
import ResetPasswordPage from './scenes/ResetPasswordPage';
import OpenBoughtProductPage from './scenes/OpenBoughtProductPage';
import PrivatePolicyPage from './scenes/PrivatePolicyPage';

// Styles
import './App.css';

// Contexts
export const AuthContext = createContext();
export const CartContext = createContext();
export const clearWaitingQueue = () => {
  toast.clearWaitingQueue();
};

// Hooks
import { useCurrentUser } from './hooks/useCurrentUser';

const App = () => {
  const { currentUser, setCurrentUser } = useCurrentUser();
  const [amountOfProducts, setAmountOfProducts] = useState()
  const containerRef = useRef(null)
  const mainRef = useRef(null)

  const updateCart = (newValue) => {
    setAmountOfProducts(newValue)
  }

  useEffect(() => {
    const getLenghtOfCart = () => JSON.parse(localStorage.getItem('cart'))?.length || 0
    setAmountOfProducts(getLenghtOfCart())
  }, [])

  return (
   <>
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      <CartContext.Provider value={{amountOfProducts, updateCart }}>
        <div className='flex flex-col min-h-screen w-full bg-white' id='container' ref={containerRef}>
          <header>
            <Navbar mainRef={mainRef} containerRef={containerRef} />
          </header>
          <div className='h-full grid grid-flow-row flex-grow' id='main' ref={mainRef}>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path="/regulamin" element={<ShopRulesPage/>} />
              <Route path="/polityka-prywatnosci" element={<PrivatePolicyPage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/password-reset/:token" element={<ResetPasswordPage/>} />
              <Route path='/produkty' element={<ProductsPage />} />
              <Route path='/produkty/:id' element={<ProductPage /> } />
              
              <Route path='/konto' element={currentUser.logged_in ? <AccountPage /> : <HomePage/> } />
              <Route path='/zamowienia' element={currentUser.logged_in ? <OrdersPage /> : <HomePage/> } />
              <Route path='/zamowienia/:id' element={currentUser.logged_in ? <OrderPage /> : <HomePage/> } />
              <Route path='/materialy' element={currentUser.logged_in ? <MaterialsPage /> : <HomePage/> } />
              <Route path='/materialy/:id' element={currentUser.logged_in ? <OpenBoughtProductPage/> : <HomePage/> } />
            </Routes>
          </div>
          <Footer />
        </div>
        <ToastContainer limit={1} className='p-5 md:p-0' />
      </CartContext.Provider>
    </AuthContext.Provider>
  </>
  )
}

export default App
