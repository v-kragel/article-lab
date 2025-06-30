import { PrismaModule } from "@app/prisma";
import { Module } from "@nestjs/common";
import { TemplateController } from "./template.controller";
import { TemplateService } from "./template.service";

@Module({
  imports: [PrismaModule],
  controllers: [TemplateController],
  providers: [TemplateService],
  exports: [TemplateService],
})
export class TemplateModule {}
