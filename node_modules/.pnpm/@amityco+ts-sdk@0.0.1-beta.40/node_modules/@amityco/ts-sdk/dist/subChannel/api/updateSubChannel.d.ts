/**
 * ```js
 * import { updateSubChannel } from '@amityco/ts-sdk'
 * const updated = await updateSubChannel(subChannelId, { name: 'foobar' })
 * ```
 *
 * Updates an {@link Amity.SubChannel}
 *
 * @param subChannelId The ID of the {@link Amity.SubChannel} to edit
 * @param patch The patch data to apply
 * @returns the updated {@link Amity.SubChannel} object
 *
 * @category Channel API
 * @async
 */
export declare const updateSubChannel: (subChannelId: Amity.SubChannel['subChannelId'], patch: Patch<Amity.SubChannel, 'displayName'>) => Promise<Amity.Cached<Amity.SubChannel>>;
//# sourceMappingURL=updateSubChannel.d.ts.map