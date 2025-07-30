import React from 'react';
import { useParams } from 'react-router-dom';
import { useProduct } from '../hooks/useProduct'
import Image from '../components/Image';

const ProductDetailPage = () => {
    const { id } = useParams();
    const { product, loading, error } = useProduct(id);

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar los detalles de un producto.</p>;

    console.log(product);

    return (
        <>
            <Image 
                src={product.imgUrl} 
                alt={product.model.toLowerCase().replace("", "_")}
            />
            <h1>Product ID: {product['id']}</h1>
        </>
    );
};
  
export default ProductDetailPage;