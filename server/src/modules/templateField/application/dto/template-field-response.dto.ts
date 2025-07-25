import { FieldDisplayType, FieldType } from "@prisma/client";
import { JsonValue } from "@prisma/client/runtime/library";
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
  metadata: JsonValue | null;
}
