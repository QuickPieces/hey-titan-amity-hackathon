import { getActiveClient } from '~/client/api/activeClient';

import { dropFromCache, pushToCache } from '~/cache/api';

import { CACHE_KEY_GET, CACHE_KEY_TOMBSTONE } from '~/cache/utils';

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
export const pushToTombstone = (model: Amity.Domain, modelId: string) => {
  const { log, cache } = getActiveClient();

  const cacheKey = [model, CACHE_KEY_TOMBSTONE, modelId];
  const data: Pick<Amity.CacheOptions, 'cachedAt'> = { cachedAt: Date.now() };

  if (!cache) return;
  log('cache/api/pushToTombstone', { cacheKey, data });

  dropFromCache([model, CACHE_KEY_GET, modelId], true);
  pushToCache(cacheKey, data);
};
