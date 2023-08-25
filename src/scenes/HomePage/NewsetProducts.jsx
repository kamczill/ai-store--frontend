import React, { useEffect, useState } from 'react'
import ProductCard from '../../components/ProductCard'
import axiosInstance from '../../axios/axios'

const NewsetProducts = () => {
    const [products, setProducts] = useState();

    const getProducts = async () => {
        await axiosInstance('products/')
        .then(res => {
            setProducts(res?.data)
        }).catch(err => console.log(err))
    }


    useEffect(() => {
        getProducts();
    }, [])

  return (
    <div class='flex justify-center items-center w-full'>
        <div class='w-[80%] flex flex-col gap-10'>
            <div>
                <h2 class='text-3xl text-center'>Najnowsze produkty</h2>
            </div>
            <div className='flex gap-5 justify-center'>
                {
                    products?.reverse()
                    .slice(0,4)
                    .map(product => (
                        <ProductCard product={product} />
                    ))
                }
                    
            </div>
        </div>
    </div>
  )
}

export default NewsetProducts