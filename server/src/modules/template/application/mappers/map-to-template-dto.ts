import { PrismaTemplateWithFields } from "../../domain";
import { TemplateResponseDto } from "../dto";

export function mapPrismaTemplateToDto(template: PrismaTemplateWithFields): TemplateResponseDto {
  const { id, name, description, templateFields, createdAt } = template;

  const fields = templateFields.map((tf) => ({
    id: tf.field.id,
    name: tf.field.name,
    type: tf.field.type,
    label: tf.label,
    position: tf.position,
    required: tf.required ?? false,
    metadata: tf.metadata ?? null,
    displayName: tf.field.displayName ?? null,
    displayType: tf.field.displayType ?? null,
  }));

  return { id, name, description, fields, createdAt };
}
