import React, {useState, useContext} from 'react'
import { CartContext } from '../App'
import ProductCart from './ProductCart'
import { AiOutlineShoppingCart } from 'react-icons/ai'
import Loader from './Loader'

import { buyProducts } from '../utils/orderProcessing';
import { useProductsInCart } from '../hooks/useProductsInCart'

const Cart = ({clickedOutside, isOpen}) => {
    const { amountOfProducts, updateCart } = useContext(CartContext)
    const [itemsInCart, setItemsInCart] = useState(JSON.parse(localStorage.getItem('cart')) || [])
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);
    const [isClicked, setIsClicked] = useState(false)
    const { detailedItems, totalPrice, isLoading } = useProductsInCart(itemsInCart);

    const handleBuyProducts = () => {
        buyProducts(itemsInCart, updateCart, setItemsInCart, isOpen);
        setIsClicked(true)
    }

    const handleImageLoad = () => {
        setLoadedImagesCount(prevCount => prevCount + 1);
    };
    
  return (
    <div className='absolute min-h-full right-0 w-full max-w-[640px] flex flex-col items-center gap-4 px-2 pt-5 pb-10 bg-white z-10 sm:right-5 sm:min-h-fit sm:rounded sm:drop-shadow-xl'>
        <div>
            <h3 className='text-lg font-ms font-bold'>Mój Koszyk</h3>
        </div>
        {isLoading ? <Loader/> : ''}
        <div className={`flex flex-col gap-3`}>
            {detailedItems?.map((item, idx) => (
                <ProductCart key={idx} product={item} setItemsInCart={setItemsInCart}  onLoad={handleImageLoad} />
            ))}
        </div>
        <div className='flex flex-col w-full font-ms p-3'>
            <h3 className='text-md font-bold text-gray-800'>Ilość produktów: {amountOfProducts} </h3>
            <h3 className='text-md font-bold text-gray-800'>Razem do zapłaty(z VAT): <span>{totalPrice} zł</span></h3>
        </div>
        <div className='w-full flex items-center justify-center'>
            { itemsInCart.length > 0 
                ? <button onClick={() => handleBuyProducts()} disabled={isClicked} className='bg-green-400 text-white p-3 flex items-center gap-3'>PRZEJDŹ DO KASY <AiOutlineShoppingCart /> </button>
                : <button className='bg-green-200 text-white p-3 flex items-center gap-3 cursor-default'>KOSZYK JEST PUSTY <AiOutlineShoppingCart /> </button>
            }
            </div>
    </div>
  )
}

export default Cart