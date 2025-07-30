import { useState } from 'react';

export function useAddToCart() {
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(0);
  const [error, setError] = useState(null);

  const addToCart = async ({ id, colorCode, storageCode }) => {
    setLoading(true);
    try {
      const res = await fetch('https://itx-frontend-test.onrender.com/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, colorCode, storageCode }),
      });

      const data = await res.json();
      setCartCount(data.count);
      return data.count;
    } catch (err) {
      setError(err);
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, cartCount, error };
}
