import { getActiveClient } from '~/client/api/activeClient';

import { ASCApiError } from '~/core/errors';
import { pullFromCache } from '~/cache/api';
import { isFresh, queryOptions } from '~/core/query';
import { CACHE_KEY_TOMBSTONE, CACHE_LIFESPAN_TOMBSTONE } from '~/cache/utils';

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
export const isInTombstone = (model: Amity.Domain, modelId: string) => {
  const { log, cache } = getActiveClient();
  const key = [model, CACHE_KEY_TOMBSTONE, modelId];

  if (!cache) return;
  log('cache/api/isInTombstone', key);

  const isInTombstone = pullFromCache<Amity.TombstoneCacheOptions>(key);
  const { lifeSpan } = queryOptions('cache_then_server', CACHE_LIFESPAN_TOMBSTONE);

  if (isInTombstone && isFresh(isInTombstone.data, lifeSpan)) {
    throw new ASCApiError(
      'Item not found!',
      Amity.ServerError.ITEM_NOT_FOUND,
      Amity.ErrorLevel.ERROR,
    );
  }
};
