import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { Template } from "@prisma/client";
import { TemplateService } from "./template.service";

@Controller("templates")
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Template[]> {
    return await this.templateService.getAll();
  }
}
