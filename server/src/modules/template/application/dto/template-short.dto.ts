import { IsString, IsUUID } from "class-validator";

export class TemplateShortDto {
  @IsUUID()
  id: string;

  @IsString()
  name: string;
}
