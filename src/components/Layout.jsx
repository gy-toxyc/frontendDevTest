import React from 'react';
import Header from './Header';
import { Outlet } from 'react-router-dom';
import { useAddToCart } from '../hooks/useAddToCart';

function Layout() {
    const { cartCount } = useAddToCart();
    return (
        <>
            <Header cartCount={cartCount} />
            <Outlet />
        </>
    );
}

export default Layout;
