import { createContext, useContext, useState, useEffect } from 'react';
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar'
import HomePage from './scenes/HomePage'
import ShopRulesPage from './scenes/ShopRulesPage'
import Footer from './components/Footer'
import LoginPage from './scenes/LoginPage'
import AccountPage from './scenes/AccountPage'
import MaterialsPage from './scenes/MaterialsPage'
import OrdersPage from './scenes/OrdersPage'
import OrderPage from './scenes/OrderPage'
import ProductsPage from './scenes/ProductsPage'
import ProductPage from './scenes/ProductPage'
import ResetPasswordPage from './scenes/ResetPasswordPage'
import OpenBoughtProductPage from './scenes/OpenBoughtProductPage'
import PrivatePolicyPage from './scenes/PrivatePolicyPage'

import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Reader from './components/Reader';

export const AuthContext = createContext()
export const CartContext = createContext()

export const clearWaitingQueue = () => {
  toast.clearWaitingQueue();
}

const App = () => {
  const [currentUser, setCurrentUser] = useState({'logged_in': Cookies.get('logged_in') === 'true' ? true : false});
  const [amountOfProducts, setAmountOfProducts] = useState(JSON.parse(localStorage.getItem('cart'))?.length || 0)

  const updateCart = (newValue) => {
    setAmountOfProducts(newValue)
  }

  return (
   <>
    <AuthContext.Provider value={{currentUser, setCurrentUser}}>
      <CartContext.Provider value={{amountOfProducts, updateCart }}>
        <div className='flex flex-col min-h-screen w-full bg-gray-100' id='container'>
          <header>
            <Navbar />
          </header>
          <div className='h-full grid grid-flow-row flex-grow' id='main'>
            <Routes>
              <Route path='/' element={<HomePage/>} />
              <Route path='/book.epub' element={currentUser.logged_in ? <Reader /> : <Navigate to='/'/> } />
              <Route path="/regulamin" element={<ShopRulesPage/>} />
              <Route path="/polityka-prywatnosci" element={<PrivatePolicyPage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path="/password-reset/:token" element={<ResetPasswordPage/>} />
              <Route path='/konto' element={currentUser.logged_in ? <AccountPage /> : <HomePage/> } />
              <Route path='/zamowienia' element={currentUser.logged_in ? <OrdersPage /> : <HomePage/> } />
              <Route path='/zamowienia/:id' element={currentUser.logged_in ? <OrderPage /> : <HomePage/> } />
              <Route path='/produkty' element={<ProductsPage />} />
              <Route path='/produkty/:id' element={<ProductPage /> } />
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
