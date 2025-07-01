import { IsBoolean, IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class TemplateFieldInputDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsString()
  key: string;

  @IsOptional()
  @IsString()
  label?: string;

  @IsOptional()
  @IsInt()
  position?: number;

  @IsOptional()
  @IsBoolean()
  required?: boolean;
}
