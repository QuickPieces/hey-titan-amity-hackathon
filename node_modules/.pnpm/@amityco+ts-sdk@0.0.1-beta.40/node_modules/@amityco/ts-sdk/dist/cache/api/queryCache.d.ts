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
export declare const queryCache: <T extends unknown>(key: Amity.CacheKey) => Amity.CacheEntry<T>[] | undefined;
//# sourceMappingURL=queryCache.d.ts.map