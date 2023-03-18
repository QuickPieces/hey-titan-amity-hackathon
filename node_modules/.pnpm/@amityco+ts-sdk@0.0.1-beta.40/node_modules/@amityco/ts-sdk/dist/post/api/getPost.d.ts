/**
 * ```js
 * import { getPost } from '@amityco/ts-sdk'
 * const { data: post } = await getPost('foobar')
 * ```
 *
 * Fetches a {@link Amity.Post} object
 *
 * @param postId the ID of the {@link Amity.Post} to fetch
 * @returns the associated {@link Amity.Post} object
 *
 * @category Post API
 * @async
 */
export declare const getPost: {
    (postId: Amity.Post['postId']): Promise<Amity.Cached<Amity.Post>>;
    /**
     * ```js
     * import { getPost } from '@amityco/ts-sdk'
     * const { data: post } = getPost.locally('foobar')
     * ```
     *
     * Fetches a {@link Amity.Post} object from cache
     *
     * @param postId the ID of the {@link Amity.Post} to fetch
     * @returns the associated {@link Amity.Post} object
     *
     * @category Post API
     */
    locally(postId: Amity.Post['postId']): Amity.Cached<Amity.Post> | undefined;
};
//# sourceMappingURL=getPost.d.ts.map