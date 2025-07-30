import React from 'react';
import { Link } from 'react-router-dom';
import '../styles/ProductListElement.scss';

function ProductListElement({ product }) {
    const { id, brand, model, price, imgUrl } = product;

    const isOutOfStock = !price || price === '' || price === 0;

    return (
        <Link to={"/product/" + id} className="product-element">
            <div className="product-image-container">
                <img
                    src={imgUrl}
                    alt={`${brand} ${model}`}
                    className="product-image"
                    onError={(e) => {
                        e.target.src = 'https://via.placeholder.com/200x200?text=No+Image';
                    }}
                />
            </div>

            <div className="product-info">
                <h3 className="product-model">{model}</h3>
                <p className="product-brand">{brand}</p>
                <p className={`product-price ${isOutOfStock ? 'out-of-stock' : ''}`}>
                    {isOutOfStock ? 'Out of Stock' : `${price} €`}
                </p>
            </div>
        </Link>
    );
}

export default ProductListElement;
