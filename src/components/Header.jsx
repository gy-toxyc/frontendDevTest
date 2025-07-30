import React, { useState, useEffect, useRef } from 'react';
import { Link, useLocation } from 'react-router-dom';

import logo from '../assets/logo.png';
import cartIcon from '../assets/cart.svg';

import '../styles/Header.scss';

function Header({ cartCount }) {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);
    const [showBreadcrumbs, setShowBreadcrumbs] = useState(false);
    const [productInfo, setProductInfo] = useState(null);
    const dropdownRef = useRef(null);

    const getCurrentPageTitle = () => {
        if (pathnames.length === 0) return 'Products';
        if (pathnames[0] === 'product' && pathnames[1]) return 'Product Details';
        return pathnames[pathnames.length - 1].replace(/-/g, ' ').replace(/\b\w/g, l => l.toUpperCase());
    };

    useEffect(() => {
        if (pathnames[0] === 'product' && pathnames[1]) {
            const productId = pathnames[1];
            fetch(`https://itx-frontend-test.onrender.com/api/product/${productId}`)
                .then(res => res.json())
                .then(data => {
                    if (data.brand && data.model) {
                        setProductInfo({ brand: data.brand, model: data.model });
                    }
                })
                .catch(() => {
                    setProductInfo(null);
                });
        } else {
            setProductInfo(null);
        }
    }, [pathnames]);

    const getBreadcrumbText = (name, idx) => {
        if (pathnames[0] === 'product' && idx === 1 && productInfo) {
            return `${productInfo.brand} ${productInfo.model}`;
        }
        
        return decodeURIComponent(name);
    };

    useEffect(() => {
        const handleClickOutside = (event) => {
            if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
                setShowBreadcrumbs(false);
            }
        };

        if (showBreadcrumbs) {
            document.addEventListener('mousedown', handleClickOutside);
        }

        return () => {
            document.removeEventListener('mousedown', handleClickOutside);
        };
    }, [showBreadcrumbs]);

    return (
        <div className="container header-bar">
            <div className="right-side">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>

                <div className="navigation-section" ref={dropdownRef}>
                    <nav className="breadcrumbs-desktop" aria-label="breadcrumb">
                        <ol className="breadcrumbs-list" style={{ listStyle: 'none', display: 'inline-flex', padding: 0, margin: 0 }}>
                            <li>
                                <Link className="breadcrumbs-link-element" to="/">Products</Link>
                            </li>

                            {pathnames.map((name, idx) => {
                                const routeTo = `/${pathnames.slice(0, idx + 1).join('/')}`;

                                return (
                                    <li key={routeTo}>
                                        <span style={{ margin: '0 4px' }}>/</span>
                                        <span className="breadcrumbs-element">{getBreadcrumbText(name, idx)}</span>
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>

                    <div 
                        className={`mobile-page-indicator ${pathnames.length > 0 ? 'clickable' : ''}`}
                        onClick={() => pathnames.length > 0 && setShowBreadcrumbs(!showBreadcrumbs)}
                    >
                        <span className="current-page-title">{getCurrentPageTitle()}</span>
                        {pathnames.length > 0 && (
                            <div className={`breadcrumbs-toggle ${showBreadcrumbs ? 'active' : ''}`}>
                                <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                                    <polyline points="6,9 12,15 18,9"></polyline>
                                </svg>
                            </div>
                        )}
                    </div>

                    {showBreadcrumbs && pathnames.length > 0 && (
                        <nav className="breadcrumbs-mobile" aria-label="breadcrumb">
                            <ol className="breadcrumbs-list" style={{ listStyle: 'none', padding: 0, margin: 0 }}>
                                <li>
                                    <Link className="breadcrumbs-link-element" to="/">Products</Link>
                                </li>

                                {pathnames.map((name, idx) => {
                                    const routeTo = `/${pathnames.slice(0, idx + 1).join('/')}`;

                                    return (
                                        <li key={routeTo}>
                                            <span style={{ margin: '0 4px' }}>/</span>
                                            <span className="breadcrumbs-element">{getBreadcrumbText(name, idx)}</span>
                                        </li>
                                    );
                                })}
                            </ol>
                        </nav>
                    )}
                </div>
            </div>
            
            <div className="cart-container">
                <Link to="/cart" data-cart-count={cartCount}>
                    <img src={cartIcon} alt="Cart" width="32" height="32" />
                </Link>
            </div>
        </div>
    );
};
  
export default Header;