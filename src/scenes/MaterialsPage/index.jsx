import React, {useEffect, useState} from 'react'
import ProductCard from '../../components/ProductCard'

import axios from '../../axios/axios'
import { TailSpin } from 'react-loader-spinner'
import Loader from '../../components/Loader'


const index = () => {
  const [products, setProducts] = useState()
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const getAllMaterials = async () => {
    await axios('users/me/products/', {
      withCredentials: true
    }).then(res => {
      setProducts(res?.data)
      console.log(res?.data)
    }).catch( err => {
      console.log(err)
    })
  }
  
  
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
        <h1 class='text-center font-bold font-ms text-xl pt-6'>Moje materiały</h1>
      {
        isLoading 
        ? <Loader />
        : ''
      }
      <div className='mx-auto max-w-[1350px]'>
      {
          products?.length === 0 && <p>Brak kupionych materiałów</p>
      }
      <div class={` ${isLoading ? 'hidden': ''} pt-8 flex flex-col flex-wrap gap-8 items-center justify-center md:flex-row md:gap-8 md:justify-center md:items-center`}>
        {
          products?.map(product => <ProductCard product={product} onLoad={handleImageLoad} isBought/>)
        }
      </div>
      </div>
    </>
  )
}

export default index