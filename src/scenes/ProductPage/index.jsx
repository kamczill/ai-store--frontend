import React, {useEffect, useState} from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios/axios';
import { toast } from 'react-toastify'

const index = () => {
  const { id } = useParams();
  const [product, setProduct] = useState();
  const [isInCart, setIsInCart] = useState()
  console.log(id)

  const getProduct = async () => {
    await axiosInstance(`/products/${id}`, {
      withCredentials: true
    }).then(res => {
      console.log(res.data)
      setProduct(res?.data)
      checkProductCart(res?.data)
    })
  }

  const checkProductCart = (product) => {
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
    getProduct();
  }, [])

  return (
    <div class='p-5 flex items-center justify-center font-ms'>
      <div class='flex flex-col gap-5 lg:flex-row'>
        <div class='max-w-[400px]'>
          <img src={product?.cover} alt={product?.title} />
        </div>
        <div class='max-w-[400px] lg:p-5 lg:max-w-[700px]'>
            <p class='text-lg'>{product?.author}</p>
            <h3 class='font-ms font-bold text-xl pointer lg:hover:underline lg:hover:decoration-2'>{product?.title}</h3>
              <p class='text-2xl py-5'>{product?.net_price} zł</p>
              {
                isInCart ?
                <button onClick={() => addToCart()} disabled class='w-full max-w-[357px] bg-green-300 py-2 px-4 text-white rounded'>Dodane do koszyka</button>:
                <button onClick={() => addToCart()} class='w-full max-w-[357px] bg-green-500 py-2 px-4 text-white rounded active:scale-95'>Dodaj do koszyka</button>

              }
            <div
              dangerouslySetInnerHTML={{__html: product?.description}}
              class='py-5'
            />
        </div>
      </div>
    </div>
  )
}

export default index