/**
 * ```js
 * import { closePoll } from '@amityco/ts-sdk'
 * const updated = await closePoll(pollId)
 * ```
 *
 * Updates an {@link Amity.Poll}
 *
 * @param pollId The ID of the {@link Amity.Poll} to close
 * @returns the updated {@link Amity.Poll} object
 *
 * @category Poll API
 * @async
 */
export declare const closePoll: (pollId: Amity.Poll['pollId']) => Promise<Amity.Cached<Amity.Poll>>;
//# sourceMappingURL=closePoll.d.ts.map