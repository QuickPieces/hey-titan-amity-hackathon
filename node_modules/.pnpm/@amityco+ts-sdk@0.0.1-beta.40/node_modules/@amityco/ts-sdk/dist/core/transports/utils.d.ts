/**
 * Unwraps v3 server payload (for error handling and type extraction)
 *
 * @param response A typical "v3" response (related to backend's service strategy)
 *
 * @returns The data returned by the backend
 * @throws An error related to backend's rejection
 *
 * @category Transport
 * @hidden
 */
export declare const unwrapPayload: <T>(response: Amity.Response<T>) => T;
//# sourceMappingURL=utils.d.ts.map