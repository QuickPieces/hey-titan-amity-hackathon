/**
 * ```js
 * import { pushToTombstone } from '@amityco/ts-sdk'
 * pushToTombstone(["message", "messageId"], { cachedAt: Date.now() })
 * ```
 *
 * Removes an existing {@link Amity.CacheEntry} from the {@link Amity.Client}'s
 * {@link Amity.Cache} from a given {@link Amity.CacheKey}
 *
 * @param model the model to remove and push to Tombstone
 * @param modelId the related model id
 *
 * @category Cache API
 * @hidden
 */
export declare const pushToTombstone: (model: Amity.Domain, modelId: string) => void;
//# sourceMappingURL=pushToTombstone.d.ts.map