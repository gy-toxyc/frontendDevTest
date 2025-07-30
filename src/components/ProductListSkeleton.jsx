import React from 'react';
import '../styles/ProductListSkeleton.scss';

function ProductListSkeleton() {
  return (
    <div className="products-grid">
      {[...Array(15)].map((_, i) => (
        <div key={i} className="product-element skeleton">
          <div className="product-image-container">
            <div className="skeleton-box skeleton-image" />
          </div>
          <div className="product-info">
            <div className="skeleton-box skeleton-text short" />
            <div className="skeleton-box skeleton-text medium" />
            <div className="skeleton-box skeleton-text price" />
          </div>
        </div>
      ))}
    </div>
  );
}

export default ProductListSkeleton;
