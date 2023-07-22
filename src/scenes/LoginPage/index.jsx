import React, {useState, useContext, useEffect} from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import ResetForm from './ResetForm'
import { AuthContext } from '../../App'

const index = () => {
  const [typeOfForm, setTypeOfForm] = useState('login')

  useEffect(()=> {
    console.log(typeOfForm)
  }, [typeOfForm])

  return (
    <div className='flex justify-center align-middle'>
        <div class='w-full p-5 justify-self-center self-center flex flex-col items-center'>
          {typeOfForm == 'login' ? 
          (
          <>
            <LoginForm />
            
          </>
          ) : typeOfForm == 'register' ?
          <>
          <RegisterForm handleSetLoginForm={setTypeOfForm}/>
         
        </>
        :
          <ResetForm />
      }
      {
        typeOfForm == 'login' || typeOfForm !== 'register' ? (
          <p class='p-2 mt-3 text-md'>Nie masz konta?
              <span class='font-semibold cursor-pointer pl-1 hover:underline' 
                onClick={() => setTypeOfForm('register')}>
                Zarejestruj się
              </span>
            </p>
        ) : typeOfForm == 'register' ? (
          <p class='p-2 mt-3 text-md'>Masz konto?
            <span class='font-semibold cursor-pointer pl-1 hover:underline' 
              onClick={() => setTypeOfForm('login')}>
              Zaloguj się
            </span>
          </p>
        ) : ''
      }
          { typeOfForm !== 'reset' ? (
          <p onClick={() => setTypeOfForm('reset')} class='p-2  text-md'>
            <span class='font-semibold cursor-pointer pl-1 hover:underline'>
              Nie pamiętasz hasła?
            </span>
          </p>
          ): ''}
  
        </div>
    </div>
  )
}

export default index