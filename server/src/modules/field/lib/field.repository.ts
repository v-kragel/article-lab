import { PrismaService } from "@app/prisma";
import { Field } from "@prisma/client";
import { Injectable } from "@nestjs/common";

@Injectable()
export class FieldRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Field[]> {
    return await this.prisma.field.findMany({ where: { deletedAt: null } });
  }

  async findManyByIds(fieldIds: string[]) {
    return this.prisma.field.findMany({
      where: { id: { in: fieldIds } },
      select: { id: true },
    });
  }
}
