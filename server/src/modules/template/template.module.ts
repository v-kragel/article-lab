import { PrismaModule } from "@app/prisma";
import { Module } from "@nestjs/common";
import { FieldModule } from "../field";
import { TemplateFieldModule } from "../templateField";
import { TemplateController } from "./template.controller";
import { TemplateRepository } from "./template.repository";
import { TemplateService } from "./template.service";

@Module({
  imports: [PrismaModule, FieldModule, TemplateFieldModule],
  controllers: [TemplateController],
  providers: [TemplateService, TemplateRepository],
  exports: [TemplateService],
})
export class TemplateModule {}
