import { REQUEST } from "@app/constants";
import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { Request } from "express";
import { PinoLogger, LoggerModule as PinoLoggerModule } from "nestjs-pino";
import { RequestIdMiddleware } from "./request-id.middleware";
import { RequestLoggingInterceptor } from "./request-logging.interceptor";

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: "debug",
        customProps: (req: Request) => ({
          [REQUEST.REQUEST_ID_TOKEN]: req[REQUEST.REQUEST_ID_TOKEN],
        }),
        serializers: {
          req(req) {
            return { method: req.method, url: req.url };
          },
          res(res) {
            return { statusCode: res.statusCode };
          },
        },
        transport: {
          target: "pino-pretty",
          options: {
            singleLine: true,
            colorize: true,
            translateTime: "SYS:standard",
            ignore: "pid,hostname",
          },
        },
        autoLogging: false,
      },
    }),
  ],
  providers: [
    PinoLogger,
    {
      provide: APP_INTERCEPTOR,
      useClass: RequestLoggingInterceptor,
    },
  ],
  exports: [PinoLogger],
})
export class LoggerModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestIdMiddleware).forRoutes("*");
  }
}
