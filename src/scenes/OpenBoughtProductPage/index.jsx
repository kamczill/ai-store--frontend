import React, { useEffect, useState } from 'react'
import Reader from '../../components/Reader'
import { axiosInstance } from '../../axios/axios'
import { useParams } from 'react-router-dom'

const index = () => {
  const [product, setProduct] = useState()
  const [count, setCount] = useState(0)
  const { id } = useParams()

  const getProduct = async () => {
    await axiosInstance.get(`products/${id}`, {
      withCredentials:true,
      headers: {
        "Content-Type": "application/json"
      }
    })
    .then(res => {
      console.log(res?.data)
      setProduct(res?.data)
    })
  }

  useEffect(() => {
    getProduct();
  }, [])

  return (
    <div class='flex flex-col gap-1'>
      <div class='p-5'>
        <h2 class='text-xl font-bold'>{product?.title}</h2>
        <h2></h2>
      </div>
      <div class='flex justify-center'>
      {product ? <Reader filePath={product?.file_path} /> : ''}
      </div>
    </div>
  )
}

export default index