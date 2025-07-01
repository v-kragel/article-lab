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
    label: f.label ?? null,
    position: index,
    required: f.required ?? null,
  }));
}

// from db entities → frontend dto
export function mapTemplateFieldEntitiesToDtos(
  templateFields: {
    field: { id: string; name: string; type: string; key: string };
    label: string | null;
    position: number | null;
    required: boolean | null;
  }[],
): TemplateFieldInputDto[] {
  return templateFields.map((tf) => ({
    id: tf.field.id,
    name: tf.field.name,
    type: tf.field.type,
    key: tf.field.key,
    label: tf.label ?? undefined,
    position: tf.position ?? undefined,
    required: tf.required ?? undefined,
  }));
}
