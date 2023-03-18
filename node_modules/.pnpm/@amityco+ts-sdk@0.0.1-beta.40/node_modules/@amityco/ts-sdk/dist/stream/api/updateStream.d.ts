/**
 * ```js
 * import { updateStream } from '@amityco/ts-sdk'
 * const updated = await updateStream(streamId, { title: 'foobar' })
 * ```
 *
 * Updates an {@link Amity.Stream}
 *
 * @param streamId The ID of the {@link Amity.Stream} to edit
 * @param patch The patch data to apply
 * @returns the updated {@link Amity.Stream} object
 *
 * @category Stream API
 * @async
 */
export declare const updateStream: (streamId: Amity.Stream['streamId'], patch: Patch<Amity.Stream, 'title' | 'thumbnailFileId' | 'description' | 'metadata'>) => Promise<Amity.Cached<Amity.Stream>>;
//# sourceMappingURL=updateStream.d.ts.map