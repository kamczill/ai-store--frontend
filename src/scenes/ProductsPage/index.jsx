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
    await axios('/products/', {
      withCredentials: true
    }).then(res => {
      setProducts(res?.data)
      console.log(res.data)
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
      <h1 class='text-center font-bold font-ms text-xl pt-6'>Dostępne produkty</h1>

    {
        isLoading 
        ? <Loader />
        : ''
      }
    <div className='mx-auto max-w-[1350px]'>
      <div className={`${isLoading ? 'hidden': ''} pt-8 flex flex-col flex-wrap gap-8 items-center justify-center md:flex-row md:gap-8 md:justify-center md:items-center`}>
          {products?.map(product => <ProductCard product={product} onLoad={handleImageLoad}/>)}
      </div>
    </div>
    </>
  )
}

export default index