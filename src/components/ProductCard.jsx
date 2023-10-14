import React, { useState, useEffect, useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext, CartContext } from '../App';
import PropTypes from 'prop-types';
import { successNotification } from '../utils/notifications';

const ProductCard = ({ product, isBought, onLoad }) => {
    const [isInCart, setIsInCart] = useState(false);
    const { amountOfProducts, updateCart } = useContext(CartContext);
    const navigate = useNavigate();
    const { currentUser: user } = useContext(AuthContext);

    const checkIfProductIsInCart = () => {
        const items = JSON.parse(localStorage.getItem('cart'));
        setIsInCart(items?.includes(product?.id));
    };

    const addToCart = () => {
        const items = JSON.parse(localStorage.getItem('cart')) || [];
        localStorage.setItem('cart', JSON.stringify([...items, product?.id]));
        setIsInCart(true);
        updateCart(parseInt(amountOfProducts) + 1);
        successNotification('Dodałeś produkt do koszyka!');
    };

    const openProduct = () => {
        navigate(product?.id);
    };

    const renderButtons = () => {
        if (isBought) {
            return (
                <>
                    <button onClick={openProduct} className='bg-green-500 py-2 px-5 text-md text-white rounded active:scale-95'>Otwórz</button>
                    {product.is_downloadable && <a href={product.file_path} className='bg-blue-500 py-2 px-5 text-md text-white rounded active:scale-95'>Pobierz</a>}
                </>
            );
        } else {
            return (
                <>
                    {isInCart && user.logged_in ? (
                        <button disabled className=' bg-green-300 py-2 px-2 text-md text-white rounded whitespace-nowrap'>Dodane do koszyka</button>
                    ) : (
                        user.logged_in && (
                            <button onClick={addToCart} className='bg-green-500 py-2 px-2 text-md text-white whitespace-nowrap rounded active:scale-95'>Dodaj do koszyka</button>
                        )
                    )}
                    {!user.logged_in && (
                        <button disabled className=' bg-green-300 py-2 px-2 text-md text-white rounded whitespace-nowrap'>Zaloguj się aby kupić</button>
                    )}
                </>
            );
        }
    }

    useEffect(() => {
        checkIfProductIsInCart();
    }, [isInCart, amountOfProducts]);

    return (
        <div className='w-[300px] flex flex-col self-stretch justify-between items-center border-2 border-black rounded-md p-3 font-ms bg-white'>
            <div>
                <Link to={isBought ? `${product?.id}` : `/produkty/${product?.id}`}>
                    <img src={`${product?.cover}`} alt='cover' onLoad={() => onLoad()} />
                </Link>
            </div>
            <div className='w-full pt-1'>
                <p className='text-lg'>{product?.author}</p>
                <h3 className='font-ms font-bold text-xl pointer lg:hover:underline lg:hover:decoration-2'>
                    <Link to={isBought ? `${product?.id}` : `/produkty/${product?.id}`}>
                        {product?.title}
                    </Link>
                </h3>
                <div className={`flex ${isBought ? 'justify-center' : 'justify-between'} items-center px-2 pt-3 gap-3`}>
                    { !isBought ? 
                        <p className='text-md whitespace-nowrap'>{(parseFloat(product?.net_price) + (parseFloat(product?.net_price) * (parseFloat(product?.tax) /100))).toFixed(2)} zł</p> 
                        : ''
                    }
                    { renderButtons() }
                </div>
            </div>
        </div>
    );
};

ProductCard.propTypes = {
    product: PropTypes.object.isRequired,
    isBought: PropTypes.bool,
    onLoad: PropTypes.func,
};

export default ProductCard;