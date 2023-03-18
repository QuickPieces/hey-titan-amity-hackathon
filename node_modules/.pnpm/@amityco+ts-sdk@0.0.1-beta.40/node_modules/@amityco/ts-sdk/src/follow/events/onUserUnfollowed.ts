import { createFollowEventSubscriber } from './utils';

/**
 * ```js
 * import { onUserUnfollowed } from '@amityco/ts-sdk'
 * const dispose = onUserFollowed(status => {
 *   // ...
 * })
 * ```
 *
 * Fired when a user unfollows
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Follow Events
 */
export const onUserUnfollowed = (
  callback: Amity.Listener<Amity.FollowStatus>,
): Amity.Unsubscriber => createFollowEventSubscriber('follow.unfollowed', callback);
