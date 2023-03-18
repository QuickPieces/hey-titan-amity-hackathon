/**
 * ```js
 * import { onPollUpdated } from '@amityco/ts-sdk'
 * const dispose = onPollUpdated(poll => {
 *   // ...
 * })
 * ```
 *
 * Fired when an {@link Amity.Poll} has been updated
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Poll Events
 */
export declare const onPollUpdated: (callback: Amity.Listener<Amity.Poll>) => Amity.Unsubscriber;
//# sourceMappingURL=onPollUpdated.d.ts.map