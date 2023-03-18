/**
 * ```js
 * import { getPoll } from '@amityco/ts-sdk'
 * const poll = await getPoll('foobar')
 * ```
 *
 * Fetches a {@link Amity.Poll} object
 *
 * @param pollId the ID of the {@link Amity.Poll} to fetch
 * @returns the associated {@link Amity.Poll} object
 *
 * @category Poll API
 * @async
 */
export declare const getPoll: {
    (pollId: Amity.Poll['pollId']): Promise<Amity.Cached<Amity.Poll>>;
    /**
     * ```js
     * import { getPoll } from '@amityco/ts-sdk'
     * const poll = getPoll.locally('foobar')
     * ```
     *
     * Fetches a {@link Amity.Poll} object
     *
     * @param pollId the ID of the {@link Amity.Poll} to fetch
     * @returns the associated {@link Amity.Poll} object
     *
     * @category Poll API
     */
    locally(pollId: Amity.Poll['pollId']): Amity.Cached<Amity.Poll> | undefined;
};
//# sourceMappingURL=getPoll.d.ts.map