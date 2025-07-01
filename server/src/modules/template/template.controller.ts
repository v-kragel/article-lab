import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseUUIDPipe,
  Post,
  Put,
  UsePipes,
  ValidationPipe,
} from "@nestjs/common";
import { Template } from "@prisma/client";
import { CreateTemplateDto, UpdateTemplateDto } from "./dto";
import { TemplateService } from "./template.service";
import { TemplateWithFields } from "./types";

@Controller("templates")
export class TemplateController {
  constructor(private readonly templateService: TemplateService) {}

  @Get()
  @HttpCode(HttpStatus.OK)
  async findAll(): Promise<Template[]> {
    return this.templateService.findAll();
  }

  @Get(":id")
  @HttpCode(HttpStatus.OK)
  async findOne(@Param("id", ParseUUIDPipe) id: string): Promise<Template> {
    return this.templateService.findOne(id);
  }

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async create(@Body() dto: CreateTemplateDto): Promise<TemplateWithFields> {
    return this.templateService.create(dto);
  }

  @Put(":id")
  @HttpCode(HttpStatus.OK)
  @UsePipes(new ValidationPipe({ whitelist: true, transform: true }))
  async update(
    @Param("id", ParseUUIDPipe) id: string,
    @Body() dto: UpdateTemplateDto,
  ): Promise<TemplateWithFields> {
    return this.templateService.update(id, dto);
  }

  @Delete(":id")
  @HttpCode(HttpStatus.NO_CONTENT)
  async remove(@Param("id", ParseUUIDPipe) id: string) {
    return this.templateService.remove(id);
  }
}
