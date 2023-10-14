import axiosInstance from '../axios/axios';
import { toast } from 'react-toastify';
import { successNotification } from '../utils/notifications';

export const buyProducts = async (itemsInCart, updateCart, setItemsInCart, isOpen) => {
    try {
      const response = await axiosInstance.post('/orders/', { user: 1 }, { withCredentials: true });
      const orderId = response.data.id;
      for (const item of itemsInCart) {
        await addProductToOrder(orderId, item);
      }
      localStorage.setItem('cart', JSON.stringify([]));
      setItemsInCart([]);
      updateCart(0);
      isOpen(false);
      toast.clearWaitingQueue();
      successNotification(`Dokonałeś zakupu! Kupione materiały znajdziesz w zakładce 'Moje materiały'`);
    } catch (err) {
      console.log(err);
      // Consider adding user-friendly error handling here
    }
};
  

export const addProductToOrder = async (order, product) => {
    try {
        await axiosInstance.post('/orders/order-products/', { order: order, product: product }, { withCredentials: true });
    } catch (err) {
        console.log(err);
        // Consider adding user-friendly error handling here
    }
};