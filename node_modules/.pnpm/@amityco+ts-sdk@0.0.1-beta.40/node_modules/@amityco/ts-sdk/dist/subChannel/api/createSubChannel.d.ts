/**
 * ```js
 * import { createSubChannel } from '@amityco/ts-sdk'
 * const created = await createSubChannel({ channelId: 'foobar', name: 'foobar' })
 * ```
 *
 * Creates an {@link Amity.SubChannel}
 *
 * @param bundle The data necessary to create a new {@link Amity.SubChannel}
 * @returns The newly created {@link Amity.SubChannel}
 *
 * @category Channel API
 * @async
 */
export declare const createSubChannel: <T extends Amity.ChannelType>(bundle: Pick<Amity.SubChannel, 'channelId' | 'displayName'>) => Promise<Amity.Cached<Amity.SubChannel>>;
//# sourceMappingURL=createSubChannel.d.ts.map