import React, { useEffect, useState } from 'react'
import { axiosInstance } from '../../axios/axios'
import ChangePasswordForm from './ChangePasswordForm'

const index = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [count, setCount] = useState(0)

  useEffect(() => {
    const getCurrentUser = async () => {
      try{
        const response = await axiosInstance.get('users/me/')
        setCurrentUser(response.data)
      } catch (err) {
        console.log(err)
      }
    }

    if(count === 0){
      getCurrentUser();
      setCount(1)
    }
  }, [])

  return (
    <div className='w-full flex flex-col gap-10 font-ms h-full'>
      <div className='p-5 mt-10 text-center sm:text-left sm:pl-20'>
        <h2 className='text-xl font-bold'>{currentUser?.first_name} {currentUser?.last_name}</h2>
      </div>
      <div className='flex flex-col gap-12 justify-center p-5'>

        <h2 className='text-center font-bold'>Formularz zmiany hasła</h2>
      <ChangePasswordForm />
      </div>
    </div>
  )
}

export default index