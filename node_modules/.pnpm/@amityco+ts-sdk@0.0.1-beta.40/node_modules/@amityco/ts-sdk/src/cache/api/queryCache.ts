import { getActiveClient } from '~/client/api/activeClient';

import { decodeKey, partialMatch } from '../utils';

/**
 * ```js
 * import { queryCache } from '@amityco/ts-sdk'
 * const entries = queryCache(["user"])
 * ```
 *
 * Retrieves a list of {@link Amity.CacheEntry} objects matching a
 * partial {@link Amity.CacheKey}. The cache entries can't be typed,
 * but the expected returned type can be passed manually.
 *
 * @param partialKey the partial key matching the objects to retrieve from cache
 * @returns the matching cache entries, or empty array.
 *
 * @category Cache API
 */
export const queryCache = <T extends unknown>(
  key: Amity.CacheKey,
): Amity.CacheEntry<T>[] | undefined => {
  const { log, cache } = getActiveClient();

  if (!cache) return;
  log('cache/api/queryCache', { key });

  return Object.keys(cache.data)
    .filter(stringKey => {
      const decodedKey = decodeKey(stringKey);
      return partialMatch(key, decodedKey);
    })
    .map(stringKey => cache.data[stringKey]) as Amity.CacheEntry<T>[];
};
