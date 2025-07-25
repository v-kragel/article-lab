import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { appConfig, databaseConfig } from "./config";
import { RequestContextModule } from "./infra/context";
import { ExceptionModule } from "./infra/exceptions";
import { LoggerModule } from "./infra/logger";
import { ResponseWrapperModule } from "./infra/response-wrapper";
import { ArticleModule } from "./modules/article";
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
    ArticleModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
