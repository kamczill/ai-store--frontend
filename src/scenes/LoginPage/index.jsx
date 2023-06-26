import React, {useState, useContext} from 'react'
import LoginForm from './LoginForm'
import RegisterForm from './RegisterForm'
import { AuthContext } from '../../App'

const index = () => {
  const [loginForm, setLoginForm] = useState(true)


  return (
    <div className='flex justify-center align-middle'>
        <div class='w-full p-5 justify-self-center self-center flex flex-col items-center'>
          {loginForm ? 
          (
          <>
            <LoginForm />
            <p class='p-2 mt-3 text-md'>Nie masz konta?
              <span class='font-semibold cursor-pointer pl-1' 
                onClick={() => setLoginForm(!loginForm)}>
                Zarejestruj się
              </span>
            </p>
          </>
          ) :
          <>
          <RegisterForm handleSetLoginForm={setLoginForm}/>
          <p class='p-2 mt-3 text-md'>Masz konto?
            <span class='font-semibold cursor-pointer pl-1' 
              onClick={() => setLoginForm(!loginForm)}>
              Zaloguj się
            </span>
          </p>
        </>
        }
          
        </div>
    </div>
  )
}

export default index