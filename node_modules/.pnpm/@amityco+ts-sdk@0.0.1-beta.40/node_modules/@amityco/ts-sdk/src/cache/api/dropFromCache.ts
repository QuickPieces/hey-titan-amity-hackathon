import { getActiveClient } from '~/client/api/activeClient';
import { decodeKey, encodeKey, partialMatch } from '../utils';

/**
 * ```js
 * import { dropFromCache } from '@amityco/ts-sdk'
 * const success = dropFromCache(['user', 'foobar'])
 * ```
 *
 * Removes an existing {@link Amity.CacheEntry} from the {@link Amity.Client}'s
 * {@link Amity.Cache} from a given {@link Amity.CacheKey}
 *
 * @param key The key of the object to delete
 * @param exact If false, the function will delete all keys satisfying the given key
 * @returns A success boolean if the object was deleted
 *
 * @category Cache API
 */
export const dropFromCache = (key: Amity.CacheKey, exact = false): boolean => {
  const { log, cache } = getActiveClient();

  if (!cache) return false;
  log('cache/api/dropFromCache', { key, exact });

  if (!exact) {
    return Object.keys(cache.data)
      .map(stringKey => decodeKey(stringKey))
      .filter(candidate => partialMatch(key, candidate))
      .map<boolean>(filteredKey => dropFromCache(filteredKey, true))
      .every(returned => returned);
  }

  const encodedKey = encodeKey(key);

  if (encodedKey in cache.data) {
    delete cache.data[encodedKey];
    return true;
  }

  return false;
};
