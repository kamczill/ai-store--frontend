import React, { useState } from 'react';
import LoginForm from './LoginForm';
import RegisterForm from './RegisterForm';
import ResetForm from './ResetForm';

const index = () => {
  const [typeOfForm, setTypeOfForm] = useState('login')

  const renderForm = () => {
    switch (typeOfForm) {
      case 'login':
        return <LoginForm />;
      case 'register':
        return <RegisterForm handleSetLoginForm={setTypeOfForm} />;
      case 'reset':
        return <ResetForm />;
      default:
        return null;
    }
  };

  return (
    <div className='flex justify-center align-middle'>
        <div className='w-full p-5 py-12 flex flex-col items-center font-ms md:py-0 md:justify-self-center md:self-center'>
          {renderForm()}
          {
            typeOfForm == 'login' || typeOfForm !== 'register' ? (
              <p className='p-2 mt-3 text-md'>Nie masz konta?
                  <span className='font-semibold cursor-pointer pl-1 hover:underline' 
                    onClick={() => setTypeOfForm('register')}>
                    Zarejestruj się
                  </span>
                </p>
            ) : typeOfForm == 'register' ? (
              <p className='p-2 mt-3 text-md'>Masz konto?
                <span className='font-semibold cursor-pointer pl-1 hover:underline' 
                  onClick={() => setTypeOfForm('login')}>
                  Zaloguj się
                </span>
              </p>
            ) : ''
          }
          { typeOfForm !== 'reset' ? (
          <p onClick={() => setTypeOfForm('reset')} className='p-2  text-md'>
            <span className='font-semibold cursor-pointer pl-1 hover:underline'>
              Nie pamiętasz hasła?
            </span>
          </p>
          ): ''}
  
        </div>
    </div>
  )
}

export default index