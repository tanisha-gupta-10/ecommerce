import React from 'react'

function Video({ product, addToFvrts, fvrt, add_to_cart, quantity, handleQuantityChange }) {

    return (
        <div className="card" >
            <img src={fvrt[product.id]
                ? 'https://d2n7zouke881gi.cloudfront.net/randomUploads/webUsage/svgs/group12.svg'
                : 'https://d2n7zouke881gi.cloudfront.net/randomUploads/webUsage/svgs/vector118.svg'
            } alt="" className="like-icon" onClick={() => addToFvrts(product.id)} />
            <img
                className="card-img-top"
                src={product.image}
                alt="Video thumbnail"
            />
            <div className="card-body">
                <p className="card-text">
                    {product.title}
                </p>

                <div className='rating'>
                    <span className='rate'>{product.rating.rate}</span>
                    <span className='count'> ({product.rating.count})</span>
                </div>

                <div className='price'>
                    <span className='price-text'>Rs.{product.price} <span className='price-old'>Rs.{product.price}</span> </span>

                </div>

                <div className='cta'>
                    <span className='quantity'>
                        <select className="form-select" id={'quantity' + product.id} name='quantity' value={quantity[product.id] || 1} onChange={(e) => handleQuantityChange(product.id, e.target.value)} aria-label="Default select example">
                            <option value="1" selected>1</option>
                            <option value="2">2</option>
                            <option value="3">3</option>
                            <option value="4">4</option>
                        </select>
                    </span>

                    <span className='addToCart' onClick={() => add_to_cart(product.id,quantity[product.id] || 1 )}>
                        Add to cart
                    </span>
                </div>
            </div>
        </div>
    );
}


export default Video;