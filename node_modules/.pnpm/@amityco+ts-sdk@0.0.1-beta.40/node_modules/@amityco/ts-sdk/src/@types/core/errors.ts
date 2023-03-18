export {};

declare global {
  namespace Amity {
    const enum ErrorLevel {
      ERROR = 'error',
      FATAL = 'fatal',
    }

    const enum ServerError {
      BAD_REQUEST = 400000,
      UNAUTHORIZED = 400100,
      PERMISSION_DENIED = 400301,
      ITEM_NOT_FOUND = 400400,
      CONFLICT = 400900,
      FORBIDDEN = 400300,
      USER_IS_MUTED = 400302,
      CHANNEL_IS_MUTED = 400303,
      CHANNEL_BAN = 400304,
      GLOBAL_BAN = 400312,
      NUMBER_OF_MEMBERS_EXCEEDED = 400305,
      MAX_REPETITION_EXCEEDED = 400307,
      BAN_WORD_FOUND = 400308,
      LINK_NOT_ALLOWED = 400309,
      BUSINESS_ERROR = 500000,
    }

    const enum ClientError {
      UNKNOWN_ERROR = 800000,
      INVALID_PARAMETERS = 800110,
      QUERY_IN_PROGRESS = 800170,
      CONNECTION_ERROR = 800210,
      DISCONNECTED = 800211,
      TOKEN_EXPIRED = 800403,
      DISALOOW_UNSYNCED_OBJECT = 800800,
    }

    type ErrorCode = ServerError | ClientError;
  }
}
