/* eslint-disable no-undef */
const theGlobal =
  // eslint-disable-next-line no-nested-ternary
  typeof globalThis === 'object' ? globalThis : typeof global === 'object' ? global : window;

export const { process: safeProcess = {} }: { process: Partial<NodeJS.Process> } = theGlobal;

export function getEnv(): NodeJS.ProcessEnv | undefined {
  return safeProcess.env ?? {};
}

export const isProduction = safeProcess.env?.NODE_ENV === 'production';
