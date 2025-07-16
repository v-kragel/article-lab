import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RequestContextModule } from "./common/context";
import { ExceptionModule } from "./common/exceptions";
import { LoggerModule } from "./common/logger";
import { ResponseWrapperModule } from "./common/response-wrapper";
import { appConfig, databaseConfig } from "./config";
import { FieldModule } from "./modules/field";
import { TemplateModule } from "./modules/template";
import { PrismaModule } from "./prisma";

@Module({
  imports: [
    // Core NestJS config
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [databaseConfig, appConfig],
    }),

    // Global infrastructure (middleware / logging / error handling)
    LoggerModule,
    ExceptionModule,
    RequestContextModule,
    ResponseWrapperModule,

    // DB
    PrismaModule,

    // Feature modules (business logic)
    FieldModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
