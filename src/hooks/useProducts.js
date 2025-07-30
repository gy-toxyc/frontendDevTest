import { useEffect, useState } from 'react';
import { loadFromCache, saveToCache } from '../utils/cache';

export function useProducts() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cached = loadFromCache('products');

    if (cached) {
      setProducts(cached);
      setLoading(false);
    } else {
      fetch('https://itx-frontend-test.onrender.com/api/product')
        .then((res) => res.json())
        .then((data) => {
          setProducts(data);
          saveToCache('products', data);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, []);

  return { products, loading, error };
}
