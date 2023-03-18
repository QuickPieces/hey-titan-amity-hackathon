import { getActiveClient } from '~/client/api/activeClient';

/**
 * ```js
 * import { disableCache } from '@amityco/ts-sdk'
 * disableCache()
 * ```
 *
 * Wipes the existing {@link Amity.Cache} object attached to
 * an {@link Amity.Client} instance
 *
 * @category Cache API
 */
export const disableCache = () => {
  const client = getActiveClient();

  if (!client.cache) return;
  client.log('cache/api/disableCache');

  // we do this so that testing if cache is enabled
  // is only `if (client.cache)
  delete client.cache;
};
