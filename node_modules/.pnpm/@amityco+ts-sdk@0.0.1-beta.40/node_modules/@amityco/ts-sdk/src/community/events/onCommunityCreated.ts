import { createCommunityEventSubscriber } from './utils';

/**
 * ```js
 * import { onCommunityCreated } from '@amityco/ts-sdk'
 * const dispose = onCommunityCreated(community => {
 *   // ...
 * })
 * ```
 *
 * Fired when a {@link Amity.Community} have been created
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Community Events
 */
export const onCommunityCreated = (callback: Amity.Listener<Amity.Community>) =>
  createCommunityEventSubscriber('community.created', callback);
