import { IsOptional, IsUUID } from "class-validator";

export class CreateArticleFieldValueDto {
  @IsUUID()
  fieldId: string;

  @IsOptional()
  value: string | number | boolean | Date | null;
}
