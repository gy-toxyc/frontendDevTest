import { useState, useEffect } from 'react';

import { loadFromCache, saveToCache } from '../utils/cache';

let globalCartCount = 0;
let globalCartListeners = [];

const notifyCartListeners = (newCount) => {
  globalCartCount = newCount;
  globalCartListeners.forEach(listener => listener(newCount));
};

const subscribeToCart = (listener) => {
  globalCartListeners.push(listener);
  return () => {
    globalCartListeners = globalCartListeners.filter(l => l !== listener);
  };
};

const incrementCartCount = () => {
  const newCount = globalCartCount + 1;
  notifyCartListeners(newCount);
  saveToCache('cart_count', newCount);
  return newCount;
};

export function useAddToCart() {
  const [loading, setLoading] = useState(false);
  const [cartCount, setCartCount] = useState(globalCartCount);
  const [error, setError] = useState(null);

  useEffect(() => {
    const cachedCartCount = loadFromCache('cart_count');
    if (cachedCartCount !== null) {
      globalCartCount = cachedCartCount;
      setCartCount(cachedCartCount);
    }

    const unsubscribe = subscribeToCart((newCount) => {
      setCartCount(newCount);
    });

    return unsubscribe;
  }, []);

  const addToCart = async ({ id, colorCode, storageCode }) => {
    setLoading(true);
    setError(null);
    
    try {
      const res = await fetch('https://itx-frontend-test.onrender.com/api/cart', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ id, colorCode, storageCode }),
      });

      const data = await res.json();
      
      let newCount;
      if (data.count === 1 && globalCartCount > 0) {
        newCount = incrementCartCount();
      } else {
        newCount = data.count;
        notifyCartListeners(newCount);
        saveToCache('cart_count', newCount);
      }
      
      return newCount;
    } catch (err) {
      setError(err);
      throw err;
    } finally {
      setLoading(false);
    }
  };

  return { addToCart, loading, cartCount, error };
}
