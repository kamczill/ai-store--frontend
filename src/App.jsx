import { createContext, useContext, useState, useEffect } from 'react';
import './App.css'
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

import Navbar from './components/Navbar'
import HomePage from './scenes/HomePage'
import ShopRulesPage from './scenes/ShopRulesPage'
import UserHomePage from './scenes/UserHomePage'
import Footer from './components/Footer'
import LoginPage from './scenes/LoginPage'
import AccountPage from './scenes/AccountPage'
import MaterialsPage from './scenes/MaterialsPage'
import OrdersPage from './scenes/OrdersPage'
import OrderPage from './scenes/OrderPage'
import ProductsPage from './scenes/ProductsPage'
import ProductPage from './scenes/ProductPage'

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
  console.log(amountOfProducts)

  const updateCart = (newValue) => {
    setAmountOfProducts(newValue)
  }

  return (
   <>
    <AuthContext.Provider value={currentUser}>
      <CartContext.Provider value={{amountOfProducts, updateCart }}>
        <div className='flex flex-col min-h-screen w-full bg-gray-100' id='container'>
          <header>
            <Navbar />
          </header>
          <div className='h-full grid grid-flow-row gap-10 flex-grow' id='main'>
            <Routes>
              <Route path='/' element={currentUser.logged_in ? <UserHomePage /> : <HomePage/> } />
              <Route path='/book.epub' element={currentUser.logged_in ? <Reader /> : <Navigate to='/'/> } />
              <Route path="/regulamin" element={<ShopRulesPage/>} />
              <Route path="/login" element={<LoginPage/>} />
              <Route path='/konto' element={currentUser.logged_in ? <AccountPage /> : <HomePage/> } />
              <Route path='/zamowienia' element={currentUser.logged_in ? <OrdersPage /> : <HomePage/> } />
              <Route path='/zamowienia/:id' element={currentUser.logged_in ? <OrderPage /> : <HomePage/> } />
              <Route path='/produkty' element={currentUser.logged_in ? <ProductsPage /> : <HomePage/> } />
              <Route path='/produkty/:id' element={currentUser.logged_in ? <ProductPage /> : <HomePage/> } />
              <Route path='/materialy' element={currentUser.logged_in ? <MaterialsPage /> : <HomePage/> } />
            </Routes>
          </div>
          <Footer />
        </div>
        <ToastContainer limit={1} />
      </CartContext.Provider>
    </AuthContext.Provider>
  </>
  )
}

export default App
