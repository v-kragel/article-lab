import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { TemplateFieldRepository } from "../../lib/template-field.repository";

@Injectable()
export class TemplateFieldService {
  constructor(private readonly templateFieldRepo: TemplateFieldRepository) {}

  async createMany(
    tx: Prisma.TransactionClient,
    templateFields: Prisma.TemplateFieldCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return this.templateFieldRepo.createMany(tx, templateFields);
  }

  async deleteByTemplateId(
    tx: Prisma.TransactionClient,
    templateId: string,
  ): Promise<Prisma.BatchPayload> {
    return this.templateFieldRepo.deleteByTemplateId(tx, templateId);
  }
}
