import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class ArticleFieldValueRepository {
  async createMany(
    tx: Prisma.TransactionClient,
    data: Prisma.ArticleFieldValueCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return tx.articleFieldValue.createMany({
      data,
      skipDuplicates: false,
    });
  }

  async deleteByArticleId(
    tx: Prisma.TransactionClient,
    articleId: string,
  ): Promise<Prisma.BatchPayload> {
    return tx.articleFieldValue.deleteMany({ where: { articleId } });
  }
}
