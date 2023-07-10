import React, {useEffect, useState, useContext} from 'react'
import { CartContext } from '../App'
import axiosInstance from '../axios/axios'
import ProductCart from './ProductCart'

const Cart = () => {
    const { amountOfProducts } = useContext(CartContext)
    const [itemsInCart, setItemsInCart] = useState(JSON.parse(localStorage.getItem('cart')) || 0)
    const [detailedItems, setDetailedItems] = useState([])


    const getProducts = async () => {
        await axiosInstance('/products/', {
            withCredentials: true,
        }).then(res => {
            const items = res?.data
            const detailedItemsFromCart = []
            
            items.forEach(item => {
                if(itemsInCart.includes(item?.id)){
                    detailedItemsFromCart.push(item)
                }
            })
            console.log(detailedItemsFromCart)
            setDetailedItems(() => [...detailedItemsFromCart])
        }).catch(err => {
            console.log(err)
        })
    }

    useEffect(() => {
        getProducts();
    }, [])

  return (
    <div class='fixed w-full h-full bg-white'>
        {detailedItems.map(item => (
            <ProductCart product={item} />
        )
        )}
        <div class='flex flex-col'>
        </div>
    </div>
  )
}

export default Cart