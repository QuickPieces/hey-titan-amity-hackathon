/**
 * ```js
 * import { onSessionStateChange } from '@amityco/ts-sdk'
 * const dispose = onSessionStateChange((state: Amity.SessionStates) => {
 *   // ...
 * })
 * ```
 *
 * Fired when any {@link Amity.Client} has a session state change
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Client Events
 */
export declare const onSessionStateChange: (callback: Amity.Listener<Amity.SessionStates>) => Amity.Unsubscriber;
//# sourceMappingURL=onSessionStateChange.d.ts.map