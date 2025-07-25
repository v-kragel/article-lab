import { REQUEST } from "@app/constants";
import { Injectable, NestMiddleware } from "@nestjs/common";
import type { NextFunction, Request, Response } from "express";
import { RequestContextService } from "./request-context.service";

@Injectable()
export class RequestContextMiddleware implements NestMiddleware {
  constructor(private readonly requestContextService: RequestContextService) {}

  use(req: Request, res: Response, next: NextFunction) {
    const store = new Map<string, any>();

    store.set(REQUEST.REQUEST_ID_TOKEN, req[REQUEST.REQUEST_ID_TOKEN]);

    this.requestContextService.run(() => {
      next();
    }, store);
  }
}
