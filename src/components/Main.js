import React from 'react'
import Video from './Video';
import Loader from './Loader';
import Cart from './Cart';

function Main({ products, loading, addToFvrts, fvrt, add_to_cart, handleShowCart, showCart, cart, handleRemoveCart, cartPrice }) {
    return (
        <>

            {loading ? <Loader /> :
                <div className='videoSrc'>
                    {products.map(product => <Video key={product.id} product={product} addToFvrts={addToFvrts} fvrt={fvrt} add_to_cart={add_to_cart}  />)}
                </div>}
            {showCart ? <Cart key={cart.length} handleShowCart={handleShowCart} cart={cart} handleRemoveCart={handleRemoveCart} cartPrice={cartPrice}/> : null}

        </>
    );
}

export default Main;