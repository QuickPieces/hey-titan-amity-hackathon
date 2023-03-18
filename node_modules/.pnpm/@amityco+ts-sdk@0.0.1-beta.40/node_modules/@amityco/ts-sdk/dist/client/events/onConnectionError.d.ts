import { ASCError } from '~/core/errors';
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
export declare const onConnectionError: (callback: Amity.Listener<ASCError>) => Amity.Unsubscriber;
//# sourceMappingURL=onConnectionError.d.ts.map