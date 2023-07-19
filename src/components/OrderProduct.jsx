import React from 'react'

const OrderProduct = ({product}) => {
    console.log(product)
  return (
    <div class='flex w-full gap-5'>
        <div class='max-w-[100px]'>
            <img src={product?.cover} />
        </div>
        <div class='flex flex-col justify-center gap-3'> 
            <h4>{product?.title}</h4>
            <p>{product?.net_price} PLN</p>
        </div>
    </div>
  )
}

export default OrderProduct