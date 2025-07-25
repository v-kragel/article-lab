import { IsOptional, IsString } from "class-validator";

export class ArticleFieldValueResponseDto {
  // @IsString()
  // id: string;

  @IsString()
  fieldId: string;

  // @IsString()
  // name: string;

  // @IsString()
  // displayName: string;

  // @IsEnum(FieldType)
  // type: FieldType;

  // @IsEnum(FieldDisplayType)
  // displayType: FieldDisplayType;

  // @IsOptional()
  // @IsString()
  // description: string | null;

  // @IsOptional()
  // @IsJSON()
  // metadata: JsonValue | null;

  @IsOptional()
  value: string | number | boolean | Date | null;
}
