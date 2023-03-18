import { getActiveClient } from '~/client/api/activeClient';

import { createEventSubscriber } from '~/core/events';

/**
 * ```js
 * import { onTokenExpired } from '@amityco/ts-sdk'
 * const dispose = onTokenExpired((state: Amity.SessionStates.TOKEN_EXPIRED) => {
 *   // ...
 * })
 * ```
 *
 * Fired when any {@link Amity.Client} session state has expired
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category private
 */
export const onTokenExpired = (
  callback: Amity.Listener<Amity.SessionStates.TOKEN_EXPIRED>,
): Amity.Unsubscriber => {
  const client = getActiveClient();

  return createEventSubscriber(client, `client/onTokenExpired`, 'tokenExpired', callback);
};
