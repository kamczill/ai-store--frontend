import React, {useEffect, useState} from 'react'
import ProductCard from '../../components/ProductCard'

import axios from '../../axios/axios'


const index = () => {
  const [products, setProducts] = useState()

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

  useEffect(() => {
    getAllMaterials();
  }, [])

  return (
    <div class='p-5 pt-10 flex flex-col items-center'>
      {
        products?.map(product => <ProductCard product={product} />)
      }
      <ProductCard/>
    </div>
  )
}

export default index