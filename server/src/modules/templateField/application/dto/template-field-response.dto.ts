import { FieldDisplayType, FieldType, type Prisma } from "@prisma/client";
import { IsBoolean, IsEnum, IsJSON, IsOptional, IsString, IsUUID } from "class-validator";

export class TemplateFieldResponseDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsOptional()
  @IsString()
  displayName: string | null;

  @IsEnum(FieldType)
  type: FieldType;

  @IsEnum(FieldDisplayType)
  displayType: FieldDisplayType;

  @IsOptional()
  @IsString()
  label: string | null;

  @IsBoolean()
  required: boolean;

  @IsOptional()
  @IsJSON()
  metadata: Prisma.JsonValue | null;
}
