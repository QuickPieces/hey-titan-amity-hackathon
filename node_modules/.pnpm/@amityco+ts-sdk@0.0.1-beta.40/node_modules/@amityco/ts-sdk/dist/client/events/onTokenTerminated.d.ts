/**
 *
 * Fired when any {@link Amity.Client} session state has terminated
 *
 * @param callback The function to call when the event was fired
 * @returns an {@link Amity.Unsubscriber} function to stop listening
 *
 * @category private
 */
export declare const onTokenTerminated: (callback: Amity.Listener<Amity.SessionStates.TERMINATED>) => Amity.Unsubscriber;
//# sourceMappingURL=onTokenTerminated.d.ts.map