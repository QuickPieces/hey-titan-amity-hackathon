/**
 * ```js
 * import { getCommunities } from '@amityco/ts-sdk'
 * const communities = await getCommunities(['foo', 'bar'])
 * ```
 *
 * Fetches a collection of {@link Amity.Community} objects
 *
 * @param communityIds the IDs of the {@link Amity.Community} to fetch
 * @returns the associated collection of {@link Amity.Community} objects
 *
 * @category Community API
 * @async
 */
export declare const getCommunities: {
    (communityIds: Amity.Community['communityId'][]): Promise<Amity.Cached<Amity.Community[]>>;
    /**
     * ```js
     * import { getCommunities } from '@amityco/ts-sdk'
     * const communities = getCommunities.locally(['foo', 'bar']) ?? []
     * ```
     *
     * Fetches a collection of {@link Amity.Community} objects from cache
     *
     * @param communityIds the IDs of the {@link Amity.Community} to fetch
     * @returns the associated collection of {@link Amity.Community} objects
     *
     * @category Community API
     */
    locally(communityIds: Amity.Community['communityId'][]): Amity.Cached<Amity.Community[]> | undefined;
};
//# sourceMappingURL=getCommunities.d.ts.map