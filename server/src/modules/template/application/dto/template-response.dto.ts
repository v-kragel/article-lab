import { TemplateFieldResponseDto } from "@app/modules/templateField";
import { Type } from "class-transformer";
import { IsArray, IsDate, IsString, IsUUID, ValidateNested } from "class-validator";

export class TemplateResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  description: string | null;

  @IsDate()
  createdAt: Date;

  @IsArray()
  @ValidateNested({ each: true })
  @Type(() => TemplateFieldResponseDto)
  fields: TemplateFieldResponseDto[];
}
