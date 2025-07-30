import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct'
import Image from '../components/Image';
import ProductDescription from '../components/ProductDescription';
import ProductOptions from '../components/ProductOptions';
import '../styles/ProductDetailPage.scss';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar los detalles de un producto.</p>;

    return (
        <div className="product-details-container">
            <div className="product-image">
                <Image 
                    src={product.imgUrl} 
                    alt={product.model.toLowerCase().replace("", "_")}
                />
            </div>
            <div className="product-info">
                <ProductDescription product={product} />
                <ProductOptions product={product} />
            </div>
        </div>
    );
};
  
export default ProductDetailPage;