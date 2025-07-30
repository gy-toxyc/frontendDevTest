import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar'
import ProductListElement from '../components/ProductListElement'
import { useProducts } from '../hooks/useProducts'

import '../styles/ProductListPage.scss'

const ProductListPage = () => {
    const { products, loading, error } = useProducts();
    const [filteredProducts, setFilteredProducts] = useState(products);

    // Update filtered products when products change
    useEffect(() => {
        setFilteredProducts(products);
    }, [products]);

    const handleSearch = (searchTerm) => {
        if (!searchTerm.trim()) {
            setFilteredProducts(products);
            return;
        }

        const filtered = products.filter(product => {
            const searchLower = searchTerm.toLowerCase();
            const brandMatch = product.brand?.toLowerCase().includes(searchLower);
            const modelMatch = product.model?.toLowerCase().includes(searchLower);
            
            return brandMatch || modelMatch;
        });

        setFilteredProducts(filtered);
    };

    if (loading) return <p>Cargando...</p>;
    if (error) return <p>Error al cargar productos</p>;

    return (
        <div className="product-list-container">
            <div className="search-section">
                <SearchBar onSearch={handleSearch} placeholder="Search products..." />
            </div>
            <div className="content-section">
                <div className="products-grid">
                    {filteredProducts.map((p) => (
                        <ProductListElement key={p.id} product={p} />
                    ))}
                </div>
            </div>
        </div>
    );
};
  
export default ProductListPage;