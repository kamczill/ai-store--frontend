import React, {useEffect, useState, useContext} from 'react'
import { useParams } from 'react-router-dom'
import { AuthContext, CartContext } from '../../App'
import Loader from '../../components/Loader'
import { useCart } from '../../hooks/useCart';
import { useProduct } from '../../hooks/useProduct';

const index = () => {
  const { id } = useParams();
  const { product } = useProduct(id)
  const [isLoading, setIsLoading] = useState(true);

  const {currentUser: user} = useContext(AuthContext)
  const {amountOfProducts} = useContext(CartContext)
  const { isInCart, addToCart, checkProductCart } = useCart();

  const isUserLoggedIn = user.logged_in;
  const buttonDisabled = !isUserLoggedIn || isInCart;

  const AddToCartButton = ({ onClick, disabled }) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className='w-full max-w-[357px] bg-green-500 py-2 px-4 text-white rounded active:scale-95'
    >
      Dodaj do koszyka
    </button>
  );
  
  const AddedToCartButton = ({ disabled }) => (
    <button 
      disabled={disabled} 
      className='w-full max-w-[357px] bg-green-300 py-2 px-4 text-white rounded'
    >
      Dodane do koszyka
    </button>
  );
  
  const LoginToBuyButton = ({ onClick, disabled }) => (
    <button 
      onClick={onClick} 
      disabled={disabled} 
      className='w-full max-w-[357px] bg-green-300 py-2 px-4 text-white rounded'
    >
      Zaloguj się, aby kupić
    </button>
  );
  
  useEffect(() => {
    checkProductCart(product?.id)
  }, [product, amountOfProducts])

  return (
    <div className='p-5 flex items-center justify-center font-ms'>
            { isLoading && (
              <div className='mt-10'>
                  <Loader />
              </div>
            )}
      <div className={`${isLoading ? 'hidden': 'flex'} flex-col gap-5 lg:flex-row`}>
        <div className='max-w-[400px]'>
          <img src={product?.cover} alt={product?.title} onLoad={() => setIsLoading(false)}/>
        </div>
        <div className='max-w-[400px] lg:p-5 lg:max-w-[700px]'>
            <p className='text-lg'>{product?.author}</p>
            <h3 className='font-ms font-bold text-xl pointer lg:hover:underline lg:hover:decoration-2'>{product?.title}</h3>
              <p className='text-2xl py-5'>{(parseFloat(product?.net_price) + (parseFloat(product?.net_price) * (parseFloat(product?.tax) /100))).toFixed(2)} zł</p>
              {isInCart && isUserLoggedIn ? (
                <AddedToCartButton disabled={buttonDisabled} />
                ) : isUserLoggedIn ? (
                  <AddToCartButton onClick={() => addToCart(product?.id)} disabled={buttonDisabled} />
                ) : (
                  <LoginToBuyButton onClick={() => addToCart(product?.id)} disabled={buttonDisabled} />
              )}
            <div
              dangerouslySetInnerHTML={{__html: product?.description}}
              className='py-5'
            />
        </div>
      </div>
    </div>
  )
}

export default index