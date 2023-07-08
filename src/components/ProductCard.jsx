import React from 'react'
import { Link } from 'react-router-dom'

const ProductCard = ({product}) => {
  return (
    <div class='max-w-[300px] flex flex-col gap-4 justify-center items-center border-2 border-black rounded-md p-3 font-ms bg-white'>
        <div class=''>
            <img src='https://edit.org/images/cat/book-covers-big-2019101610.jpg' alt='cover'/>
        </div>
        <div>
            <p class='text-lg'>MAIKEL</p>
            <h3 class='font-ms font-bold text-xl pointer lg:hover:underline lg:hover:decoration-2'><Link>600 najlepszych promptów chatGPT</Link></h3>
            <div class='flex justify-between items-center px-3  pt-3'>
            <p class='text-xl'>200zł</p>
            <button class='bg-blue-500 py-2 px-4 text-white rounded'>Dodaj do koszyka</button>
            </div>
            {/* <p>Zestaw 600 najlepszych promptów ChatGPT to zasób, który pozwala na maksymalne wykorzystanie potencjału tej AI. </p> */}
        </div>
    </div>
  )
}

export default ProductCard