import { getActiveClient } from '~/client/api/activeClient';

import { createEventSubscriber } from '~/core/events';

/**
 * ```js
 * import { onClientBanned } from '@amityco/ts-sdk'
 * const dispose = onClientBanned(() => {
 *   // ...
 * })
 * ```
 *
 * Fired when any {@link Amity.Client} have been banned from the platform
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Client Events
 */
export const onClientBanned = (callback: Amity.Listener<Amity.UserPayload>): Amity.Unsubscriber => {
  const client = getActiveClient();

  return createEventSubscriber(
    client,
    `client/onConnectionError(user.didGlobalBan)`,
    'user.didGlobalBan',
    callback,
  );
};
