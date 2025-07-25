export class ResponseWrapperDto<T> {
  statusCode: number;
  data: T;
  requestId: string;
  timestamp: string;
  path: string;
}
