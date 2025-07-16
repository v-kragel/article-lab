export const REQUEST = {
  REQUEST_ID_TOKEN: "requestId",
  REQUEST_ID_HEADER: "x-request-id",
} as const;

export const REQUEST_LOG_EVENTS = {
  START: "request_start",
  SUCCESS: "request_success",
  ERROR: "request_error",
} as const;

export const REQUEST_LOG_MESSAGES = {
  START: "=== Incoming request ===",
  SUCCESS: "=== Request completed ===",
  ERROR: "=== Request failed ===",
} as const;
