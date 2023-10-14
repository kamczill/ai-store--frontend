// hooks/useProducts.js
import { useState, useEffect, useContext } from 'react';
import { CartContext } from '../App';
import axiosInstance from '../axios/axios';
import { errorNotification } from '../utils/notifications';

export const useProductsInCart = (itemsInCart) => {
  const [detailedItems, setDetailedItems] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [isLoading, setIsLoading] = useState(true);
  const { amountOfProducts } = useContext(CartContext)

  useEffect(() => {
    const getProducts = async () => {
      try {
        const response = await axiosInstance('/products/', { withCredentials: true });
        const items = response?.data;
        const detailedItemsFromCart = [];
        let price = 0;
        items.forEach(item => {
          if (itemsInCart?.includes(item?.id)) {
            detailedItemsFromCart.push(item);
            price += (parseFloat(item?.net_price) + (parseFloat(item?.net_price) * (parseFloat(item?.tax) / 100)));
          }
        });
        setDetailedItems([...detailedItemsFromCart]);
        setTotalPrice(price.toFixed(2));
        setIsLoading(false);
      } catch (err) {
        setIsLoading(false);
        errorNotification("Coś poszło nie tak")
      }
    };

    getProducts();
  }, [amountOfProducts, itemsInCart]);

  return { detailedItems, totalPrice, isLoading };
};
