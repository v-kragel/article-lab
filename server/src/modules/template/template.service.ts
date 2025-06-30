import { PrismaService } from "@app/prisma";
import { Injectable } from "@nestjs/common";
import { Template } from "@prisma/client";

@Injectable()
export class TemplateService {
  constructor(private readonly prismaService: PrismaService) {}

  async getAll(): Promise<Template[]> {
    return await this.prismaService.template.findMany();
  }
}
