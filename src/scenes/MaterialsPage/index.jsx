import React, {useEffect, useState} from 'react'
import ProductCard from '../../components/ProductCard'
import Loader from '../../components/Loader'
import axios from '../../axios/axios'


const index = () => {
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const getAllMaterials = async () => {
    try {
      const response = await axios.get('users/me/products/', {
        withCredentials: true,
      });
      setProducts(response.data);
    } catch (error) {
      console.error(error);
    }
  };
  
  const handleImageLoad = () => {
    setLoadedImagesCount(prevCount => prevCount + 1);
  };

  useEffect(() => {
      if (products?.length && loadedImagesCount === products?.length || products?.length === 0) {
          setIsLoading(false);
      }
  }, [loadedImagesCount, products]);

  useEffect(() => {
    getAllMaterials();
  }, [])

  return (
    <>
    <h1 className='text-center font-bold font-ms text-xl pt-6'>Moje materiały</h1>
    {isLoading && <Loader />}
    <div className='mx-auto max-w-[1350px]'>
      {products?.length === 0 && <p>Brak kupionych materiałów</p>}
      <div className={`${isLoading ? 'hidden' : ''} pt-8 flex flex-col flex-wrap gap-8 items-center justify-center md:flex-row md:gap-8 md:justify-center md:items-center`}>
        {products?.map((product, idx) => <ProductCard key={`${product.id}--${idx}`} product={product} onLoad={handleImageLoad} isBought />)}
      </div>
    </div>
  </>
  )
}

export default index