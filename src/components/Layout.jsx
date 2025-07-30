import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useAddToCart } from '../hooks/useAddToCart';

function Layout({ children }) {
    const { cartCount, setCartCount } = useAddToCart();
    return (
        <>
            <Header cartCount={cartCount} setCartCount={setCartCount} />
            <Outlet />
        </>
    );
}

export default Layout;
