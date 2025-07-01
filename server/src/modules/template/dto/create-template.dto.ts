import { Type } from "class-transformer";
import { ArrayNotEmpty, IsNotEmpty, IsOptional, IsString, ValidateNested } from "class-validator";
import { TemplateFieldInputDto } from "./template-field-input.dto";

export class CreateTemplateDto {
  @IsString()
  @IsNotEmpty()
  name: string;

  @IsOptional()
  @IsString()
  description?: string;

  @ArrayNotEmpty()
  @ValidateNested({ each: true })
  @Type(() => TemplateFieldInputDto)
  fields: TemplateFieldInputDto[];
}
