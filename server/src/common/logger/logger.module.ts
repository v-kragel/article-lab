import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { PinoLogger, LoggerModule as PinoLoggerModule } from "nestjs-pino";
import { destination, multistream, transport } from "pino";
import { RequestIdMiddleware } from "./request-id.middleware";
import { RequestLoggingInterceptor } from "./request-logging.interceptor";

const streams = multistream([
  {
    stream: transport({
      target: "pino-pretty",
      options: {
        singleLine: true,
        colorize: true,
        translateTime: "SYS:standard",
        ignore: "pid,hostname",
      },
    }),
  },
  {
    stream: destination("logs/app.log"),
  },
]);

@Module({
  imports: [
    PinoLoggerModule.forRoot({
      pinoHttp: {
        level: "debug",
        serializers: {
          req(req) {
            return { method: req.method, url: req.url };
          },
          res(res) {
            return { statusCode: res.statusCode };
          },
        },
        autoLogging: false,
        stream: streams,
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
