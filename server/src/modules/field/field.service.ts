import { PrismaService } from "@app/prisma";
import { Injectable } from "@nestjs/common";
import { Field } from "@prisma/client";

@Injectable()
export class FieldService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Field[]> {
    return await this.prismaService.field.findMany();
  }
}
