import React, {useState, useEffect} from 'react'
import axiosInstance from '../../axios/axios'

import { Link } from 'react-router-dom'
import Loader from '../../components/Loader'
import { errorNotification } from '../../utils/notifications'
import { formatDate } from '../../utils/dateFormat'

const index = () => {
  const [userOrders, setUserOrders] = useState()
  
  const getUserOrders = async () => {
    try{
      const response = await axiosInstance('users/me/orders/', {
        withCredentials: true
      })
      const { data } = response
      setUserOrders(data)
    } catch (err) {
      console.log(err)
      errorNotification('Coś poszło nie tak!')
    }
  }

  useEffect(() => {
    getUserOrders();
  }, [])

  return (
    <div className='font-ms w-full h-full pt-6 pb-12'>
      <h1 className='text-center font-bold text-xl'>Twoje zamówienia</h1>
      <div className='flex w-full h-full justify-center mt-8'>
        { userOrders?.length > 0 ? (
          <table className="table-fixed w-full h-fit max-w-[500px]">
            <thead className='w-1/2'>
              <tr>
                <th className='w-1/3'>Id</th>
                <th className='w-2/3'>Data zamówienia</th>
              </tr>
            
            </thead>
            <tbody className='w-1/2'>
              {userOrders?.map((order) => (
              <tr key={order.id}>
                <td className='text-center text-xl underline p-3'><Link to={`/zamowienia/${order.id}`}>{order.id}</Link></td>
                <td className='text-center'>{formatDate(order.purchase_timestamp)}</td>
              </tr> 
              ))
            }
            </tbody>
          </table>)
        : userOrders ? (
          <div className='flex items-center align-center'>Brak złożonych zamówień </div>
          ): <div className='flex'><Loader /></div>
        }
      </div>
    </div>
  )
}

export default index