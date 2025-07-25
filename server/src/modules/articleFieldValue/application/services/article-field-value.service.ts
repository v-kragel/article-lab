import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { ArticleFieldValueRepository } from "../../lib/article-field-value.repository";

@Injectable()
export class ArticleFieldValueService {
  constructor(private readonly articleFieldValueRepo: ArticleFieldValueRepository) {}

  async createMany(
    tx: Prisma.TransactionClient,
    data: Prisma.ArticleFieldValueCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.articleFieldValueRepo.createMany(tx, data);
  }

  async deleteManyByArticleId(
    tx: Prisma.TransactionClient,
    articleId: string,
  ): Promise<Prisma.BatchPayload> {
    return this.articleFieldValueRepo.deleteByArticleId(tx, articleId);
  }
}
