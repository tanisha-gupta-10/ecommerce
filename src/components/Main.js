import React from 'react'
import Video from './Video';
import Loader from './Loader';
import Cart from './Cart';

function Main({ products, loading, addToFvrts, fvrt, add_to_cart, isMobile, handleShowCart, showCart, cart, handleRemoveCart, cartPrice, quantity, handleQuantityChange }) {
    return (
        <>

            {loading ? <Loader /> :
                <div className='videoSrc'>
                    {products.map(product => <Video key={product.id} isMobile={isMobile} product={product} addToFvrts={addToFvrts} fvrt={fvrt} add_to_cart={add_to_cart}  quantity={quantity}
          handleQuantityChange={handleQuantityChange}  />)}
                </div>}
            {showCart ? <Cart key={cart.length} handleShowCart={handleShowCart} cart={cart} handleRemoveCart={handleRemoveCart} cartPrice={cartPrice}/> : null}

        </>
    );
}

export default Main;