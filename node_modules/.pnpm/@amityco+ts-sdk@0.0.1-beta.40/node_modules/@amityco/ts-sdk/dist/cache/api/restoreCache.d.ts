/**
 * ```js
 * import { restoreCache } from '@amityco/ts-sdk'
 * const success = await restoreCache()
 * ```
 *
 * Reads a previously saved {@link Amity.Cache} from a persistent storage,
 * and inserts it into the current {@link Amity.Cache} instance.
 *
 * The strategy for persistent storage will depend on the runtime,
 * which is supported by @react-native-async-storage/async-storage.
 *
 * The current userId will be appended to the given storageKey to ensures
 * the cached data concerns only the current user.
 *
 * @param storageKey the name of the persistent storage
 * @returns a success boolean if the cache was dumped to persistent storage
 *
 * @category Cache API
 */
export declare const restoreCache: (storageKey?: string) => Promise<boolean>;
//# sourceMappingURL=restoreCache.d.ts.map