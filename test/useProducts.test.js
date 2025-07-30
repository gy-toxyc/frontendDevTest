import { renderHook } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { useProducts } from '../src/hooks/useProducts';
import * as cache from '../src/utils/cache';

vi.mock('../src/utils/cache', async () => {
  const actual = await vi.importActual('../src/utils/cache');
  return {
    ...actual,
    loadFromCache: vi.fn(),
    saveToCache: vi.fn()
  };
});

const mockProduct = {
  id: 'xyPoqGJxYR4Nn3yVGQcfI',
  name: 'Mock Phone',
  colors: [],
  storages: []
};

describe('useProducts', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('[PRODUCTS] Should load products from cache', () => {
    cache.loadFromCache.mockReturnValue([mockProduct]);

    const { result } = renderHook(() => useProducts());

    expect(result.current.products).toEqual([mockProduct]);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('[PRODUCTS] Should fetch products from API when not cached', async () => {
    cache.loadFromCache.mockReturnValue(null);
    cache.saveToCache.mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => [mockProduct]
    });

    const { result } = renderHook(() => useProducts());

    await import('@testing-library/react').then(({ waitFor }) =>
      waitFor(() => {
        expect(result.current.products).toEqual([mockProduct]);
        expect(result.current.loading).toBe(false);
        expect(result.current.error).toBe(null);
        expect(cache.saveToCache).toHaveBeenCalledWith('products', [mockProduct]);
      })
    );
  });
});
