import React, {useContext, useState} from 'react'
import { AiOutlineClose } from 'react-icons/ai'
import { CartContext } from '../App'

const ProductCart = ({product, setItemsInCart, onLoad}) => {
  const {amountOfProducts, updateCart } = useContext(CartContext)
  const [isClicked, setIsClicked] = useState(false)

  const removeProduct = () => {
    const allProductsInCart = JSON.parse(localStorage.getItem('cart'));
    const updatedCart = allProductsInCart.filter(item => item !== product?.id);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
    setItemsInCart(JSON.parse(localStorage.getItem('cart')))
    if(amountOfProducts > 0) updateCart(prev => prev - 1)
    setIsClicked(true)
  }

  return (
    <div className={`grid grid-flow-col auto-cols-auto gap-3  mx-5 pb-4 border-b-2 font-ms`}>
        <div className='max-w-[100px]'>
            <img src={product?.cover} onLoad={() => onLoad()} />
        </div>
        <div className=' w-full flex flex-col justify-center gap-3 sm:w-[250px]'>
          <h3 className='font-bold text-gray-600'>{product?.title}</h3>
          <p>{(parseFloat(product?.net_price) + (parseFloat(product?.net_price) * (parseFloat(product?.tax) /100))).toFixed(2)} zł </p>
        </div>
        <button className='pt-3 justify-self-end w-[20px] cursor-pointer'>
          <AiOutlineClose size={20} color={'#9c9c9c'} onClick={() => removeProduct()}/>
        </button>
    </div>
  )
}

export default ProductCart