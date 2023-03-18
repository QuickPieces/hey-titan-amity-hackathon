/**
 * ```js
 * import { onTokenExpired } from '@amityco/ts-sdk'
 * const dispose = onTokenExpired((state: Amity.SessionStates.TOKEN_EXPIRED) => {
 *   // ...
 * })
 * ```
 *
 * Fired when any {@link Amity.Client} session state has expired
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category private
 */
export declare const onTokenExpired: (callback: Amity.Listener<Amity.SessionStates.TOKEN_EXPIRED>) => Amity.Unsubscriber;
//# sourceMappingURL=onTokenExpired.d.ts.map