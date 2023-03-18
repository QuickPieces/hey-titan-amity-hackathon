import { ASCApiError, ASCUnknownError } from '~/core/errors';

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
export const unwrapPayload = <T>(response: Amity.Response<T>): T => {
  if (response.status === 'success') {
    return response.data;
  }
  if (response.status === 'fail') {
    throw new ASCUnknownError(response.code);
  } else if (response.status === 'error') {
    throw new ASCApiError(response.message, response.code, Amity.ErrorLevel.ERROR);
  }

  // unjust, but helps force uncast "T | undefined" to allow deconstruction without warnings
  return undefined as unknown as T;
};
