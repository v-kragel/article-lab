import { Module } from "@nestjs/common";
import { APP_INTERCEPTOR } from "@nestjs/core";
import { ResponseWrapperInterceptor } from "./interceptors/response-wrapper.interceptor";

@Module({
  providers: [
    {
      provide: APP_INTERCEPTOR,
      useClass: ResponseWrapperInterceptor,
    },
  ],
})
export class ResponseWrapperModule {}
