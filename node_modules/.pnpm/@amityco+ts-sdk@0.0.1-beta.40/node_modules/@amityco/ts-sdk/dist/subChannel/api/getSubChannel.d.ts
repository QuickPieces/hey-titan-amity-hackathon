/**
 * ```js
 * import { getSubChannel } from '@amityco/ts-sdk'
 * const subChannel = await getSubChannel('foobar')
 * ```
 *
 * Fetches a {@link Amity.SubChannel} object
 *
 * @param subChannelId the ID of the {@link Amity.SubChannel} to fetch
 * @returns the associated {@link Amity.SubChannel} object
 *
 * @category Channel API
 * @async
 */
export declare const getSubChannel: {
    (subChannelId: Amity.SubChannel['subChannelId']): Promise<Amity.Cached<Amity.SubChannel>>;
    /**
     * ```js
     * import { getSubChannel } from '@amityco/ts-sdk'
     * const subChannel = getSubChannel.locally('foobar')
     * ```
     *
     * Fetches a {@link Amity.SubChannel} object from cache
     *
     * @param subChannelId the ID of the {@link Amity.SubChannel} to fetch
     * @returns the associated {@link Amity.SubChannel} object
     *
     * @category Channel API
     */
    locally(subChannelId: Amity.SubChannel['subChannelId']): Amity.Cached<Amity.SubChannel> | undefined;
};
//# sourceMappingURL=getSubChannel.d.ts.map