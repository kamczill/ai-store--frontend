import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import axiosInstance from '../../axios/axios';
import Loader from '../../components/Loader';
import OrderProduct from '../../components/OrderProduct';
import { errorNotification } from '../../utils/notifications';

const index = () => {
  const { id } = useParams();
  const [products, setProducts] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const getOrder = async () => {
    try {
      const response = await axiosInstance(`/orders/${id}`, {
        withCredentials: true,
      });
      const { data } = response;
      const total = data.products.reduce((acc, { product }) => {
        const price = parseFloat(product.net_price);
        const tax = parseFloat(product.tax);
        return acc + price + (price * (tax / 100));
      }, 0);
      setTotalPrice(total);
      setProducts(data.products);
    } catch (error) {
      console.error(error);
      errorNotification('Coś poszło nie tak')
    }
  };

  const handleImageLoad = () => {
    setLoadedImagesCount(prevCount => prevCount + 1);
    console.log(':)')
  };

  useEffect(() => {
      if (products?.length && loadedImagesCount === products?.length) {
          setIsLoading(false);
      }
  }, [loadedImagesCount, products]);


  useEffect(() => {
    getOrder();
  }, [id])

  return (
    <div className='p-5 flex flex-col gap-10 items-center font-ms'>
      <div>
        <h3 className='font-bold text-xl'>Zamówienie nr. {id}</h3>
      </div>
      {isLoading && <Loader />}
      <div className={`${isLoading ? 'hidden' : ''} flex flex-col gap-3`}>
        {products?.map((product, index) => (
          <OrderProduct
            key={`${product.id}--${index}`}
            product={product?.product}
            onLoad={handleImageLoad}
          />
        ))}
      </div>
      <div>
        <p>
          <span className='font-bold pr-1'>Koszt zamówienia(z VAT):</span>
          {totalPrice.toFixed(2)} PLN
        </p>
      </div>
  </div>
  )
}

export default index