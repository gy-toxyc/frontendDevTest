import { renderHook, waitFor } from '@testing-library/react';
import { vi, describe, it, expect, beforeEach } from 'vitest';

import { useProduct } from '../src/hooks/useProduct';
import * as cache from '../src/utils/cache';

vi.mock('../src/utils/cache', async () => {
  const actual = await vi.importActual('../src/utils/cache');
  return {
    ...actual,
    loadFromCache: vi.fn(),
    saveToCache: vi.fn(),
  };
});

const mockProduct = {
  id: 'xyPoqGJxYR4Nn3yVGQcfI',
  name: 'Mock Phone',
  colors: [],
  storages: [],
};

describe('useProduct', () => {
  beforeEach(() => {
    vi.resetAllMocks();
  });

  it('[PRODUCT] Should load product from cache', () => {
    cache.loadFromCache.mockReturnValue(mockProduct);

    const { result } = renderHook(() =>
      useProduct('xyPoqGJxYR4Nn3yVGQcfI')
    );

    expect(result.current.product).toEqual(mockProduct);
    expect(result.current.loading).toBe(false);
    expect(result.current.error).toBe(null);
  });

  it('[PRODUCT] Should fetch product from API when not cached', async () => {
    cache.loadFromCache.mockReturnValue(null);
    cache.saveToCache.mockImplementation(() => {});

    global.fetch = vi.fn().mockResolvedValue({
      json: async () => mockProduct,
    });

    const { result } = renderHook(() =>
      useProduct('xyPoqGJxYR4Nn3yVGQcfI')
    );

    await waitFor(() => {
      expect(result.current.product).toEqual(mockProduct);
      expect(result.current.loading).toBe(false);
      expect(result.current.error).toBe(null);
      expect(cache.saveToCache).toHaveBeenCalledWith(
        'product_xyPoqGJxYR4Nn3yVGQcfI',
        mockProduct
      );
    });
  });
});
