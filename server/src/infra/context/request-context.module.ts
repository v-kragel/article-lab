import { MiddlewareConsumer, Module, NestModule } from "@nestjs/common";
import { RequestContextMiddleware } from "./request-context.middleware";
import { RequestContextService } from "./request-context.service";

@Module({
  providers: [RequestContextService],
  exports: [RequestContextService],
})
export class RequestContextModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(RequestContextMiddleware).forRoutes("*");
  }
}
