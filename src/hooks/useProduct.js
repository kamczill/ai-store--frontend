import { useState, useEffect } from 'react';
import axiosInstance from '../axios/axios';
import { errorNotification } from '../utils/notifications';

export const useProduct = (id) => {
  const [product, setProduct] = useState(null);

  const getProduct = async () => {
    try {
      const res = await axiosInstance(`/products/${id}`, {
        withCredentials: true
      });
      setProduct(res.data);
    } catch (err) {
      errorNotification('Coś poszło nie tak');
    }
  };

  useEffect(() => {
    getProduct();
  }, [id]);

  return { product };
};
