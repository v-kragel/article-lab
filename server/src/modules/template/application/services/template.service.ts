import { FieldService } from "@app/modules/field";
import { CreateTemplateFieldDto, TemplateFieldService } from "@app/modules/templateField";
import { PrismaService } from "@app/prisma";
import {
  BadRequestException,
  ConflictException,
  Injectable,
  NotFoundException,
} from "@nestjs/common";
import { Prisma, Template } from "@prisma/client";
import { PinoLogger } from "nestjs-pino";
import { TEMPLATE_ERRORS } from "../../domain";
import { CreateTemplateDto, TemplateResponseDto, UpdateTemplateDto } from "../dto";
import { mapDtoToTemplateFields, mapPrismaTemplateToDto } from "../mappers";
import { TemplateRepository } from '../../lib/template.repository';

@Injectable()
export class TemplateService {
  constructor(
    private readonly prisma: PrismaService,
    private readonly templateRepo: TemplateRepository,
    private readonly fieldService: FieldService,
    private readonly templateFieldService: TemplateFieldService,
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

  private async createTemplateFields(
    tx: Prisma.TransactionClient,
    templateId: string,
    fields: CreateTemplateFieldDto[],
  ): Promise<void> {
    const templateFields = mapDtoToTemplateFields(templateId, fields);

    await this.templateFieldService.createMany(tx, templateFields);
  }

  private async deleteTemplateFields(
    tx: Prisma.TransactionClient,
    templateId: string,
  ): Promise<void> {
    await this.templateFieldService.deleteByTemplateId(tx, templateId);
  }

  private async getTemplateWithFields(id: string): Promise<TemplateResponseDto> {
    const template = await this.templateRepo.findByIdWithFields(id);

    if (!template) {
      throw new NotFoundException(TEMPLATE_ERRORS.NOT_FOUND);
    }

    return mapPrismaTemplateToDto(template);
  }

  async findAll(): Promise<Template[]> {
    this.logger.info("Fetching all templates");

    return await this.templateRepo.findAll();
  }

  async findOne(id: string): Promise<TemplateResponseDto> {
    this.logger.info({ id }, "Fetching template by ID");

    return this.getTemplateWithFields(id);
  }

  async create(dto: CreateTemplateDto): Promise<TemplateResponseDto> {
    this.logger.info({ dto }, "Creating template");

    const fieldIds = dto.fields.map((f) => f.id);
    await this.fieldService.assertFieldsExist(fieldIds);

    const nameExists = await this.templateRepo.existsByName(dto.name);

    if (nameExists) {
      throw new ConflictException(TEMPLATE_ERRORS.NAME_EXISTS);
    }

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

  async update(id: string, dto: UpdateTemplateDto): Promise<TemplateResponseDto> {
    this.logger.info({ id, dto }, "Updating template");

    await this.assertTemplateExists(id);

    if (dto.name) {
      const nameExists = await this.templateRepo.existsByName(dto.name);

      if (!!nameExists) {
        throw new ConflictException(TEMPLATE_ERRORS.NAME_EXISTS);
      }
    }

    if (dto.fields) {
      const fieldIds = dto.fields.map((f) => f.id);
      await this.fieldService.assertFieldsExist(fieldIds);
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

    await this.templateRepo.delete(id);

    this.logger.info({ id }, "Template removed");
  }

  async assertTemplateFieldsExist(templateId: string, fieldIds: string[]): Promise<void> {
    if (fieldIds.length === 0) return;

    const existingTemplate = await this.getTemplateWithFields(templateId);

    const { fields } = existingTemplate;

    const templateFieldIds = new Set(fields.map((f) => f.id));
    const missing = fieldIds.filter((id) => !templateFieldIds.has(id));

    if (missing.length > 0) {
      throw new BadRequestException(TEMPLATE_ERRORS.FIELDS_NOT_FOUND(missing));
    }
  }
}
