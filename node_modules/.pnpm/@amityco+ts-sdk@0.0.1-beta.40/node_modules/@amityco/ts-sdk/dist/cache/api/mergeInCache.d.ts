/**
 * ```js
 * import { mergeInCache } from '@amityco/ts-sdk'
 *
 * mergeInCache(
 *   ["foo", "bar"],
 *   (oldVal) => ({ ...oldVal, ...newVal }).
 * )
 * ```
 *
 * Merges a new {@link Amity.Cache} object to an {@link Amity.Client} instance
 *
 * @param key the key matching the object to retrieve from cache
 * @param mutation either a plain object to shallow merge, or a function.
 * @returns a success boolean if the object was updated
 *
 * @category Cache API
 */
export declare const mergeInCache: <T extends Record<string, unknown>>(key: Amity.CacheKey, mutation: Partial<T> | ((oldVal: T) => T), options?: Amity.CacheOptions) => boolean;
//# sourceMappingURL=mergeInCache.d.ts.map