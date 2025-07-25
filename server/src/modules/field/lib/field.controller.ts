import { Controller, Get, HttpCode, HttpStatus } from "@nestjs/common";
import { Field } from "@prisma/client";
import { FieldService } from "../application";

@Controller("fields")
export class FieldController {
  constructor(private readonly fieldService: FieldService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Field[]> {
    return await this.fieldService.getAll();
  }
}
