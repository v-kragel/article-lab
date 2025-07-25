import { ArticleFieldValueResponseDto } from "@app/modules/articleFieldValue";
import { TemplateShortDto } from "@app/modules/template";
import { Type } from "class-transformer";
import { IsDate, IsString, IsUUID, ValidateNested } from "class-validator";

export class ArticleResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  title: string;

  @IsDate()
  createdAt: Date;

  @ValidateNested()
  @Type(() => TemplateShortDto)
  template: TemplateShortDto;

  @ValidateNested({ each: true })
  @Type(() => ArticleFieldValueResponseDto)
  fields: ArticleFieldValueResponseDto[];
}
