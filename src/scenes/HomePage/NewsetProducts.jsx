import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import axiosInstance from '../../axios/axios'
import Loader from '../../components/Loader'
import { errorNotification } from '../../utils/notifications'

const NewsetProducts = () => {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);

    const handleImageLoad = () => {
        setLoadedImagesCount(prevCount => prevCount + 1);
      };
    
      useEffect(() => {
          if (products?.length && loadedImagesCount === products?.length) {
              setIsLoading(false);
          }
      }, [loadedImagesCount, products]);


    useEffect(() => {
        const fetchProducts = async () => {
            try{
                const response = await axiosInstance('products/')
                setProducts(response.data.reverse().slice(0,4))
            } catch (err) {
                console.log(err)
                errorNotification('Coś poszło nie tak')
            }
        }

        fetchProducts();
    }, [])

  return (
    <div className='flex justify-center items-center w-full py-12'>
        <div className='w-[80%] min-h-[500px] flex flex-col gap-8'>
            <div>
                <h2 className='text-3xl text-center'>Najnowsze produkty</h2>
            </div>
            
            {isLoading && (
                <div className='mt-10'>
                    <Loader />
                </div>
            )}
             <div className={` ${isLoading ? 'hidden': 'flex'} flex-wrap gap-8 justify-center`}>
                {
                    products?.map(product => (
                        <ProductCard product={product} onLoad={handleImageLoad} />
                    ))
                }
            </div>
        </div>
    </div>
  )
}

export default NewsetProducts;