/**
 * ```js
 * import { onFollowRequestCanceled } from '@amityco/ts-sdk'
 * const dispose = onFollowRequestCanceled(status => {
 *   // ...
 * })
 * ```
 *
 * Fired when a follow request has been canceled
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Follow Events
 */
export declare const onFollowRequestCanceled: (callback: Amity.Listener<Amity.FollowStatus>) => Amity.Unsubscriber;
//# sourceMappingURL=onFollowRequestCanceled.d.ts.map