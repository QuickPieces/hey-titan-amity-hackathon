/**
 * ```js
 * import { onChannelSubCreated } from '@amityco/ts-sdk'
 * const dispose = onSubChannelCreated(subChannel => {
 *   // ...
 * })
 * ```
 *
 * Fired when any {@link Amity.SubChannel} have been created
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Channel Events
 */
export declare const onSubChannelCreated: (callback: Amity.Listener<Amity.SubChannel>) => Amity.Unsubscriber;
//# sourceMappingURL=onSubChannelCreated.d.ts.map