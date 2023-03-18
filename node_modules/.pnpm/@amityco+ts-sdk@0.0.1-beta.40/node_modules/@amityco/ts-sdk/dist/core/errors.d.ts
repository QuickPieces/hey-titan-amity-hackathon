/**
 * Generic ASC error
 * @category Errors
 */
export declare class ASCError extends Error {
    readonly code: Amity.ErrorCode;
    readonly level: Amity.ErrorLevel;
    readonly type: string;
    readonly timestamp: number;
    /**
     * @param message A custom error message
     * @param code A normalized error code
     * @param level A normalized failure level descriptor
     */
    constructor(message: string, code: Amity.ErrorCode, level: Amity.ErrorLevel);
}
/**
 * API level error
 * @category Errors
 */
export declare class ASCApiError extends ASCError {
    /**
     * @param code A normalized error code
     * @param level A normalized failure level descriptor
     */
    constructor(message: string, code: Amity.ErrorCode, level: Amity.ErrorLevel);
}
/**
 * Unexpected error
 * @category Errors
 */
export declare class ASCUnknownError extends ASCError {
    /**
     * @param code A normalized error code
     * @param level A normalized failure level descriptor
     */
    constructor(code?: Amity.ErrorCode, level?: Amity.ErrorLevel);
}
/**
 * Network related error
 * @category Errors
 */
export declare class ASCConnectionError extends ASCError {
    readonly event: string;
    /**
     * @param message A custom error message
     */
    constructor(event: string, message?: string);
}
/**
 * Input sanitization related error
 * @category Errors
 */
export declare class ASCInvalidParameterError extends ASCError {
    /**
     * @param message A custom error message
     */
    constructor(message: string);
}
//# sourceMappingURL=errors.d.ts.map