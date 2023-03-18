import { getActiveClient } from '~/client/api';
import { createEventSubscriber } from '~/core/events';

import { ingestInCache } from '~/cache/api/ingestInCache';

/**
 * ```js
 * import { onPollDeleted } from '@amityco/ts-sdk'
 * const dispose = onPollDeleted(poll => {
 *   // ...
 * })
 * ```
 *
 * Fired when an {@link Amity.Poll} has been deleted
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Poll Events
 */
export const onPollDeleted = (callback: Amity.Listener<Amity.Poll>): Amity.Unsubscriber => {
  const client = getActiveClient();

  const filter = (payload: Amity.Events['poll.deleted']) => {
    if (client.cache) ingestInCache(payload);

    callback(payload.polls[0]);
  };

  return createEventSubscriber(client, 'poll/onPollDeleted', 'poll.deleted', filter);
};
