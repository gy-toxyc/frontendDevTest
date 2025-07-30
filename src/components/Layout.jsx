import React from 'react';
import { Outlet } from 'react-router-dom';

import Header from './Header';
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
