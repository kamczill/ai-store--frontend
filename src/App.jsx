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
