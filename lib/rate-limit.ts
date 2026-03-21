interface Entry {
  count: number;
  reset: number;
}

// In-memory store - resets on server restart, fine for MVP
const store = new Map<string, Entry>();

// Clean up old entries every 5 minutes to prevent memory leak
setInterval(() => {
  const now = Date.now();
  for (const [key, entry] of store) {
    if (now > entry.reset) store.delete(key);
  }
}, 5 * 60 * 1000);

/**
 * Returns true if the request is allowed.
 * limit: max requests per window
 * windowMs: window size in ms (default 60s)
 */
export function rateLimit(
  identifier: string,
  limit = 5,
  windowMs = 60_000
): { allowed: boolean; remaining: number } {
  const now = Date.now();
  const entry = store.get(identifier);

  if (!entry || now > entry.reset) {
    store.set(identifier, { count: 1, reset: now + windowMs });
    return { allowed: true, remaining: limit - 1 };
  }

  if (entry.count >= limit) {
    return { allowed: false, remaining: 0 };
  }

  entry.count++;
  return { allowed: true, remaining: limit - entry.count };
}
