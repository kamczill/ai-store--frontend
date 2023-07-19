import React, {useState, useContext, useEffect} from 'react'
import { AuthContext } from '../../App'
import axiosInstance from '../../axios/axios'
import { parseISO, format } from 'date-fns'
import { zonedTimeToUtc, utcToZonedTime } from 'date-fns-tz'
import { pl } from 'date-fns/locale'
import { Link } from 'react-router-dom'
const index = () => {
  const [userOrders, setUserOrders] = useState()
  
  const getUserOrders = async () => {
    await axiosInstance('users/me/orders/', {
      withCredentials: true
    }).then(res => {
      setUserOrders(res?.data)
      console.log(res)
    }).catch(err => {
      console.log(err)
    })
  }

  const formatDate = (date) => {
    const dateISO = parseISO(date)
    const timeZone = 'Europe/Warsaw'
    const zonedDate = utcToZonedTime(dateISO, timeZone)
    const formattedDate = format(zonedDate, 'PPpp', { locale: pl })
    return formattedDate
  }

  useEffect(() => {
    getUserOrders();
  }, [])
  return (
    <div class='font-ms w-full h-full'>
      <h1 class='text-center font-bold text-xl'>Twoje zamówienia</h1>
      <div class='flex w-full justify-center mt-10'>
      <table class="table-fixed w-full max-w-[500px]">
  <thead class='w-1/2'>
    <tr>
      <th class='w-1/3'>Id</th>
      <th class='w-2/3'>Data zamówienia</th>
    </tr>
  </thead>
  <tbody class='w-1/2'>
    {userOrders?.map((order) => (
    <tr>
      <td class='text-center text-lg'><Link to={`/zamowienia/${order.id}`}>{order.id}</Link></td>
      <td class='text-center'>{formatDate(order.purchase_timestamp)}</td>
    </tr> 
    ))
  }
  </tbody>
</table>
      </div>
    </div>
  )
}

export default index