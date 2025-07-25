import { CreateArticleFieldValueDto } from "@app/modules/articleFieldValue";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsString, ValidateNested } from "class-validator";

export class CreateArticleDto {
  @IsString()
  title: string;

  @IsString()
  templateId: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateArticleFieldValueDto)
  fields: CreateArticleFieldValueDto[];
}
