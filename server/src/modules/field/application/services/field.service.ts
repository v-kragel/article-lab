import { BadRequestException, Injectable } from "@nestjs/common";
import { Field } from "@prisma/client";
import { FIELD_ERRORS } from "../../domain";
import { FieldRepository } from "../../lib/field.repository";

@Injectable()
export class FieldService {
  constructor(private readonly fieldRepo: FieldRepository) {}

  async getAll(): Promise<Field[]> {
    return await this.fieldRepo.findAll();
  }

  async findManyByIds(fieldIds: string[]) {
    if (fieldIds.length === 0) return [];

    return this.fieldRepo.findManyByIds(fieldIds);
  }

  async assertFieldsExist(fieldIds: string[]): Promise<void> {
    if (fieldIds.length === 0) return;

    const existingFields = await this.fieldRepo.findManyByIds(fieldIds);

    const existingIds = new Set(existingFields.map((f) => f.id));
    const missing = fieldIds.filter((id) => !existingIds.has(id));

    if (missing.length > 0) {
      throw new BadRequestException(FIELD_ERRORS.FIELDS_NOT_FOUND(missing));
    }
  }
}
