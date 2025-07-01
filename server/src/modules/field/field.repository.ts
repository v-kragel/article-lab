import { PrismaService } from "@app/prisma";
import { Injectable } from "@nestjs/common";
import { Field } from "@prisma/client";

@Injectable()
export class FieldRepository {
  constructor(private readonly prisma: PrismaService) {}

  async findAll(): Promise<Field[]> {
    return await this.prisma.field.findMany();
  }

  async findManyByIds(fieldIds: string[]): Promise<Pick<Field, "id">[]> {
    if (fieldIds.length === 0) return [];

    return this.prisma.field.findMany({
      where: { id: { in: fieldIds } },
      select: { id: true },
    });
  }
}
