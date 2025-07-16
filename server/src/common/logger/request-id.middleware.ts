import { REQUEST } from "@app/constants";
import { Injectable, NestMiddleware } from "@nestjs/common";
import { NextFunction, Request, Response } from "express";
import { randomUUID } from "node:crypto";

@Injectable()
export class RequestIdMiddleware implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction): void {
    const requestId = (req.headers[REQUEST.REQUEST_ID_HEADER] as string) || randomUUID();

    req[REQUEST.REQUEST_ID_TOKEN] = requestId;

    next();
  }
}
