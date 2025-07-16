import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { RequestContextModule } from "./common/context";
import { ExceptionModule } from "./common/exceptions";
import { LoggerModule } from "./common/logger";
import { appConfig, databaseConfig } from "./config";
import { FieldModule } from "./modules/field";
import { TemplateModule } from "./modules/template";
import { PrismaModule } from "./prisma";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: ".env",
      load: [databaseConfig, appConfig],
    }),
    LoggerModule,
    ExceptionModule,
    RequestContextModule,
    PrismaModule,
    FieldModule,
    TemplateModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
