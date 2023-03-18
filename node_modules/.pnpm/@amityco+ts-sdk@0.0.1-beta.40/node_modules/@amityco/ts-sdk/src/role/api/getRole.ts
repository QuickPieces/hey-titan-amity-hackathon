import { getActiveClient } from '~/client/api';

import { pullFromCache } from '~/cache/api';
import { ingestInCache } from '~/cache/api/ingestInCache';

/**
 * ```js
 * import { getRole } from '@amityco/ts-sdk'
 * const role = await getRole('foobar')
 * ```
 *
 * Fetches a {@link Amity.Role} object
 *
 * @param roleId the ID of the {@link Amity.Role} to fetch
 * @returns the associated {@link Amity.Role} object
 *
 * @category Role API
 * @async
 */
export const getRole = async (roleId: Amity.Role['roleId']): Promise<Amity.Cached<Amity.Role>> => {
  const client = getActiveClient();
  client.log('role/getRole', roleId);

  const { data } = await client.http.get<Amity.Role[]>(`/api/v3/roles/${roleId}`);

  const cachedAt = client.cache && Date.now();
  if (client.cache) ingestInCache({ roles: data }, { cachedAt });

  return {
    data: data.find(role => role.roleId === roleId)!,
    cachedAt,
  };
};

/**
 * ```js
 * import { getRole } from '@amityco/ts-sdk'
 * const role = getRole.locally('foobar')
 * ```
 *
 * Fetches a {@link Amity.Role} object from cache
 *
 * @param roleId the ID of the {@link Amity.Role} to fetch
 * @returns the associated {@link Amity.Role} object
 *
 * @category Role API
 */
getRole.locally = (roleId: Amity.Role['roleId']): Amity.Cached<Amity.Role> | undefined => {
  const client = getActiveClient();
  client.log('role/getRole.locally', roleId);

  if (!client.cache) return;

  const cached = pullFromCache<Amity.Role>(['role', 'get', roleId]);

  if (!cached) return;

  return {
    data: cached.data,
    cachedAt: cached.cachedAt,
  };
};
