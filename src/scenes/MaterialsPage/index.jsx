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
    console.log(':)')
  };

  useEffect(() => {
      if (products?.length && loadedImagesCount === products?.length) {
          setIsLoading(false);
      }
  }, [loadedImagesCount, products]);

  useEffect(() => {
    getAllMaterials();
  }, [])

  return (
    <>
      {
        isLoading 
        ? <Loader />
        : ''
      }
      <div class={` ${isLoading ? 'hidden': ''} pt-10 flex flex-col flex-wrap gap-12 items-center justify-center md:flex-row md:gap-8 md:justify-center md:items-start`}>
        {
          products?.map(product => <ProductCard product={product} onLoad={handleImageLoad} isBought/>)
        }
      </div>
    </>
  )
}

export default index