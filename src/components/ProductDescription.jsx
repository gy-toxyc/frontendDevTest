import React from 'react';

import '../styles/ProductDescription.scss';

const ProductDescription = ({ product }) => {
    if (!product) {
        return <div className="product-description">No hay información disponible para este producto.</div>;
    }

    const characteristics = [
        { label: 'Marca', value: product.brand || 'No especificada.' },
        { label: 'Modelo', value: product.model || 'No especificado.' },
        { label: 'Precio', value: product.price ? `${product.price} €` : 'Precio no disponible.' },
        { label: 'CPU', value: product.cpu || 'No disponible.' },
        { label: 'RAM', value: product.ram || 'No disponible.' },
        { label: 'Sistema Operativo', value: product.os || 'No disponible.' },
        { label: 'Resolución de Pantalla', value: product.displaySize || 'No disponible.' },
        { label: 'Batería', value: product.battery || 'No disponible.' },
        { label: 'Cámaras', value: product.primaryCamera && product.secondaryCmera ? `${product.primaryCamera}, ${product.secondaryCmera}` : 'No disponible.' },
        { label: 'Dimensiones', value: product.dimentions || 'No disponible.' },
        { label: 'Peso', value: product.weight || 'No disponible.' }
    ];

    return (
        <div className="product-description">
            <h2 className="product-description-title">Características del Móvil</h2>
            <div className="characteristics-list">
                {characteristics.map((char, index) => (
                    <div key={index} className="characteristic-item">
                        <span className="characteristic-label">{char.label}:</span>
                        <span className="characteristic-value">{char.value}</span>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default ProductDescription; 