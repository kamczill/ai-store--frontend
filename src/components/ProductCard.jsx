import React from 'react'
import { Link } from 'react-router-dom'
// https://edit.org/images/cat/book-covers-big-2019101610.jpg

const ProductCard = ({product}) => {
  console.log(product)
  return (
    <div class='max-w-[300px] flex flex-col justify-between items-center border-2 border-black rounded-md p-3 font-ms bg-white'>
        <div class=''>
            <Link to={`/produkty/${product?.id}`}><img src={product?.cover} alt='cover'/></Link>
        </div>
        <div>
            <p class='text-lg'>MAIKEL</p>
            <h3 class='font-ms font-bold text-xl pointer lg:hover:underline lg:hover:decoration-2'><Link to={`/produkty/${product?.id}`}>600 najlepszych promptów chatGPT</Link></h3>
            <div class='flex justify-between items-center px-3  pt-3'>
            <p class='text-xl'>200zł</p>
            <button class='bg-green-500 py-2 px-4 text-white rounded active:scale-95'>Dodaj do koszyka</button>
            </div>
            {/* <p>Zestaw 600 najlepszych promptów ChatGPT to zasób, który pozwala na maksymalne wykorzystanie potencjału tej AI. </p> */}
        </div>
    </div>
  )
}

export default ProductCard