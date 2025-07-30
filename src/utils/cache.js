const EXPIRATION_TIME = 1000 * 60 * 60;

export function saveToCache(key, data) {
  const cache = {
    data,
    timestamp: Date.now(),
  };
  localStorage.setItem(key, JSON.stringify(cache));
}

export function loadFromCache(key) {
  const item = localStorage.getItem(key);
  if (!item) return null;

  try {
    const cache = JSON.parse(item);
    const now = Date.now();

    if (now - cache.timestamp > EXPIRATION_TIME) {
      localStorage.removeItem(key);
      return null;
    }

    return cache.data;
  } catch {
    localStorage.removeItem(key);
    return null;
  }
}
