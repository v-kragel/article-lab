import { CreateArticleFieldValueDto } from "@app/modules/articleFieldValue";
import { TemplateResponseDto } from "@app/modules/template";
import { FieldDisplayType } from "@prisma/client";

type ValidationError = {
  fieldId: string;
  message: string;
};

const skipRequiredCheckTypes: FieldDisplayType[] = ["separator"];

export function validateArticleFieldValues(
  inputValues: CreateArticleFieldValueDto[],
  template: TemplateResponseDto,
) {
  const errors: ValidationError[] = [];

  const fields = template.fields;

  for (const inputField of inputValues) {
    const { fieldId, value } = inputField;

    const field = fields.find((f) => f.id === fieldId);

    if (!field) {
      errors.push({
        fieldId,
        message: `Field with ID "${fieldId}" does not exist in template.`,
      });
      continue;
    }

    const valueType = typeof value;
    const isEmpty =
      value === null || value === undefined || (typeof value === "string" && value.trim() === "");

    const { required, displayType } = field;

    if (required && !skipRequiredCheckTypes.includes(displayType) && isEmpty) {
      errors.push({
        fieldId,
        message: `Field "${field.name}" is required.`,
      });
      continue;
    }

    if (!isEmpty) {
      const { type } = field;

      switch (type) {
        case "string": {
          if (valueType !== "string") {
            errors.push({
              fieldId,
              message: `Field "${field.name}" must be a string.`,
            });
          }
          break;
        }
        case "number": {
          if (valueType !== "number" || Number.isNaN(value as number)) {
            errors.push({
              fieldId,
              message: `Field "${field.name}" must be a number.`,
            });
          }
          break;
        }
        case "boolean": {
          if (valueType !== "boolean") {
            errors.push({
              fieldId,
              message: `Field "${field.name}" must be a boolean.`,
            });
          }
          break;
        }
        case "date": {
          if (
            !(value instanceof Date) &&
            !(typeof value === "string" && !Number.isNaN(Date.parse(value)))
          ) {
            errors.push({
              fieldId,
              message: `Field "${field.name}" must be a date.`,
            });
          }
          break;
        }
        case "none":
          break;
        default:
          errors.push({
            fieldId,
            message: `Unsupported field type "${field.name}".`,
          });
      }
    }
  }

  return errors;
}
