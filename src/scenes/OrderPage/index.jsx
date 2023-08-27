import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import axiosInstance from '../../axios/axios';
import { toast } from 'react-toastify'
import { CartContext } from '../../App'
import ProductCart from '../../components/ProductCart';
import OrderProduct from '../../components/OrderProduct';
import Loader from '../../components/Loader';

const index = () => {
  const { id } = useParams();

  const [ userOrder, setUserOrder ] = useState()
  const [products, setProducts] = useState()
  const [totalPrice, setTotalPrice] = useState(0)
  const [isLoading, setIsLoading] = useState(true);
  const [loadedImagesCount, setLoadedImagesCount] = useState(0);

  const getOrder = async () => {
    await axiosInstance(`/orders/${id}`, {
      withCredentials: true
    }).then(res => {
      console.log(res.data.products)
      let total = 0
      res?.data?.products?.forEach(element => {
        console.log(element.product.net_price)
        total += parseFloat(element?.product?.net_price) + (parseFloat(element?.product?.net_price) * (parseFloat(element?.product?.tax) /100))
      });
      setTotalPrice(total)
      setProducts(res.data.products)
      setUserOrder(res.data)
      
    }).catch(err => {
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
    getOrder();
  }, [])

  return (
    <div class='p-5 flex flex-col gap-10 items-center font-ms'>
        <div>
            <h3 class='font-bold text-xl'>Zamówienie nr. {id}</h3>
        </div>
        {isLoading ? <Loader />: ''}
        <div class={`${isLoading ? 'hidden': ''} flex flex-col gap-3`}>
      {products?.map((product) => (
        <OrderProduct product={product?.product} onLoad={handleImageLoad}/>
      ))}
      </div>
      <div>
        <p><span class='font-bold pr-1'>Koszt zamówienia(z VAT):</span> {totalPrice.toFixed(2)} PLN</p>
      </div>
    </div>
  )
}

export default index