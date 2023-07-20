import React, { useEffect, useState } from 'react'
import Reader from '../../components/Reader'
import { axiosInstance } from '../../axios/axios'
import ChangePasswordForm from './changePasswordForm'

const index = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [count, setCount] = useState(0)

  const getCurrentUser = async () => {
    await axiosInstance.get('users/me/', {
      withCredentials:true,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => setCurrentUser(res?.data))
  }

  useEffect(() => {
    if(count === 0){
      getCurrentUser();
      setCount(1)
    }
  }, [])

  return (
    <div class='w-full flex flex-col gap-10 font-ms h-full'>
      <div class='p-5 mt-10 text-center sm:text-left sm:pl-20'>
        <h2 class='text-xl font-bold'>Witaj, {currentUser?.first_name} {currentUser?.last_name}</h2>
        {/* <h2>Pamiętaj, los twoich włosów leży w twoich rękach!</h2> */}
      </div>
      <div class='flex flex-col gap-12 justify-center p-5'>

        <h2 class='text-center font-bold'>Formularz zmiany hasła</h2>
      <ChangePasswordForm />
      </div>
    </div>
  )
}

export default index