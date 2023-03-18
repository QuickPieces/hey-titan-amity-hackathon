/**
 * ```js
 * import { onSubChannelDeleted } from '@amityco/ts-sdk'
 * const dispose = onSubChannelDeleted(subChannel => {
 *   // ...
 * })
 * ```
 *
 * Fired when any {@link Amity.SubChannel} have been deleted
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category Channel Events
 */
export declare const onSubChannelDeleted: (callback: Amity.Listener<Amity.SubChannel>) => () => void;
//# sourceMappingURL=onSubChannelDeleted.d.ts.map