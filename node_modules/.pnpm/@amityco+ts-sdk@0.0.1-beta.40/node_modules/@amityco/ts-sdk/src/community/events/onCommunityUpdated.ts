import { createCommunityEventSubscriber } from './utils';

/**
 * ```js
 * import { onCommunityUpdated } from '@amityco/ts-sdk'
 * const dispose = onCommunityUpdated(community => {
 *   // ...
 * })
 * ```
 *
 * Fired when a {@link Amity.Community} has been updated
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Community Events
 */
export const onCommunityUpdated = (callback: Amity.Listener<Amity.Community>) =>
  createCommunityEventSubscriber('community.updated', callback);
