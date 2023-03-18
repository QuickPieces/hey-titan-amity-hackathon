import debug from 'debug';

import { isProduction } from '~/utils/env';

/**
 * Creates a pre-configured logger instance
 *
 * @param session The name of the debug session
 * @returns A pre-configured logger function
 *
 * @category Debug
 * @hidden
 */
export const createLogger = (session?: string) => {
  const active = `${session?.trim()}`.length > 0 && !isProduction;

  const logger = debug(session!);

  const print = (topic: string, ...args: any[]) => {
    active && logger(topic, args);
  };

  // eslint-disable-next-line no-underscore-dangle
  print.__instance__ = logger;
  return print;
};
