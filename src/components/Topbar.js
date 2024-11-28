import React from 'react';
import ham from '../assets/asset 41.svg';
import youtube from '../assets/asset 42.svg';


export default function Topbar({ cartCount, handleShowCart, showCart }) {

    return (
        <>
            <div className='topbar'>
                <div className='top-part'>
                    <img src={ham} className='hamburger' />
                    <div className='heading'>Q-commerce</div>
                </div>


                <form className="d-flex">
                    <input className="form-control me-2" type="search" placeholder="Search" aria-label="Search" />
                </form>

                <div className='cart' style={{ position: 'relative' }} onClick={handleShowCart}>
                    <img src='https://cdn-icons-png.flaticon.com/512/1413/1413908.png' className='youtube' />

                    {cartCount ? <span className='cartCount'>{cartCount}</span> : null}

                </div>
            </div>
        </>
    );
}