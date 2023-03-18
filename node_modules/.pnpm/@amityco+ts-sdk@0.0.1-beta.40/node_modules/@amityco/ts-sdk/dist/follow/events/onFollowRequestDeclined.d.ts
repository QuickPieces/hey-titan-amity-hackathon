/**
 * ```js
 * import { onFollowRequestDeclined } from '@amityco/ts-sdk'
 * const dispose = onFollowRequestDeclined(status => {
 *   // ...
 * })
 * ```
 *
 * Fired when a follow request has been declined
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Follow Events
 */
export declare const onFollowRequestDeclined: (callback: Amity.Listener<Amity.FollowStatus>) => Amity.Unsubscriber;
//# sourceMappingURL=onFollowRequestDeclined.d.ts.map