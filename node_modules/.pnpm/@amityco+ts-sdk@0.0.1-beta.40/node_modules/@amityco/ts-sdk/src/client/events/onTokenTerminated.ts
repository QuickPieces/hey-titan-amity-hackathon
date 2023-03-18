import { getActiveClient } from '~/client/api/activeClient';

import { createEventSubscriber } from '~/core/events';

/**
 *
 * Fired when any {@link Amity.Client} session state has terminated
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category private
 */
export const onTokenTerminated = (
  callback: Amity.Listener<Amity.SessionStates.TERMINATED>,
): Amity.Unsubscriber => {
  const client = getActiveClient();

  return createEventSubscriber(client, `client/onTokenTerminated`, 'tokenTerminated', callback);
};
