import { REQUEST } from "@app/constants";
import {
  ArgumentsHost,
  BadRequestException,
  Catch,
  ExceptionFilter,
  HttpException,
} from "@nestjs/common";
import { Request, Response } from "express";
import { ErrorResponseDto } from "../dto/error-response.dto";
import { parsePrismaError } from "../utils";

@Catch()
export class GlobalExceptionFilter implements ExceptionFilter {
  catch(exception: unknown, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();
    const requestId = request[REQUEST.REQUEST_ID_TOKEN];

    const timestamp = new Date().toISOString();
    const path = request.url;

    let status = 500;
    let message: string | string[] = "Internal server error";
    let error = "InternalServerError";

    // Prisma
    const prismaParsed = parsePrismaError(exception);
    if (prismaParsed) {
      status = prismaParsed.statusCode;
      message = prismaParsed.message;
      error = "PrismaError";
    }

    // Nest HttpException
    else if (exception instanceof HttpException) {
      status = exception.getStatus();
      const response = exception.getResponse();

      if (typeof response === "string") {
        message = response;
      } else if (typeof response === "object" && response !== null) {
        message = (response as any).message ?? message;
        error = (response as any).error ?? exception.name;
      }
    }

    // Validation errors
    if (
      exception instanceof BadRequestException &&
      Array.isArray((exception.getResponse() as any)?.message)
    ) {
      message = (exception.getResponse() as any).message;
      error = "ValidationError";
    }

    const errorResponse: ErrorResponseDto = {
      statusCode: status,
      message,
      error,
      requestId,
      timestamp,
      path,
    };

    response.status(status).json(errorResponse);
  }
}
