import React, { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

// https://edit.org/images/cat/book-covers-big-2019101610.jpg

const ProductCard = ({product}) => {
  const [isInCart, setIsInCart] = useState()


  const checkProductCart = () => {
    const items = JSON.parse(localStorage.getItem('cart'))
    if (items?.includes(product?.id)){
      setIsInCart(true)
    }
  }

  const addToCart = () => {
    const items = JSON.parse(localStorage.getItem('cart')) || []
    localStorage.setItem('cart', JSON.stringify([...items,product?.id]));
    setIsInCart(true)
    successNotification();
  }

  const successNotification = () => {
    toast.success(`Dodałeś produkt do koszyka!`, {
        position: "bottom-center",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
    });
  }

  useEffect(() => {
    checkProductCart()
  }, [isInCart])

  return (
    <div class='max-w-[300px] flex flex-col justify-between items-center border-2 border-black rounded-md p-3 font-ms bg-white'>
        <div class=''>
            <Link to={`/produkty/${product?.id}`}><img src={product?.cover} alt='cover'/></Link>
        </div>
        <div class='w-full pt-1'>
            <p class='text-lg'>{product?.author}</p>
            <h3 class='font-ms font-bold text-xl pointer lg:hover:underline lg:hover:decoration-2'><Link to={`/produkty/${product?.id}`}>{product?.title}</Link></h3>
            <div class='flex justify-between items-center px-2  pt-3'>
            <p class='text-md'>{product?.net_price} zł</p>
            {
              isInCart ?
              <button disabled class=' bg-green-300 py-2 px-2 text-md text-white rounded'>Dodane do koszyka</button>:
              <button onClick={() => addToCart()} class='bg-green-500 py-2 px-2 text-md text-white rounded active:scale-95'>Dodaj do koszyka</button>
            }
           
            </div>
            {/* <p>Zestaw 600 najlepszych promptów ChatGPT to zasób, który pozwala na maksymalne wykorzystanie potencjału tej AI. </p> */}
        </div>
    </div>
  )
}

export default ProductCard