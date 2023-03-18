/**
 * ```js
 * import { onUserFollowed } from '@amityco/ts-sdk'
 * const dispose = onUserFollowed(status => {
 *   // ...
 * })
 * ```
 *
 * Fired when a user follows another users and confirmation is not required
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Follow Events
 */
export declare const onUserFollowed: (callback: Amity.Listener<Amity.FollowStatus>) => Amity.Unsubscriber;
//# sourceMappingURL=onUserFollowed.d.ts.map