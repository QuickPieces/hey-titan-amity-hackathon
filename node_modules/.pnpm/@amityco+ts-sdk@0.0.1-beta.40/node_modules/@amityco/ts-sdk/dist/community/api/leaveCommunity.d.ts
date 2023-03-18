/**
 * ```js
 * import { leaveCommunity } from '@amityco/ts-sdk'
 * const isLeft = await leaveCommunity('foobar')
 * ```
 *
 * Leaves a {@link Amity.Community} object
 *
 * @param communityId the {@link Amity.Community} to leave
 * @returns A success boolean if {@link Amity.Community} was left
 *
 * @category Community API
 * @async
 */
export declare const leaveCommunity: (communityId: Amity.Community['communityId']) => Promise<boolean>;
//# sourceMappingURL=leaveCommunity.d.ts.map