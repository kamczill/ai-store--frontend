import React from 'react'

const OrderProduct = ({product, onLoad}) => {
  return (
    <div className='flex w-full gap-5'>
        <div className='max-w-[100px]'>
            <img src={product?.cover} onLoad={onLoad}/>
        </div>
        <div className='flex flex-col justify-center gap-3'> 
            <h4 className='font-bold font-ms'>{product?.title}</h4>
            <p>{(parseFloat(product?.net_price) + (parseFloat(product?.net_price) * (parseFloat(product?.tax) /100))).toFixed(2)} PLN</p>
        </div>
    </div>
  )
}

export default OrderProduct