import { queryFollows } from './utils';

/**
 * ```js
 * import { queryFollowers } from '@amityco/ts-sdk'
 * const { data: followers, prevPage, nextPage } = await queryFollowers({ userId })
 * ```
 *
 * Queries a paginable list of {@link Amity.FollowStatus}
 *
 * @param query The query parameters
 * @returns followers
 *
 * @category Follow API
 * @async
 */
export const queryFollowers = async (
  query: Amity.QueryFollowers,
): Promise<Amity.Cached<Amity.Paged<Amity.FollowStatus, Amity.PageRaw>>> =>
  queryFollows('followers', query);

/**
 * ```js
 * import { queryFollowers } from '@amityco/ts-sdk'
 * const { data: followers, prevPage, nextPage } = queryFollowers.locally({ userId })
 * ```
 *
 * Queries a paginable list of {@link Amity.FollowStatus} objects from cache
 *
 * @param query The query parameters
 * @returns followers
 *
 * @category Post API
 */
queryFollowers.locally = (
  query: Parameters<typeof queryFollowers>[0],
): Amity.Cached<Amity.Paged<Amity.FollowStatus, Amity.PageRaw>> | undefined =>
  queryFollows.locally('followers', query);
