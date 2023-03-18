/**
 * ```js
 * import { onFollowerDeleted } from '@amityco/ts-sdk'
 * const dispose = onFollowerDeleted(status => {
 *   // ...
 * })
 * ```
 *
 * Fired when a follower has been deleted
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Follow Events
 */
export declare const onFollowerDeleted: (callback: Amity.Listener<Amity.FollowStatus>) => Amity.Unsubscriber;
//# sourceMappingURL=onFollowerDeleted.d.ts.map