import React, {useEffect, useState, useContext} from 'react'
import { CartContext } from '../App'
import axiosInstance from '../axios/axios'
import ProductCart from './ProductCart'
import { AiOutlineShoppingCart } from 'react-icons/ai'

const Cart = ({clickedOutside}) => {
    const { amountOfProducts, setAmountOfProducts } = useContext(CartContext)
    const [itemsInCart, setItemsInCart] = useState(JSON.parse(localStorage.getItem('cart')) || 0)
    const [detailedItems, setDetailedItems] = useState([])
    const [totalPrice, setTotalPrice] = useState()


    const getProducts = async () => {
        await axiosInstance('/products/', {
            withCredentials: true,
        }).then(res => {
            const items = res?.data
            const detailedItemsFromCart = []
            let price = 0
            
            items.forEach(item => {
                if(itemsInCart.includes(item?.id)){
                    detailedItemsFromCart.push(item)
                    price += (parseFloat(item?.net_price) + (parseFloat(item?.net_price) * (parseFloat(item?.tax) /100)))
                }
            })
            console.log(detailedItemsFromCart)
            setDetailedItems(() => [...detailedItemsFromCart])
            setTotalPrice(price.toFixed(2))
        }).catch(err => {
            console.log(err)
        })
    }

    const buyProducts = async () => {
        await axiosInstance.post('/orders/', {
            user: 1
        }, {
            withCredentials: true,
        }).then(res => {
            const orderId = res.data.id
            console.log(itemsInCart)
            itemsInCart.forEach(item => {
                addProductToOrder(orderId, item)
            })
            
        }).catch(err => console.log(err))
    }

    const addProductToOrder = async (order, product) => {
        await axiosInstance.post('/orders/order-products/', {
            order: order,
            product: product
        }, {
            withCredentials: true,
        }).then(res => {
            console.log('dodane')
        }).catch(err => console.log(err))
    
    }

    useEffect(() => {
        getProducts()
    }, [itemsInCart])

    useEffect(() => {
        getProducts();
    }, [])

  return (
    <div class='absolute min-h-full right-0 w-full max-w-[640px] flex flex-col items-center gap-4 px-2 pt-5 pb-10 bg-white z-10 sm:right-5 sm:h-fit sm:rounded sm:drop-shadow-xl'>
        <div>
            <h3 class='text-lg font-ms font-bold'>Mój Koszyk</h3>
        </div>
        <div class='flex flex-col gap-3'>
            {detailedItems.map(item => (
                <ProductCart product={item} setItemsInCart={setItemsInCart} />
            )
            )}
        </div>
        <div class='flex flex-col w-full font-ms p-3'>
            <h3 class='text-md font-bold text-gray-800'>Ilość produktów: {amountOfProducts} </h3>
            <h3 class='text-md font-bold text-gray-800'>Razem do zapłaty(z VAT): <span>{totalPrice} zł</span></h3>
        </div>
        <div class='w-full flex items-center justify-center'>
            { itemsInCart.length > 0 
                ? <button onClick={() => buyProducts()} class='bg-green-400 text-white p-3 flex items-center gap-3'>PRZEJDŹ DO KASY <AiOutlineShoppingCart /> </button>
                : <button class='bg-green-200 text-white p-3 flex items-center gap-3 cursor-default'>KOSZYK JEST PUSTY <AiOutlineShoppingCart /> </button>
            }
            </div>
    </div>
  )
}

export default Cart