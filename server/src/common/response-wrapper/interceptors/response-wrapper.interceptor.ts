import { REQUEST } from "@app/constants";
import { CallHandler, ExecutionContext, Injectable, NestInterceptor } from "@nestjs/common";
import { Request, Response } from "express";
import { map, Observable } from "rxjs";
import { ResponseWrapperDto } from "../dto/response-wrapper.dto";

@Injectable()
export class ResponseWrapperInterceptor<T>
  implements NestInterceptor<T, ResponseWrapperInterceptor<T>>
{
  intercept(
    context: ExecutionContext,
    next: CallHandler<T>,
  ): Observable<any> | Promise<Observable<any>> {
    const ctx = context.switchToHttp();
    const request = ctx.getRequest<Request>();

    const requestId = request[REQUEST.REQUEST_ID_TOKEN] ?? "unknown";

    return next.handle().pipe(
      map((data) => {
        const wrapped: ResponseWrapperDto<T> = {
          statusCode: ctx.getResponse<Response>().statusCode,
          data,
          requestId,
          timestamp: new Date().toISOString(),
          path: request.originalUrl,
        };

        return wrapped;
      }),
    );
  }
}
