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
    }).catch( err => {
      console.log(err)
    })
  }

  useEffect(() => {
    getAllMaterials();
  }, [])

  return (
    <div class='p-5 flex items-center justify-center md:justify-start'>
      <ProductCard/>
    </div>
  )
}

export default index