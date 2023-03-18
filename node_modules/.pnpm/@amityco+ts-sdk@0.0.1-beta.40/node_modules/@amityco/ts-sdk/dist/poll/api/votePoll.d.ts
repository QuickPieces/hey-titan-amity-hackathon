/**
 * ```js
 * import { votePoll } from '@amityco/ts-sdk'
 * const voted = await votePoll(pollId)
 * ```
 *
 * Votes for an {@link Amity.Poll}
 *
 * @param pollId The ID of the {@link Amity.Poll} to vote
 * @param answerIds The IDs of the {@link Amity.Poll} answers to vote {@link Amity.Poll}
 * @returns the updated {@link Amity.Poll} object
 *
 * @category Poll API
 * @async
 */
export declare const votePoll: (pollId: Amity.Poll['pollId'], answerIds: string[]) => Promise<Amity.Cached<Amity.Poll>>;
//# sourceMappingURL=votePoll.d.ts.map