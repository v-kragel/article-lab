import { PrismaService } from "@app/prisma";
import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class TemplateRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findByIdWithFields(id: string) {
    return this.prisma.template.findUnique({
      where: { id },
      include: {
        templateFields: {
          include: { field: true },
          orderBy: { position: "asc" },
        },
      },
    });
  }

  async findAll() {
    return this.prisma.template.findMany({
      select: { id: true, name: true, description: true, createdAt: true, updatedAt: true },
      orderBy: { name: "asc" },
    });
  }

  async exists(id: string): Promise<boolean> {
    const found = await this.prisma.template.findUnique({ where: { id }, select: { id: true } });

    return !!found;
  }

  async create(data: Prisma.TemplateCreateInput) {
    return this.prisma.template.create({ data });
  }

  async update(id: string, data: Prisma.TemplateUpdateInput) {
    return this.prisma.template.update({ where: { id }, data });
  }

  async delete(tx: Prisma.TransactionClient, id: string) {
    return tx.template.delete({ where: { id } });
  }
}
