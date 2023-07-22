import React from 'react'
import { useParams } from 'react-router-dom'
import ResetPasswordForm from './ResetPasswordForm'

const index = () => {
    const { token } = useParams()
    console.log(token)
  return (
    <div class='h-full flex items-center justify-center'>
        <ResetPasswordForm token={token}/>
    </div>
  )
}

export default index