import { useEffect, useState } from 'react';

import { loadFromCache, saveToCache } from '../utils/cache';

export function useProduct(id) {
  const [product, setProduct] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const key = `product_${id}`;
    const cached = loadFromCache(key);

    if (cached) {
      setProduct(cached);
      setLoading(false);
    } else {
      fetch(`https://itx-frontend-test.onrender.com/api/product/${id}`)
        .then((res) => res.json())
        .then((data) => {
          setProduct(data);
          saveToCache(key, data);
        })
        .catch((err) => setError(err))
        .finally(() => setLoading(false));
    }
  }, [id]);

  return { product, loading, error };
}
