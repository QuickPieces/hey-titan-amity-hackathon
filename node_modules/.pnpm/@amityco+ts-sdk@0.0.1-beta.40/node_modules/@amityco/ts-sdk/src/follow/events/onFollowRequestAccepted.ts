import { createFollowEventSubscriber } from './utils';

/**
 * ```js
 * import { onFollowRequestAccepted } from '@amityco/ts-sdk'
 * const dispose = onFollowRequestAccepted(status => {
 *   // ...
 * })
 * ```
 *
 * Fired when a follow request has been accepted
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Follow Events
 */
export const onFollowRequestAccepted = (
  callback: Amity.Listener<Amity.FollowStatus>,
): Amity.Unsubscriber => createFollowEventSubscriber('follow.accepted', callback);
