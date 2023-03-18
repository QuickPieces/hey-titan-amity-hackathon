/**
 * ```js
 * import { deletePoll } from '@amityco/ts-sdk'
 * const success = await deletePoll(pollId)
 * ```
 *
 * Deletes a {@link Amity.Poll}
 *
 * @param pollId The {@link Amity.Poll} ID to delete
 * @return A success boolean if the {@link Amity.Poll} was deleted
 *
 * @category Poll API
 * @async
 */
export declare const deletePoll: (pollId: Amity.Poll['pollId']) => Promise<boolean>;
//# sourceMappingURL=deletePoll.d.ts.map