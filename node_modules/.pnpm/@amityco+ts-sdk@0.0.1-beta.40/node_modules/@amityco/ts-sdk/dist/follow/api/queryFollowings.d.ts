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
export declare const queryFollowings: {
    (query: Amity.QueryFollowings): Promise<Amity.Cached<Amity.Paged<Amity.FollowStatus, Amity.PageRaw>>>;
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
    locally(query: Parameters<typeof queryFollowings>[0]): Amity.Cached<Amity.Paged<Amity.FollowStatus, Amity.PageRaw>> | undefined;
};
//# sourceMappingURL=queryFollowings.d.ts.map