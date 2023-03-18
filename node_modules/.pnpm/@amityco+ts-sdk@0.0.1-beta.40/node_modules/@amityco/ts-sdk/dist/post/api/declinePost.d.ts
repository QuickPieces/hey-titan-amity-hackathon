/**
 * ```js
 * import { declinePost } from '@amityco/ts-sdk'
 *
 * const {data: post} = await declinePost('postId')
 * ```
 *
 * Declines a {@link Amity.Post}
 *
 * @param postId The {@link Amity.Post} ID to be declined
 * @return A {@link Amity.Post} that was declined
 *
 * @category Post API
 * @async
 */
export declare const declinePost: (postId: Amity.Post['postId']) => Promise<Amity.Cached<Amity.Post>>;
//# sourceMappingURL=declinePost.d.ts.map