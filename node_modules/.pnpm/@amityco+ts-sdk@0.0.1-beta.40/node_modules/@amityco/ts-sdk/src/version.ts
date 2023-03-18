function getVersion(): string {
  try {
    // the string 'process.env.VERSION' should be replaced by actual value by @rollup/plugin-replace
    return process.env.VERSION!;
  } catch (error) {
    return '__dev__';
  }
}

export const VERSION = getVersion();
