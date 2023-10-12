import React, { useState, useEffect, useContext } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { toast } from 'react-toastify'
import { CartContext, AuthContext  } from '../App'
import { } from 'react-router-dom'

const ProductCard = ({product, isBought, onLoad}) => {
  const [isInCart, setIsInCart] = useState()
  const {amountOfProducts, updateCart } = useContext(CartContext)
  const navigate = useNavigate()
  const {currentUser: user} = useContext(AuthContext)

  const checkProductCart = () => {
    const items = JSON.parse(localStorage.getItem('cart'))
    if (items?.includes(product?.id)){
      setIsInCart(true)
    } else {
      setIsInCart(false)
    }
  }

  const addToCart = () => {
    const items = JSON.parse(localStorage.getItem('cart')) || []
    console.log(amountOfProducts)
    localStorage.setItem('cart', JSON.stringify([...items,product?.id]));
    setIsInCart(true)
    updateCart(parseInt(amountOfProducts) + 1)
    successNotification();
  }

  const openProduct = () => {
    navigate(product?.id)
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
    console.log(product)
  }, [isInCart, amountOfProducts])

  return (
    <div class='w-[300px] flex flex-col self-stretch justify-between items-center border-2 border-black rounded-md p-3 font-ms bg-white'>
        <div class=''>
            <Link to={isBought ? `/${product?.id}`:`/produkty/${product?.id}`}>
              <img src={`${product?.cover}`} alt='cover' onLoad={() => onLoad()}/>
            </Link>
        </div>
        <div class='w-full pt-1'>
            <p class='text-lg'>{product?.author}</p>
            <h3 class='font-ms font-bold text-xl pointer lg:hover:underline lg:hover:decoration-2'>
              <Link to={isBought ? `/${product?.id}`:`/produkty/${product?.id}`}>
                {product?.title}
              </Link>
            </h3>
            <div class={`flex ${isBought ? 'justify-center': 'justify-between'} items-center px-2  pt-3 gap-3`}>
            { !isBought ? 
            <p class='text-md whitespace-nowrap'>{(parseFloat(product?.net_price) + (parseFloat(product?.net_price) * (parseFloat(product?.tax) /100))).toFixed(2)} zł</p>: 
            ''
            }
            { isBought ? (
                <>
                  <button onClick={() => openProduct()} class='bg-green-500 py-2 px-5 text-md text-white rounded active:scale-95'>Otwórz</button>
                  { product.is_downloadable 
                    ? <a href={product.file_path} class='bg-blue-500 py-2 px-5 text-md text-white rounded active:scale-95'>Pobierz</a>
                    : ''
                  }
                </>
              ): (
                  isInCart && user.logged_in ?
                  <button disabled class=' bg-green-300 py-2 px-2 text-md text-white rounded whitespace-nowrap'>Dodane do koszyka</button> : (
                    user.logged_in ? (
                      <button onClick={() => addToCart()} class='bg-green-500 py-2 px-2 text-md text-white whitespace-nowrap rounded active:scale-95'>Dodaj do koszyka</button>
                    ): ''
                  )
              )
            }

            
            {
              user.logged_in === false ? (
                <button disabled class=' bg-green-300 py-2 px-2 text-md text-white rounded whitespace-nowrap'>Zaloguj się aby kupić</button>
              ): ''
            }
            
           
            </div>
        </div>
    </div>
  )
}

export default ProductCard