import React from 'react';

import '../styles/ProductListSkeleton.scss';

function ProductListSkeleton() {
  const SKELETON_ELEMENTS = 15;
  
  return (
    <div className="products-grid">
      {[...Array(SKELETON_ELEMENTS)].map((_, i) => (
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
