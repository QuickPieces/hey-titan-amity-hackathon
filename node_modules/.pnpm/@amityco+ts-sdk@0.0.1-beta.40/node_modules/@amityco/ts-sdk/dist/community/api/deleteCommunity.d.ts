/**
 * ```js
 * import { deleteCommunity } from '@amityco/ts-sdk'
 * const success = await deleteCommunity('foobar')
 * ```
 *
 * Deletes a {@link Amity.Community}
 *
 * @param communityId The {@link Amity.Community} ID to delete
 * @return A success boolean if the {@link Amity.Community} was deleted
 *
 * @category Community API
 * @async
 */
export declare const deleteCommunity: (communityId: Amity.Community['communityId']) => Promise<Amity.Community>;
//# sourceMappingURL=deleteCommunity.d.ts.map