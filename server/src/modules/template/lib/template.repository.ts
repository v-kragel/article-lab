import { PrismaService } from "@app/prisma";
import { Injectable } from "@nestjs/common";
import { Prisma, Template } from "@prisma/client";

@Injectable()
export class TemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByIdWithFields(id: string) {
    return this.prisma.template.findUnique({
      where: { id, deletedAt: null },
      include: {
        templateFields: {
          where: { field: { deletedAt: null } },
          include: { field: true },
          orderBy: { position: "asc" },
        },
      },
    });
  }

  async findAll(): Promise<Template[]> {
    return this.prisma.template.findMany({
      where: { deletedAt: null },
      select: {
        id: true,
        name: true,
        description: true,
        createdAt: true,
        updatedAt: true,
        deletedAt: true,
      },
      orderBy: { updatedAt: "asc" },
    });
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.prisma.template.findUnique({
      where: { id, deletedAt: null },
      select: { id: true },
    });

    return !!found;
  }

  async existsByName(name: string, id = ""): Promise<boolean> {
    const found = await this.prisma.template.findFirst({
      where: { name, deletedAt: null, NOT: { id } },
      select: { id: true },
    });

    return !!found;
  }

  async create(data: Prisma.TemplateCreateInput) {
    return this.prisma.template.create({ data });
  }

  async update(id: string, data: Prisma.TemplateUpdateInput) {
    return this.prisma.template.update({ where: { id }, data });
  }

  async delete(id: string) {
    return this.prisma.template.update({ where: { id }, data: { deletedAt: new Date() } });
  }
}
