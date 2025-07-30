import React from 'react';
import { Routes, Route } from 'react-router-dom';

import ProductDetailPage from '../pages/ProductDetailPage'
import ProductListPage from '../pages/ProductListPage'
import Layout from '../components/Layout';

const AppRouter = () => {
  return (
    <Routes>
      <Route element={<Layout/>}>
        <Route path="/" element={<ProductListPage />} />
        <Route path="/product/:id" element={<ProductDetailPage />} />
      </Route>
    </Routes>
  );
};

export default AppRouter;
