// Simple in-memory cache utility
interface CacheEntry {
  data: any
  timestamp: number
}

const cache = new Map<string, CacheEntry>()

export function getCached(key: string, ttlMinutes: number = 5): any | null {
  const entry = cache.get(key)
  if (!entry) return null

  const now = Date.now()
  const age = now - entry.timestamp
  const ttlMs = ttlMinutes * 60 * 1000

  if (age > ttlMs) {
    cache.delete(key)
    return null
  }

  return entry.data
}

export function setCache(key: string, data: any): void {
  cache.set(key, {
    data,
    timestamp: Date.now()
  })
}

export function clearCache(key?: string): void {
  if (key) {
    cache.delete(key)
  } else {
    cache.clear()
  }
}
