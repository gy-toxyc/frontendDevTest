import React from 'react';

import '../styles/ProductDetailSkeleton.scss';

const ProductDetailSkeleton = () => {
  return (
    <div className="product-details-container skeleton">
      <div className="product-image skeleton-box"></div>
      <div className="product-info">
        <div className="skeleton-box skeleton-title"></div>
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-text"></div>
        <div className="skeleton-box skeleton-button"></div>
      </div>
    </div>
  );
};

export default ProductDetailSkeleton;
