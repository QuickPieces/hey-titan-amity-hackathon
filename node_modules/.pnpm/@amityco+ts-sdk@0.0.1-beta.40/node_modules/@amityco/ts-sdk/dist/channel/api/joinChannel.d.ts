/**
 * ```js
 * import { joinChannel } from '@amityco/ts-sdk'
 * const isJoined = await joinChannel('foobar')
 * ```
 *
 * Joins a {@link Amity.Channel} object
 *
 * @param channelId the {@link Amity.Channel} to join
 * @returns A success boolean if the {@link Amity.Channel} was joined
 *
 * @category Channel API
 * @async
 */
export declare const joinChannel: (channelId: Amity.Channel['channelId']) => Promise<boolean>;
//# sourceMappingURL=joinChannel.d.ts.map