import React, { useEffect, useState } from 'react';
import ProductCard from '../../components/ProductCard';
import axios from '../../axios/axios';
import Loader from '../../components/Loader';
import { errorNotification } from '../../utils/notifications';

const index = () => {
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const handleImageLoad = () => {
    setLoadedImagesCount((prevCount) => prevCount + 1);
  };

  useEffect(() => {
      if (products?.length && loadedImagesCount === products?.length) {
          setIsLoading(false);
      }
  }, [loadedImagesCount, products]);


  useEffect(() => {
    const fetchMaterials = async () => {
      try {
        const response = await axios('/products/', { withCredentials: true });
        setProducts(response?.data);
      } catch (err) {
        console.error(err);
        errorNotification('Coś poszło nie tak')
      }
    };

    fetchMaterials();
  }, []);

  return (
    <>
      <h1 className='text-center font-bold font-ms text-xl pt-6'>Dostępne produkty</h1>
      {isLoading && <Loader />}
      <div className='mx-auto max-w-[1350px]'>
        <div className={` ${isLoading ? 'hidden': ''} pt-8 flex flex-col flex-wrap gap-8 items-center justify-center md:flex-row md:gap-10 md:justify-center md:items-center`}>
          {products?.map((product) => (
            <ProductCard key={product.id} product={product} onLoad={handleImageLoad} />
          ))}
        </div>
      </div>
    </>
  )
}

export default index