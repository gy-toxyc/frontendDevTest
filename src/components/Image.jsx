import React from 'react';
import '../styles/Image.scss';

const Image = ({ 
  src,
  alt,
  className = '',
  width,
  height,
  onClick,
  loading = 'lazy'
}) => {
  const handleError = (e) => {
    // Fallback to a placeholder image if the main image fails to load
    e.target.src = '/placeholder-image.png';
  };

  return (
    <img
      src={src}
      alt={alt}
      className={`image-component ${className}`}
      width={width}
      height={height}
      onClick={onClick}
      loading={loading}
      onError={handleError}
    />
  );
};

export default Image; 