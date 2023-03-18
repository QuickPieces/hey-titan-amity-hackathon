/**
 * ```js
 * import { leaveChannel } from '@amityco/ts-sdk'
 * const isLeft = await leaveChannel('foobar')
 * ```
 *
 * Leave a {@link Amity.Channel} object
 *
 * @param channelId the {@link Amity.Channel} to leave
 * @returns A success boolean if the {@link Amity.Channel} was left
 *
 * @category Channel API
 * @async
 */
export declare const leaveChannel: (channelId: Amity.Channel['channelId']) => Promise<boolean>;
//# sourceMappingURL=leaveChannel.d.ts.map