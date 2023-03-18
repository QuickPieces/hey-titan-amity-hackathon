import { getActiveClient } from '~/client/api/activeClient';

import { createEventSubscriber } from '~/core/events';

import { ASCError, ASCConnectionError } from '~/core/errors';

const EVENTS = [
  'disconnected',
  'error',
  'connect_error',
  'reconnect_error',
  'reconnect_failed',
] as const;

/**
 * ```js
 * import { onConnectionError } from '@amityco/ts-sdk'
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
export const onConnectionError = (callback: Amity.Listener<ASCError>): Amity.Unsubscriber => {
  const client = getActiveClient();

  const subscribers = EVENTS.map(event =>
    createEventSubscriber(client, `client/onConnectionError(${event})`, event, response => {
      const error = response?.code
        ? new ASCError(response.message, response.code, Amity.ErrorLevel.FATAL)
        : new ASCConnectionError(event);

      callback(error);
    }),
  );

  return () => {
    subscribers.forEach(fn => fn());
  };
};
