import { onConnectionError } from './onConnectionError';

/**
 * ```js
 * import { onClientDisconnected } from '@amityco/ts-sdk'
 * const dispose = onClientDisconnected(() => {
 *   // ...
 * })
 * ```
 *
 * Fired when any {@link Amity.Client} have been disconnected
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Client Events
 */
export const onClientDisconnected = (callback: Amity.Listener<void>): Amity.Unsubscriber => {
  return onConnectionError(({ code }) => {
    code === Amity.ClientError.DISCONNECTED && callback();
  });
};
