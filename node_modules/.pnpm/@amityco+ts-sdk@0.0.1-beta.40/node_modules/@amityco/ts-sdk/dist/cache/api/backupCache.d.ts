/**
 * ```js
 * import { backupCache } from '@amityco/ts-sdk'
 * const success = await backupCache()
 * ```
 *
 * Writes the {@link Amity.Cache} to a persistent storage.
 *
 * The strategy for persistent storage will depend on the runtime,
 * which is supported by @react-native-async-storage/async-storage.
 *
 * The current userId will be appended to the given storageKey to avoid
 * collision between multiple client instances over time.
 *
 * @param storageKey the name of the persistent storage
 * @param persistIf a custom function to define the persistence policy. Default
 * will check the value of {@link Amity.CacheEntry["offline"]}, which can be
 * defined globally when customizing {@link Amity.Cache["persistIf"]}
 * @returns a success boolean if the cache was dumped to persistent storage
 *
 * @category Cache API
 */
export declare const backupCache: (storageKey?: string, persistIf?: (entry: Amity.CacheEntry) => boolean | undefined) => Promise<boolean>;
//# sourceMappingURL=backupCache.d.ts.map