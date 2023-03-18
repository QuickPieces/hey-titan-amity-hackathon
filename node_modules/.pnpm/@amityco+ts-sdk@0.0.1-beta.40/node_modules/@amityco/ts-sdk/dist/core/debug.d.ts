import debug from 'debug';
/**
 * Creates a pre-configured logger instance
 *
 * @param session The name of the debug session
 * @returns A pre-configured logger function
 *
 * @category Debug
 * @hidden
 */
export declare const createLogger: (session?: string) => {
    (topic: string, ...args: any[]): void;
    __instance__: debug.Debugger;
};
//# sourceMappingURL=debug.d.ts.map