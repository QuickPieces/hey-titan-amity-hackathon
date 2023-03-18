/**
 * ```js
 * import { onClientDisconnected } from '@amityco/ts-sdk'
 * const dispose = onClientDisconnected(() => {
 *   // ...
 * })
 * ```
 *
 * Fired when any {@link Amity.Client} have been disconnected
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Client Events
 */
export declare const onClientDisconnected: (callback: Amity.Listener<void>) => Amity.Unsubscriber;
//# sourceMappingURL=onClientDisconnected.d.ts.map