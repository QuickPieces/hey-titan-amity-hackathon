/**
 * ```js
 * import { snipeFromCollection } from '@amityco/ts-sdk'
 * const user = snipeFromCollection("user", "foobar")
 * ```
 *
 * Removes a {@link Amity.Model} object from  matching a given
 * {@link Amity.CacheKey}. The cache entry is not typed, so the
 * expected returned type must be passed manually.
 *
 * @param domain the key matching the object to retrieve from cache
 * @param id the key matching the object to retrieve from cache
 * @returns a success boolean if the id was removed from all matching collections
 *
 * @category Cache API
 */
export declare const snipeIdFromCollections: (domain: Amity.Domain, id: string) => boolean;
//# sourceMappingURL=snipeIdFromCollection.d.ts.map