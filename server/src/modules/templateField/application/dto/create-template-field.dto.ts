import { JsonValue } from "@prisma/client/runtime/library";
import { IsBoolean, IsJSON, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTemplateFieldDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;

  @IsString()
  type: string;

  @IsOptional()
  @IsString()
  label: string | null;

  @IsOptional()
  @IsBoolean()
  required: boolean | null;

  @IsOptional()
  @IsJSON()
  metadata: JsonValue | null;
}
