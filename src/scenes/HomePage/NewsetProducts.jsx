import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import axiosInstance from '../../axios/axios'
import Loader from '../../components/Loader'


const NewsetProducts = () => {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState(null)
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
                setError(err)
                console.log(err)
            }
        }

        fetchProducts();
    }, [])

  return (
    <div class='flex justify-center items-center w-full py-12'>
        <div class='w-[80%] min-h-[500px] flex flex-col gap-8'>
            <div>
                <h2 class='text-3xl text-center'>Najnowsze produkty</h2>
            </div>
            
            {isLoading && (
                <div className='mt-10'>
                    <Loader />
                </div>
            )}
             <div className='flex flex-wrap gap-8 justify-center'>
                {
                    products?.map(product => (
                        <ProductCard product={product} onLoad={handleImageLoad} />
                    ))
                }
            </div>
            {error && (
                <div className='text-red-500 text-center mt-4'>
                    Something went wrong: {error.message}
                </div>
            )}
        </div>
    </div>
  )
}

export default NewsetProducts;