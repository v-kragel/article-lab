import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { FieldModule } from "./modules/field";
import { TemplateModule } from "./modules/template";
import { PrismaModule } from "./prisma";

@Module({
  imports: [ConfigModule.forRoot(), PrismaModule, FieldModule, TemplateModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
