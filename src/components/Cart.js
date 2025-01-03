import React from 'react'

export default function Cart({ handleShowCart, cart, handleRemoveCart, cartPrice, isMobile }) {

    // console.log(cart);
    return (
        <div className="cart-cont" style={{width: isMobile? '80%' : '30%'}}>
            <div className="top-part" style={{ alignItems: 'center', justifyContent: 'space-between', borderBottom: '2px solid #f2f2f2' }}>
                <h2 style={{ margin: 0 }}>Your Cart</h2>
                <img src="https://icons.veryicon.com/png/o/miscellaneous/medium-thin-linear-icon/cross-23.png" style={{ width: '30px' }} onClick={handleShowCart} />
            </div>


            {cart.length > 0 ? <div className='cart-items'>

                {cart.map((cartItem) => <div key={cartItem.id} className='cartItem'>
                    <div className='product-detail'>
                        <img src={cartItem.image} alt="Product" style={{width : isMobile ? '70px' : '100px'}} />
                        <div>
                            <h4>{cartItem.title}</h4>
                            <p>Rs.{cartItem.price} x {cartItem.quantity}</p>
                        </div>
                    </div>
                    <button className={`btn btn-danger ${isMobile? 'btn-sm' : ''}`} onClick={() => handleRemoveCart(cartItem.id, cartItem.quantity)}>x</button>
                </div>)}

            </div> : <div class="alert alert-primary text-center" role="alert">
                Your cart is empty
            </div>}



            <div className='cart-total'>
                <h6>Total: <span>Rs.{cartPrice}</span></h6>
                <button className='btn btn-success'>Checkout</button>

            </div>

        </div >
    )
}