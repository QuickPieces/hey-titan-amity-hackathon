/**
 * ```js
 * import { dropFromCache } from '@amityco/ts-sdk'
 * const success = dropFromCache(['user', 'foobar'])
 * ```
 *
 * Removes an existing {@link Amity.CacheEntry} from the {@link Amity.Client}'s
 * {@link Amity.Cache} from a given {@link Amity.CacheKey}
 *
 * @param key The key of the object to delete
 * @param exact If false, the function will delete all keys satisfying the given key
 * @returns A success boolean if the object was deleted
 *
 * @category Cache API
 */
export declare const dropFromCache: (key: Amity.CacheKey, exact?: boolean) => boolean;
//# sourceMappingURL=dropFromCache.d.ts.map