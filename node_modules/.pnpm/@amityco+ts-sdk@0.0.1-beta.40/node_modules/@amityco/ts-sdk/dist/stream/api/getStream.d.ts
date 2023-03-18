/**
 * ```js
 * import { getStream } from '@amityco/ts-sdk'
 * const stream = await getStream('foobar')
 * ```
 *
 * Fetches a {@link Amity.Stream} object
 *
 * @param streamId the ID of the {@link Amity.Stream} to fetch
 * @returns the associated {@link Amity.Stream} object
 *
 * @category Stream API
 * @async
 */
export declare const getStream: {
    (streamId: Amity.Stream['streamId']): Promise<Amity.Cached<Amity.Stream>>;
    /**
     * ```js
     * import { getStream } from '@amityco/ts-sdk'
     * const stream = getStream.locally('foobar')
     * ```
     *
     * Fetches a {@link Amity.Stream} object
     *
     * @param streamId the ID of the {@link Amity.Stream} to fetch
     * @returns the associated {@link Amity.Stream} object
     *
     * @category Stream API
     */
    locally(streamId: Amity.Stream['streamId']): Amity.Cached<Amity.Stream> | undefined;
};
//# sourceMappingURL=getStream.d.ts.map