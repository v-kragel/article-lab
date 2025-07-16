import { REQUEST } from "@app/constants";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request } from "express";
import { PinoLogger } from "nestjs-pino";
import { Observable, tap } from "rxjs";

@Injectable()
export class RequestLoggingInterceptor implements NestInterceptor {
  constructor(private readonly logger: PinoLogger) {}

  intercept(
    context: ExecutionContext,
    next: CallHandler<any>,
  ): Observable<any> | Promise<Observable<any>> {
    const req = context.switchToHttp().getRequest<Request>();

    const requestId = req[REQUEST.REQUEST_ID_TOKEN] ?? "unknown";
    const method = req.method;
    const url = req.url;

    this.logger.info(`--------------- [START REQUEST ${method} ${url}] ---------------`);
    this.logger.info({ requestId, method, url }, "Request started");

    const now = Date.now();

    return next.handle().pipe(
      tap(() => {
        const duration = Date.now() - now;

        this.logger.info({ duration }, "Request completed");
        this.logger.info(`--------------- [END REQUEST ${method} ${url}] ---------------`);
      }),
    );
  }
}
