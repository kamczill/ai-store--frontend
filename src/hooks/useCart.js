import { useState, useContext, useEffect } from 'react';
import { CartContext } from '../App';
import { successNotification } from '../utils/notifications';

export const useCart = () => {
    const { amountOfProducts, updateCart } = useContext(CartContext);
    const [isInCart, setIsInCart] = useState(false);
    
    const checkProductCart = (productId) => {
      const items = JSON.parse(localStorage.getItem('cart')) || [];
      setIsInCart(items.includes(productId));
    };
  
    const addToCart = (productId) => {
        const items = JSON.parse(localStorage.getItem('cart')) || []
        localStorage.setItem('cart', JSON.stringify([...items, productId]));
        updateCart(amountOfProducts + 1)
        setIsInCart(true)
        successNotification('Dodałeś produkt do koszyka!');
    }

    useEffect(() => {}, [amountOfProducts])
  
    return { isInCart, addToCart, checkProductCart };
  };