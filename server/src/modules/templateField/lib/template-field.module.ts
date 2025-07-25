import { Module } from "@nestjs/common";
import { TemplateFieldService } from "../application";
import { TemplateFieldRepository } from "./template-field.repository";

@Module({
  providers: [TemplateFieldService, TemplateFieldRepository],
  exports: [TemplateFieldService],
})
export class TemplateFieldModule {}
