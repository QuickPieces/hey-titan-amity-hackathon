import { queryFollows } from './utils';

/**
 * ```js
 * import { queryFollowings } from '@amityco/ts-sdk'
 * const { data: followings, prevPage, nextPage } = await queryFollowings({ userId })
 * ```
 *
 * Queries a paginable list of {@link Amity.FollowStatus}
 *
 * @param query The query parameters
 * @returns followings
 *
 * @category Follow API
 * @async
 */
export const queryFollowings = async (
  query: Amity.QueryFollowings,
): Promise<Amity.Cached<Amity.Paged<Amity.FollowStatus, Amity.PageRaw>>> =>
  queryFollows('following', query);

/**
 * ```js
 * import { queryFollowings } from '@amityco/ts-sdk'
 * const { data: followings, prevPage, nextPage } = queryFollowings.locally({ userId })
 * ```
 *
 * Queries a paginable list of {@link Amity.FollowStatus} objects from cache
 *
 * @param query The query parameters
 * @returns followings
 *
 * @category Post API
 */
queryFollowings.locally = (
  query: Parameters<typeof queryFollowings>[0],
): Amity.Cached<Amity.Paged<Amity.FollowStatus, Amity.PageRaw>> | undefined =>
  queryFollows.locally('following', query);
