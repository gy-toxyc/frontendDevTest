import React, { useState, useEffect } from 'react';
import { toast } from 'sonner';

import { useAddToCart } from '../hooks/useAddToCart';

import '../styles/ProductOptions.scss';

const ProductOptions = ({ product }) => {
    const [selectedStorage, setSelectedStorage] = useState('');
    const [selectedColor, setSelectedColor] = useState('');
    const [storageOptions, setStorageOptions] = useState([]);
    const [colorOptions, setColorOptions] = useState([]);
    const { addToCart, loading, error } = useAddToCart();

    useEffect(() => {
        if (product) {
            const storageOpts = product.options.storages || [
                { code: 2000, name: '32 GB' }
            ];
            
            const colorOpts = product.options.colors || [
                { code: 1000, name: 'Negro' },
                { code: 1001, name: 'Blanco' }
            ];

            setStorageOptions(storageOpts);
            setColorOptions(colorOpts);

            if (storageOpts.length === 1) {
                setSelectedStorage(storageOpts[0].code);
            }

            if (colorOpts.length === 1) {
                setSelectedColor(colorOpts[0].code);
            }
        }
    }, [product]);

    const handleAddToCart = async () => {
        if (!selectedStorage || !selectedColor) {
            toast.error('Por favor selecciona tanto el almacenamiento como el color.');
            return;
        }

        try {
            await addToCart({
                id: product.id,
                colorCode: selectedColor,
                storageCode: selectedStorage
            });
            
            toast.success('Producto añadido al carrito correctamente.');
        } catch {
            toast.error('Error al añadir el producto al carrito.');
        }
    };

    if (!product) {
        return <div className="product-options">No hay información del producto disponible.</div>;
    }

    return (
        <div className="product-options">
            <h3 className="options-title">Selecciona las opciones</h3>
            
            <div className="options-container">
                <div className="option-group">
                    <label htmlFor="storage-select" className="option-label">
                        Almacenamiento:
                    </label>
                    <select
                        id="storage-select"
                        value={selectedStorage}
                        onChange={(e) => setSelectedStorage(e.target.value)}
                        className="option-select"
                    >
                        <option value="">Selecciona almacenamiento</option>
                        {storageOptions.map((option) => (
                            <option key={option.code} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>

                <div className="option-group">
                    <label htmlFor="color-select" className="option-label">
                        Color:
                    </label>
                    <select
                        id="color-select"
                        value={selectedColor}
                        onChange={(e) => setSelectedColor(e.target.value)}
                        className="option-select"
                    >
                        <option value="">Selecciona color</option>
                        {colorOptions.map((option) => (
                            <option key={option.code} value={option.code}>
                                {option.name}
                            </option>
                        ))}
                    </select>
                </div>
            </div>

            <div className="add-to-cart-section">
                <button
                    onClick={handleAddToCart}
                    disabled={loading || !selectedStorage || !selectedColor}
                    className="add-to-cart-button"
                >
                    {loading ? 'Añadiendo...' : 'Añadir al Carrito'}
                </button>
                
                {error && (
                    <p className="error-message">
                        Error: {error.message || 'Error al añadir al carrito'}
                    </p>
                )}
            </div>
        </div>
    );
};

export default ProductOptions; 