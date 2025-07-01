import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";

@Injectable()
export class TemplateFieldRepository {
  async createMany(
    tx: Prisma.TransactionClient,
    templateFields: Prisma.TemplateFieldCreateManyInput[],
  ): Promise<Prisma.BatchPayload> {
    return tx.templateField.createMany({
      data: templateFields,
      skipDuplicates: false,
    });
  }

  async deleteByTemplateId(
    tx: Prisma.TransactionClient,
    templateId: string,
  ): Promise<Prisma.BatchPayload> {
    return tx.templateField.deleteMany({ where: { templateId } });
  }
}
