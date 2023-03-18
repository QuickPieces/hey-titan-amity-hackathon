import { getActiveClient } from '~/client/api';
import { createEventSubscriber } from '~/core/events';

import { ingestInCache } from '~/cache/api/ingestInCache';

/**
 * ```js
 * import { onPollUpdated } from '@amityco/ts-sdk'
 * const dispose = onPollUpdated(poll => {
 *   // ...
 * })
 * ```
 *
 * Fired when an {@link Amity.Poll} has been updated
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Poll Events
 */
export const onPollUpdated = (callback: Amity.Listener<Amity.Poll>): Amity.Unsubscriber => {
  const client = getActiveClient();

  const filter = (payload: Amity.Events['poll.updated']) => {
    if (client.cache) ingestInCache(payload);

    callback(payload.polls[0]);
  };

  return createEventSubscriber(client, 'poll/onPollUpdated', 'poll.updated', filter);
};
