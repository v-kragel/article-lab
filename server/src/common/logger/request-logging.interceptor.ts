import { REQUEST, REQUEST_LOG_EVENTS, REQUEST_LOG_MESSAGES } from "@app/constants";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { PinoLogger } from "nestjs-pino";
import { catchError, Observable, tap } from "rxjs";

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {
    this.logger.setContext(RequestLoggingInterceptor.name);
  }

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();

    const requestId = req[REQUEST.REQUEST_ID_TOKEN] ?? "unknown";
    const method = req.method;
    const url = req.url;
    const ip = req.ip;

    const startTime = Date.now();

    this.logger.info(
      { event: REQUEST_LOG_EVENTS.START, requestId, method, url },
      REQUEST_LOG_MESSAGES.START,
    );

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - startTime;

        this.logger.info(
          {
            event: REQUEST_LOG_EVENTS.SUCCESS,
            requestId,
            method,
            url,
            ip,
            duration,
          },
          REQUEST_LOG_MESSAGES.SUCCESS,
        );
      }),
      catchError((err) => {
        const duration = Date.now() - startTime;

        this.logger.error(
          {
            event: REQUEST_LOG_EVENTS.ERROR,
            requestId,
            method,
            url,
            duration,
            ip,
            errorMessage: err.message,
            stack: err.stack,
          },
          REQUEST_LOG_MESSAGES.ERROR,
        );

        throw err;
      }),
    );
  }
}
