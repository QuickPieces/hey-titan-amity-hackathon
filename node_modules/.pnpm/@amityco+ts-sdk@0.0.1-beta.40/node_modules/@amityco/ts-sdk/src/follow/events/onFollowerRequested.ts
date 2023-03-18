import { createFollowEventSubscriber } from './utils';

/**
 * ```js
 * import { onFollowerRequested } from '@amityco/ts-sdk'
 * const dispose = onFollowerRequested(status => {
 *   // ...
 * })
 * ```
 *
 * Fired when a user follows another users and confirmation is required
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Follow Events
 */
export const onFollowerRequested = (
  callback: Amity.Listener<Amity.FollowStatus>,
): Amity.Unsubscriber => createFollowEventSubscriber('follow.requested', callback);
