/// <reference types="socket.io-client" />
/**
 * Creates a pre-configured socket.io instance
 *
 * @param endpoint The socket.io server's URL
 * @returns A pre-configured (non-connected) socket.io client instance
 *
 * @category Transport
 * @hidden
 */
export declare const createWebsocketTransport: (endpoint: string) => SocketIOClient.Socket;
/**
 * Promisify a websocket event emission - resulting in a synchronous http-like XHR (ws legacy)
 *
 * @param client The current client for which to send the event with
 * @param event The websocket event name
 * @param data The event's payload
 *
 * @returns The data returned by the backend
 * @throws An error related to backend's rejection
 *
 * @category Transport
 * @async
 * @hidden
 */
export declare const synchronousWSCall: <T>(client: Amity.Client, event: string, data?: Record<string, unknown>) => Promise<T | undefined>;
//# sourceMappingURL=ws.d.ts.map