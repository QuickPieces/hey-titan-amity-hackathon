/**
 * ```js
 * import { wipeCache } from '@amityco/ts-sdk'
 * const success = await wipeCache()
 * ```
 *
 * Wipes a persistent storage for the current {@link Amity.Cache} instance.
 *
 * The strategy for persistent storage will depend on the runtime,
 * which is supported by @react-native-async-storage/async-storage.
 *
 * The current userId will be appended to the given storageKey to avoid
 * collision between multiple client instances over time.
 *
 * @param storageKey the name of the persistent storage
 * @returns a success boolean if the persistent cache was wiped.
 *
 * @category Cache API
 */
export declare const wipeCache: (storageKey?: string) => Promise<boolean>;
//# sourceMappingURL=wipeCache.d.ts.map