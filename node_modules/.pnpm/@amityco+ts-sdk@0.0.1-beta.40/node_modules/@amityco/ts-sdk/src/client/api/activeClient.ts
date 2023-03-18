import { ASCError } from '~/core/errors';

let activeClient: Amity.Client | null = null;

/**
 * Get the active client
 *
 * @returns the active client instance
 *
 * @hidden
 */
export const getActiveClient = () => {
  if (!activeClient) {
    throw new ASCError(
      'There is no active client',
      Amity.ClientError.UNKNOWN_ERROR,
      Amity.ErrorLevel.FATAL,
    );
  }

  return activeClient!;
};

/**
 * Sets the active client
 *
 * @param client the client to assume as currently active client
 *
 * @hidden
 */
export const setActiveClient = (client: Amity.Client) => {
  activeClient = client;
};
