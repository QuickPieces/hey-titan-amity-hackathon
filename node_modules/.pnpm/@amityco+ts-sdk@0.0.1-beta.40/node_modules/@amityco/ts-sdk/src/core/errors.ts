/* eslint-disable max-classes-per-file */
/**
 * Generic ASC error
 * @category Errors
 */
export class ASCError extends Error {
  readonly type: string = 'ASC';

  readonly timestamp: number = Date.now();

  /**
   * @param message A custom error message
   * @param code A normalized error code
   * @param level A normalized failure level descriptor
   */
  constructor(
    message: string,
    public readonly code: Amity.ErrorCode,
    public readonly level: Amity.ErrorLevel,
  ) {
    super(`Amity SDK (${code}): ${message}`);

    if (Error.captureStackTrace) Error.captureStackTrace(this, ASCError);
  }
}

/**
 * API level error
 * @category Errors
 */
export class ASCApiError extends ASCError {
  /**
   * @param code A normalized error code
   * @param level A normalized failure level descriptor
   */
  // eslint-disable-next-line no-useless-constructor
  constructor(message: string, code: Amity.ErrorCode, level: Amity.ErrorLevel) {
    super(message, code, level);
  }
}

/**
 * Unexpected error
 * @category Errors
 */
export class ASCUnknownError extends ASCError {
  /**
   * @param code A normalized error code
   * @param level A normalized failure level descriptor
   */
  constructor(
    code: Amity.ErrorCode = Amity.ClientError.UNKNOWN_ERROR,
    level: Amity.ErrorLevel = Amity.ErrorLevel.FATAL,
  ) {
    super('Unexpected error', code, level);
  }
}

/**
 * Network related error
 * @category Errors
 */
export class ASCConnectionError extends ASCError {
  /**
   * @param message A custom error message
   */
  constructor(public readonly event: string, message = 'SDK client is having connection issues') {
    super(
      `${message} (${event})`,
      event === 'disconnected'
        ? Amity.ClientError.DISCONNECTED
        : Amity.ClientError.CONNECTION_ERROR,
      Amity.ErrorLevel.ERROR,
    );
  }
}

/**
 * Input sanitization related error
 * @category Errors
 */
export class ASCInvalidParameterError extends ASCError {
  /**
   * @param message A custom error message
   */
  constructor(message: string) {
    super(message, Amity.ClientError.INVALID_PARAMETERS, Amity.ErrorLevel.ERROR);
  }
}
