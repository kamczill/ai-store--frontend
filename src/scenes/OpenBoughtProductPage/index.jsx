import React, { useEffect, useState } from 'react'
import Reader from '../../components/Reader'
import { axiosInstance } from '../../axios/axios'
import { useParams } from 'react-router-dom'

const index = () => {
  const [currentUser, setCurrentUser] = useState(null)
  const [count, setCount] = useState(0)
  const { id } = useParams()

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
    <div class='flex flex-col gap-1'>
      <div class='p-5'>
        <h2 class='text-xl font-bold'>Witaj, {currentUser?.first_name}</h2>
        <h2>Pamiętaj, los twoich włosów leży w twoich rękach!</h2>
      </div>
      <div class='flex justify-center'>
      <Reader />
      </div>
    </div>
  )
}

export default index