import {
  ArticleFieldValueService,
  CreateArticleFieldValueDto,
} from "@app/modules/articleFieldValue";
import { TemplateService } from "@app/modules/template";
import { PrismaService } from "@app/prisma";
import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { Article, Prisma } from "@prisma/client";
import { PinoLogger } from "nestjs-pino";
import { ARTICLE_ERRORS } from "../../domain";
import { ArticleRepository } from "../../lib/article.repository";
import { ArticleResponseDto, CreateArticleDto, UpdateArticleDto } from "../dto";
import { mapDtoToArticleFieldsValues, mapPrismaArticleToDto } from "../mappers";
import { validateArticleFieldValues } from "../validators";

@Injectable()
export class ArticleService {
  constructor(
    private readonly logger: PinoLogger,
    private readonly prisma: PrismaService,
    private readonly articleRepo: ArticleRepository,
    private readonly templateService: TemplateService,
    private readonly articleFieldValueService: ArticleFieldValueService,
  ) {
    this.logger.setContext(ArticleService.name);
  }

  private async getArticleWithTemplateAndFieldValues(id: string): Promise<ArticleResponseDto> {
    const article = await this.articleRepo.findById(id);

    if (!article) {
      throw new NotFoundException(ARTICLE_ERRORS.NOT_FOUND);
    }

    return mapPrismaArticleToDto(article);
  }

  private async assertArticleExists(id: string): Promise<void> {
    const exists = await this.articleRepo.exists(id);

    if (!exists) {
      throw new NotFoundException(ARTICLE_ERRORS.NOT_FOUND);
    }
  }

  private async validateAndCheckFields(
    dtoFields: CreateArticleFieldValueDto[],
    templateId: string,
  ) {
    const fieldIds = dtoFields.map((f) => f.fieldId);
    await this.templateService.assertTemplateFieldsExist(templateId, fieldIds);

    const template = await this.templateService.findOne(templateId);

    const errors = validateArticleFieldValues(dtoFields, template);
    if (errors.length > 0) {
      throw new BadRequestException({
        error: "ValidationError",
        message: errors,
      });
    }
  }

  private async createFieldsValues(
    tx: Prisma.TransactionClient,
    articleId: string,
    templateId: string,
    dtoFields: CreateArticleFieldValueDto[],
  ): Promise<void> {
    const template = await this.templateService.findOne(templateId);

    const fieldsValues = mapDtoToArticleFieldsValues(articleId, dtoFields, template);

    await this.articleFieldValueService.createMany(tx, fieldsValues);
  }

  private async deleteArticleFieldsValues(
    tx: Prisma.TransactionClient,
    articleId: string,
  ): Promise<void> {
    await this.articleFieldValueService.deleteManyByArticleId(tx, articleId);
  }

  async findAll(): Promise<Article[]> {
    this.logger.info("Fetching all articles");

    return await this.articleRepo.findAll();
  }

  async findOne(id: string): Promise<ArticleResponseDto> {
    this.logger.info({ id }, "Fetching article by ID");

    return this.getArticleWithTemplateAndFieldValues(id);
  }

  async create(dto: CreateArticleDto): Promise<ArticleResponseDto> {
    this.logger.info({ dto }, "Creating article");

    await this.validateAndCheckFields(dto.fields, dto.templateId);

    const articleId = await this.prisma.$transaction(async (tx) => {
      const article = await tx.article.create({
        data: {
          title: dto.title,
          templateId: dto.templateId,
        },
      });

      this.logger.info({ id: article.id }, "Article created in DB");

      await this.createFieldsValues(tx, article.id, dto.templateId, dto.fields);

      return article.id;
    });

    this.logger.info({ id: articleId }, "Article created");

    return await this.getArticleWithTemplateAndFieldValues(articleId);
  }

  async update(id: string, dto: UpdateArticleDto): Promise<ArticleResponseDto> {
    this.logger.info({ id, dto }, "Updating article");

    const currentArticle = await this.getArticleWithTemplateAndFieldValues(id);

    if (dto.templateId && dto.templateId !== currentArticle.template.id) {
      throw new BadRequestException({
        error: "ValidationError",
        message: "You cannot change the template of an existing article.",
      });
    }

    if (dto.fields) {
      await this.validateAndCheckFields(dto.fields, currentArticle.template.id);
    }

    await this.prisma.$transaction(async (tx) => {
      await tx.article.update({
        where: { id },
        data: {
          title: dto.title,
        },
      });

      this.logger.info({ id }, "Article updated");

      if (dto.fields) {
        await this.deleteArticleFieldsValues(tx, id);

        await this.createFieldsValues(tx, id, currentArticle.template.id, dto.fields);

        this.logger.info({ id }, "Article fields values replaced");
      }
    });

    return await this.getArticleWithTemplateAndFieldValues(id);
  }

  async remove(id: string): Promise<void> {
    this.logger.info({ id }, "Removing article");

    await this.assertArticleExists(id);

    await this.articleRepo.delete(id);

    this.logger.info({ id }, "Article removed");
  }
}
