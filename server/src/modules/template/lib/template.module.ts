import { FieldModule } from "@app/modules/field";
import { TemplateFieldModule } from "@app/modules/templateField";
import { PrismaModule } from "@app/prisma";
import { Module } from "@nestjs/common";
import { TemplateService } from "../application";
import { TemplateController } from "./template.controller";
import { TemplateRepository } from "./template.repository";

@Module({
  imports: [PrismaModule, FieldModule, TemplateFieldModule],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository],
  exports: [TemplateService],
})
export class TemplateModule {}
