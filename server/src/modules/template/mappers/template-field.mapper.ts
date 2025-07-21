import { Prisma } from "@prisma/client";
import { TemplateFieldInputDto } from "../dto";

// from frontend dto → prisma input
export function mapDtoToTemplateFieldCreateInputs(
  templateId: string,
  fields: TemplateFieldInputDto[],
): Prisma.TemplateFieldCreateManyInput[] {
  return fields.map((f, index) => ({
    templateId,
    fieldId: f.id,
    label: f.label,
    position: index,
    required: f.required ?? false,
  }));
}

// from db entities → frontend dto
export function mapTemplateFieldEntitiesToDtos(
  templateFields: {
    field: { id: string; name: string; type: string };
    label: string;
    position: number;
    required: boolean;
  }[],
): TemplateFieldInputDto[] {
  return templateFields.map((tf) => ({
    id: tf.field.id,
    name: tf.field.name,
    type: tf.field.type,
    label: tf.label,
    position: tf.position,
    required: tf.required ?? false,
  }));
}
