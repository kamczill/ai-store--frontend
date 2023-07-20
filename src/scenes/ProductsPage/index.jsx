import React, {useEffect, useState} from 'react'
import ProductCard from '../../components/ProductCard'

import axios from '../../axios/axios'


const index = () => {
  const [products, setProducts] = useState()

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

  useEffect(() => {
    getAllMaterials();
  }, [])

  return (
    <div class='pt-10 flex flex-col flex-wrap gap-12 items-center justify-center md:flex-row md:gap-8 md:justify-center md:items-start'>
      {products?.map(product => <ProductCard product={product}/>)}
      
    </div>
  )
}

export default index