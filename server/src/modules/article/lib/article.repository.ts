import { PrismaService } from "@app/prisma";
import { Injectable } from "@nestjs/common";
import { Article, Prisma } from "@prisma/client";

@Injectable()
export class ArticleRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Article[]> {
    return await this.prisma.article.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        title: true,
        templateId: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: { title: "asc" },
    });
  }

  async findById(id: string) {
    return this.prisma.article.findUnique({
      where: { id, deletedAt: null },
      include: {
        template: true,
        fieldValues: { include: { field: true } },
      },
    });
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.prisma.article.findUnique({
      where: { id, deletedAt: null },
      select: { id: true },
    });

    return !!found;
  }

  async create(data: Prisma.ArticleCreateInput) {
    return this.prisma.article.create({ data });
  }

  async update(id: string, data: Prisma.ArticleCreateInput) {
    return this.prisma.article.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.article.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
