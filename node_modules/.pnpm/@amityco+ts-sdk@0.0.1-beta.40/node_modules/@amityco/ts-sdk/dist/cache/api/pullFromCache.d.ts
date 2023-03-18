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
export declare const pullFromCache: <T extends unknown>(key: Amity.CacheKey) => Amity.CacheEntry<T> | undefined;
//# sourceMappingURL=pullFromCache.d.ts.map