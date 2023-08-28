import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import axiosInstance from '../../axios/axios'
import Loader from '../../components/Loader'


const NewsetProducts = () => {
    const [products, setProducts] = useState();
    const [isLoading, setIsLoading] = useState(true);
    const [loadedImagesCount, setLoadedImagesCount] = useState(0);

    const getProducts = async () => {
        await axiosInstance('products/')
        .then(res => {
            setProducts(res?.data.reverse()
            .slice(0,4))
        }).catch(err => console.log(err))
    }

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
        getProducts();
    }, [])

  return (
    <div class='flex justify-center items-center w-full'>
        <div class='w-[80%] min-h-[500px] flex flex-col gap-10'>
            <div>
                <h2 class='text-3xl text-center'>Najnowsze produkty</h2>
            </div>
            
            {isLoading 
                ? (
                    <div className='mt-10'>
                        <Loader />
                    </div>
                ) : ''
            }
            <div className={`${isLoading ? 'hidden': ''} flex flex-wrap gap-8 justify-center`}>
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

export default NewsetProducts