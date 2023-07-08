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
import ProductsPage from './scenes/ProductsPage'
import ProductPage from './scenes/ProductPage'

import { Routes, Route, Navigate } from "react-router-dom";
import Cookies from 'js-cookie';
import Reader from './components/Reader';

export const AuthContext = createContext()

export const clearWaitingQueue = () => {
  toast.clearWaitingQueue();
}

function App() {
  const [currentUser, setCurrentUser] = useState({'logged_in': Cookies.get('logged_in') === 'true' ? true : false});

  return (
    <>
    <AuthContext.Provider value={currentUser}>
      <div class='min-h-screen w-full bg-gray-100 grid gap-1'>
        <header class='self-start'>
          <Navbar />
        </header>
        <div class='w-full self-center justify-self-center'>
          <Routes>
            <Route path='/' element={currentUser.logged_in ? <UserHomePage /> : <HomePage/> } />
            <Route path='/book.epub' element={currentUser.logged_in ? <Reader /> : <Navigate to='/'/> } />
            <Route path="/regulamin" element={<ShopRulesPage/>} />
            <Route path="/login" element={<LoginPage/>} />
            <Route path='/konto' element={currentUser.logged_in ? <AccountPage /> : <HomePage/> } />
            <Route path='/zamowienia' element={currentUser.logged_in ? <OrdersPage /> : <HomePage/> } />
            <Route path='/produkty' element={currentUser.logged_in ? <ProductsPage /> : <HomePage/> } />
            <Route path='/produkty/:id' element={currentUser.logged_in ? <ProductPage /> : <HomePage/> } />
            <Route path='/materialy' element={currentUser.logged_in ? <MaterialsPage /> : <HomePage/> } />
          </Routes>
        </div>
        <Footer />
      </div>
      <ToastContainer limit={1} />
    </AuthContext.Provider>
    </>
  )
}

export default App
