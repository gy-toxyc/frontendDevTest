import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import '../styles/Header.scss';
import logo from '../assets/logo.png';
import cartIcon from '../assets/cart.svg';

function Header({ cartCount }) {
    const location = useLocation();
    const pathnames = location.pathname.split('/').filter(x => x);

    return (
        <div className="container header-bar">
            <div className="right-side">
                <div className="logo-container">
                    <Link to="/">
                        <img src={logo} alt="Logo" className="logo" />
                    </Link>
                </div>

                <div>
                    <nav aria-label="breadcrumb">
                        <ol className="breadcrumbs-list" style={{ listStyle: 'none', display: 'inline-flex', padding: 0, margin: 0 }}>
                            <li>
                                <Link className="breadcrumbs-link-element" to="/">Products</Link>
                            </li>

                            {pathnames.map((name, idx) => {
                                const routeTo = `/${pathnames.slice(0, idx + 1).join('/')}`;

                                return (
                                    <li key={routeTo}>
                                        <span style={{ margin: '0 4px' }}>/</span>
                                        <span className="breadcrumbs-element">{decodeURIComponent(name)}</span>
                                    </li>
                                );
                            })}
                        </ol>
                    </nav>
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