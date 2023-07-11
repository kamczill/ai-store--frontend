import React from 'react'
import { AiOutlineClose } from 'react-icons/ai'

const ProductCart = ({product}) => {
  return (
    <div class='flex justify-between gap-3 p-2 pb-4 border-b-2 font-ms'>
        <div class='max-w-[100px]'>
            <img src={product?.cover}  />
        </div>
        <div class='flex flex-col justify-center gap-3'>
          <h3 class='font-bold text-gray-600'>{product?.title}</h3>
          <p>{product?.net_price} zł </p>
        </div>
        <div class='pt-3'>
          <AiOutlineClose size={20} color={'#9c9c9c'}/>
        </div>
    </div>
  )
}

export default ProductCart