import { Injectable } from "@nestjs/common";
import { Field } from "@prisma/client";
import { FieldRepository } from "./field.repository";

@Injectable()
export class FieldService {
  constructor(private readonly fieldRepo: FieldRepository) {}

  async getAll(): Promise<Field[]> {
    return await this.fieldRepo.findAll();
  }
}
