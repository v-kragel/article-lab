import { PrismaService } from "@app/prisma";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, Template } from "@prisma/client";
import { PinoLogger } from "nestjs-pino";
import { FieldRepository } from "../field";
import { TemplateFieldRepository } from "../templateField";
import { TEMPLATE_ERRORS } from "./constants";
import { CreateTemplateDto, TemplateFieldInputDto, UpdateTemplateDto } from "./dto";
import { mapDtoToTemplateFieldCreateInputs, mapTemplateFieldEntitiesToDtos } from "./mappers";
import { TemplateRepository } from "./template.repository";
import { TemplateWithFields } from "./types";

@Injectable()
export class TemplateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly templateRepo: TemplateRepository,
    private readonly fieldRepo: FieldRepository,
    private readonly templateFieldRepo: TemplateFieldRepository,
    private readonly logger: PinoLogger,
  ) {
    this.logger.setContext(TemplateService.name);
  }

  private async assertTemplateExists(id: string): Promise<void> {
    const exists = await this.templateRepo.exists(id);

    if (!exists) {
      throw new NotFoundException(TEMPLATE_ERRORS.NOT_FOUND);
    }
  }

  private async assertFieldsExist(fields: TemplateFieldInputDto[]): Promise<void> {
    if (fields.length === 0) return;

    const fieldIds = fields.map((f) => f.id);

    const existingFields = await this.fieldRepo.findManyByIds(fieldIds);

    const existingIds = new Set(existingFields.map((f) => f.id));
    const missing = fieldIds.filter((id) => !existingIds.has(id));

    if (missing.length > 0) {
      throw new BadRequestException(TEMPLATE_ERRORS.FIELDS_NOT_FOUND(missing));
    }
  }

  private async createTemplateFields(
    tx: Prisma.TransactionClient,
    templateId: string,
    fields: TemplateFieldInputDto[],
  ): Promise<void> {
    const templateFields = mapDtoToTemplateFieldCreateInputs(templateId, fields);

    await this.templateFieldRepo.createMany(tx, templateFields);
  }

  private async deleteTemplateFields(
    tx: Prisma.TransactionClient,
    templateId: string,
  ): Promise<void> {
    await this.templateFieldRepo.deleteByTemplateId(tx, templateId);
  }

  private async getTemplateWithFields(id: string): Promise<TemplateWithFields> {
    const template = await this.templateRepo.findByIdWithFields(id);

    if (!template) {
      throw new NotFoundException(TEMPLATE_ERRORS.NOT_FOUND);
    }

    const { name, description } = template;

    const fields = mapTemplateFieldEntitiesToDtos(template.templateFields);

    return { id, name, description, fields };
  }

  async findAll(): Promise<Template[]> {
    this.logger.info("Fetching all templates");

    return await this.templateRepo.findAll();
  }

  async findOne(id: string): Promise<TemplateWithFields> {
    this.logger.info({ id }, "Fetching template by ID");

    return this.getTemplateWithFields(id);
  }

  async create(dto: CreateTemplateDto): Promise<TemplateWithFields> {
    this.logger.info({ dto }, "Creating template");

    await this.assertFieldsExist(dto.fields);

    const templateId = await this.prisma.$transaction(async (tx) => {
      const template = await tx.template.create({
        data: {
          name: dto.name,
          description: dto.description,
        },
      });

      this.logger.info({ id: template.id }, "Template created in DB");

      await this.createTemplateFields(tx, template.id, dto.fields);

      return template.id;
    });

    this.logger.info({ id: templateId }, "Template created with fields");

    return await this.getTemplateWithFields(templateId);
  }

  async update(id: string, dto: UpdateTemplateDto): Promise<TemplateWithFields> {
    this.logger.info({ id, dto }, "Updating template");

    await this.assertTemplateExists(id);

    if (dto.fields) {
      await this.assertFieldsExist(dto.fields);
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.template.update({
        where: { id },
        data: {
          name: dto.name,
          description: dto.description,
        },
      });

      this.logger.info({ id }, "Template updated");

      if (dto.fields) {
        await this.deleteTemplateFields(tx, id);

        await this.createTemplateFields(tx, id, dto.fields);

        this.logger.info({ id }, "Template fields replaced");
      }
    });

    return await this.getTemplateWithFields(id);
  }

  async remove(id: string): Promise<void> {
    this.logger.info({ id }, "Removing template");

    await this.assertTemplateExists(id);

    await this.prisma.$transaction(async (tx) => {
      await this.deleteTemplateFields(tx, id);

      await this.templateRepo.delete(tx, id);
    });

    this.logger.info({ id }, "Template removed");
  }
}
