/**
 * ```js
 * import { createPoll } from '@amityco/ts-sdk'
 * const created = await createPoll({
 *   question: 'question',
 *   answers: [
 *      { dataType: 'text', data: 'answer1' },
 *      { dataType: 'text', data: 'answer2' },
 *   ],
 *   closedIn: 1649136484
 * }))
 * ```
 *
 * Creates an {@link Amity.Poll}
 *
 * @param bundle The data necessary to create a new {@link Amity.Poll}
 * @returns The newly created {@link Amity.Poll}
 *
 * @category Poll API
 * @async
 */
export declare const createPoll: (bundle: Pick<Amity.Poll, 'question' | 'answerType' | 'closedIn'> & {
    answers: Pick<Amity.PollAnswer, 'dataType' | 'data'>[];
}) => Promise<Amity.Cached<Amity.Poll>>;
//# sourceMappingURL=createPoll.d.ts.map