import React, {useState, useContext} from 'react'
import { AuthContext } from '../../App'

const index = () => {
  const {currentUser} = useContext(AuthContext)
  console.log(currentUser)
  return (
    <div>zamówienia</div>
  )
}

export default index