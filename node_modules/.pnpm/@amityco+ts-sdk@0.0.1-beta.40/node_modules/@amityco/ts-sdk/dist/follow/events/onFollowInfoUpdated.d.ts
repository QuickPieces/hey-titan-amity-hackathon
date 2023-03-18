/**
 * ```js
 * import { onFollowInfoUpdated } from '@amityco/ts-sdk'
 * const dispose = onFollowInfoUpdated(followInfo => {
 *   // ...
 * })
 * ```
 *
 * Fired when a {@link Amity.FollowInfo} has been updated
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Follow Events
 */
export declare const onFollowInfoUpdated: (callback: Amity.Listener<Amity.FollowInfo>) => Amity.Unsubscriber;
//# sourceMappingURL=onFollowInfoUpdated.d.ts.map