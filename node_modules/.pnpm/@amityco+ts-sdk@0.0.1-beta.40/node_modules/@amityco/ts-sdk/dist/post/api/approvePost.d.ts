/**
 * ```js
 * import { approvePost } from '@amityco/ts-sdk'
 *
 * const { data: post } = await approvePost('postId')
 * ```
 *
 * Approves a {@link Amity.Post}
 *
 * @param postId The {@link Amity.Post} ID to be approved
 * @return A {@link Amity.Post} that was approved
 *
 * @category Post API
 * @async
 */
export declare const approvePost: (postId: Amity.Post['postId']) => Promise<Amity.Cached<Amity.Post>>;
//# sourceMappingURL=approvePost.d.ts.map