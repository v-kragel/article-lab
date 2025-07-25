import { CreateTemplateFieldDto } from "@app/modules/templateField";
import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => CreateTemplateFieldDto)
  fields: CreateTemplateFieldDto[];
}
