/**
 * ```js
 * import { onPollDeleted } from '@amityco/ts-sdk'
 * const dispose = onPollDeleted(poll => {
 *   // ...
 * })
 * ```
 *
 * Fired when an {@link Amity.Poll} has been deleted
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Poll Events
 */
export declare const onPollDeleted: (callback: Amity.Listener<Amity.Poll>) => Amity.Unsubscriber;
//# sourceMappingURL=onPollDeleted.d.ts.map