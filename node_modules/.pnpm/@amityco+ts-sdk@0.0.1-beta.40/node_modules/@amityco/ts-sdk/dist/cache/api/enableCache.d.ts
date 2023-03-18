/**
 * ```js
 * import { enableCache } from '@amityco/ts-sdk'
 * enableCache()
 * ```
 *
 * Adds a new {@link Amity.Cache} object to
 * an {@link Amity.Client} instance
 *
 * @param prevState a previous state of cache instance (useful for SSR)
 * @param persistIf a function to determine if an entry inserted in cache
 * is destined to be also saved in the persistent storage when
 * calling {@link backupCache}
 *
 * @category Cache API
 */
export declare const enableCache: (prevState?: Amity.Cache['data'], persistIf?: Amity.Cache['persistIf']) => void;
//# sourceMappingURL=enableCache.d.ts.map