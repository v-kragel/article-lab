import { CreateTemplateFieldDto } from "@app/modules/templateField";
import { Prisma } from "@prisma/client";

export function mapDtoToTemplateFields(
  templateId: string,
  fields: CreateTemplateFieldDto[],
): Prisma.TemplateFieldCreateManyInput[] {
  return fields.map((f, index) => ({
    templateId,
    fieldId: f.id,
    label: f.label,
    position: index,
    required: f.required ?? false,
  }));
}
