/**
 * ```js
 * import { isInTombstone } from '@amityco/ts-sdk'
 * const user = isInTombstone(["message", "messageId"])
 * ```
 *
 * Checks if the {@link Amity.TombstoneCacheOptions} exists
 * in cache and it's not expired means it's in tombstone
 * and we throw an Error
 *
 * @param model the model to check
 * @param modelId the object id to check
 * @returns the matching cache entry, or undefined.
 *
 * @category Cache API
 */
export declare const isInTombstone: (model: Amity.Domain, modelId: string) => void;
//# sourceMappingURL=isInTombstone.d.ts.map