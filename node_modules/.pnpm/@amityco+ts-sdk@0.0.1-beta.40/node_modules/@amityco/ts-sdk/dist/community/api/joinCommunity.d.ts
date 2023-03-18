/**
 * ```js
 * import { joinCommunity } from '@amityco/ts-sdk'
 * const isJoined = await joinCommunity('foobar')
 * ```
 *
 * Joins a {@link Amity.Community} object
 *
 * @param communityId the {@link Amity.Community} to join
 * @returns A success boolean if the {@link Amity.Community} was joined
 *
 * @category Community API
 * @async
 */
export declare const joinCommunity: (communityId: Amity.Community['communityId']) => Promise<boolean>;
//# sourceMappingURL=joinCommunity.d.ts.map