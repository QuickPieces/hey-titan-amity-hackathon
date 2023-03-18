import { getActiveClient } from '~/client/api/activeClient';

import { queryCache, mergeInCache, dropFromCache } from '.';

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
export const snipeIdFromCollections = (domain: Amity.Domain, id: string) => {
  const { log, cache } = getActiveClient();

  if (!cache) return false;
  log('cache/api/snipeFromCollections', { domain, id });

  const entries = (queryCache<unknown[]>([domain, 'query']) ?? []).filter(entry =>
    entry?.data.includes(id),
  );

  if (!entries.length) return false;

  const toBeDeleted: Amity.CacheKey[] = [];

  entries.forEach(({ key }) => {
    // @ts-ignore
    mergeInCache<unknown[]>(key, oldVal => {
      const newVal = oldVal.filter(itemId => itemId !== id);

      if (!newVal.length) toBeDeleted.push(key);

      return newVal;
    });
  });

  toBeDeleted.forEach(key => dropFromCache(key, true));
  return true;
};
