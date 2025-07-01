import { Module } from "@nestjs/common";
import { TemplateFieldRepository } from "./template-field.repository";

@Module({
  providers: [TemplateFieldRepository],
  exports: [TemplateFieldRepository],
})
export class TemplateFieldModule {}
