import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios/axios';

const index = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  console.log(id)

  const getProduct = async () => {
    await axiosInstance(`/products/${id}`, {
      withCredentials: true
    }).then(res => {
      console.log(res.data)
      setProduct(res?.data)
    })
  }

  useEffect(() => {
    getProduct();
  }, [])

  return (
    <div class='p-5 flex items-center justify-center font-ms'>
      <div class='flex flex-col gap-5 lg:flex-row'>
        <div class='max-w-[400px]'>
          <img src={product?.cover} alt={product?.title} />
        </div>
        <div class='max-w-[400px] lg:p-5 lg:max-w-[700px]'>
            <p class='text-lg'>{product?.author}</p>
            <h3 class='font-ms font-bold text-xl pointer lg:hover:underline lg:hover:decoration-2'>{product?.title}</h3>
              <p class='text-2xl py-5'>{product?.net_price} zł</p>
            {/* <div class='max-w-[357px] flex justify-between items-center px-3 pt-3'> */}
            {/* </div> */}
              <button class='w-full max-w-[357px] bg-green-500 py-2 px-4 text-white rounded active:scale-95'>Dodaj do koszyka</button>
            <div
              dangerouslySetInnerHTML={{__html: product?.description}}
              class='py-5'
            />
        </div>
      </div>
    </div>
  )
}

export default index