import { renderHook, act } from '@testing-library/react';
import { waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { useAddToCart } from '../src/hooks/useAddToCart';
import * as cache from '../src/utils/cache';

vi.mock('../src/utils/cache', async () => {
  const actual = await vi.importActual('../src/utils/cache');
  return {
    ...actual,
    loadFromCache: vi.fn(),
    saveToCache: vi.fn()
  };
});

describe('useAddToCart', () => {
  beforeEach(() => {
    vi.resetAllMocks();
    cache.saveToCache.mockImplementation(() => {});
  });

  it('[ADD_TO_CART] Should load cart count from cache', () => {
    cache.loadFromCache.mockReturnValue(5);

    const { result } = renderHook(() => useAddToCart());

    expect(result.current.cartCount).toBe(5);
  });

  it('[ADD_TO_CART] Should handle successful add to cart with API count', async () => {
    cache.loadFromCache.mockReturnValue(0);

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => ({ count: 3 }),
    });

    const { result } = renderHook(() => useAddToCart());

    await act(() =>
      result.current.addToCart({
        id: 'xyPoqGJxYR4Nn3yVGQcfI',
        colorCode: '1',
        storageCode: '1',
      })
    );

    expect(result.current.cartCount).toBe(3);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('[ADD_TO_CART] Should handle API error', async () => {
    cache.loadFromCache.mockReturnValue(0);
  
    global.fetch = vi.fn().mockRejectedValue(new Error('Network error'));
  
    const { result } = renderHook(() => useAddToCart());
  
    await act(async () => {
      try {
        await result.current.addToCart({
          id: 'xyPoqGJxYR4Nn3yVGQcfI',
          colorCode: '1',
          storageCode: '1',
        });
      } catch (e) {
        console.error("API Error handling.");
      }
    });
  
    await waitFor(() => {
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBeInstanceOf(Error);
      expect(result.current.error.message).toBe('Network error');
    });
  });
});
