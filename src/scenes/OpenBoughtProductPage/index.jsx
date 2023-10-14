import React, { useEffect, useState } from 'react'
import Reader from '../../components/Reader'
import axiosInstance from '../../axios/axios'
import { useParams } from 'react-router-dom'

const index = () => {
  const [product, setProduct] = useState()
  const { id } = useParams()

  const getProduct = async () => {
    try {
      const response = await axiosInstance.get(`products/${id}`, {
        withCredentials: true,
        headers: {
          "Content-Type": "application/json",
        },
      });
      setProduct(response?.data);
    } catch (error) {
      console.error(error);
    }
  };

  useEffect(() => {
    getProduct();
  }, [])

  return (
   <div className='flex flex-col gap-1'>
      <div className='p-5'>
        <h2 className='text-xl font-bold'>{product?.title}</h2>
      </div>
      <div className='flex justify-center'>
        {product && <Reader filePath={product?.file_path} />}
      </div>
    </div>
  )
}

export default index