import { getActiveClient } from '~/client/api/activeClient';

import { encodeKey } from '../utils';

/**
 * ```js
 * import { pullFromCache } from '@amityco/ts-sdk'
 * const user = pullFromCache<Amity.User>(["user", "foobar"])
 * ```
 *
 * Retrieves a {@link Amity.CacheEntry} object matching a given
 * {@link Amity.CacheKey}. The cache entry is not typed, so the
 * expected returned type must be passed manually.
 *
 * @param key the key matching the object to retrieve from cache
 * @returns the matching cache entry, or undefined.
 *
 * @category Cache API
 */
export const pullFromCache = <T extends unknown>(
  key: Amity.CacheKey,
): Amity.CacheEntry<T> | undefined => {
  const { log, cache } = getActiveClient();

  if (!cache) return;
  log('cache/api/pullFromCache', key);

  const str = encodeKey(key);

  return cache.data[str] ? (cache.data[str] as Amity.CacheEntry<T>) : undefined;
};
