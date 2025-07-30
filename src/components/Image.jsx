import React from 'react';

import '../styles/Image.scss';

const Image = ({ 
  src,
  alt,
  className = '',
  onClick,
  loading = 'lazy'
}) => {
  const handleError = (e) => {
    e.target.src = '/placeholder-image.png';
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`image-component ${className}`}
      onClick={onClick}
      loading={loading}
      onError={handleError}
    />
  );
};

export default Image; 