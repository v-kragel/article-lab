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

  for (const field of template.fields) {
    const { id, name, required, displayType, type } = field;

    if (!required || skipRequiredCheckTypes.includes(displayType)) {
      continue;
    }

    const dto = inputValues.find((iv) => iv.fieldId === id);
    const value = dto?.value;

    const isEmpty =
      value === null || value === undefined || (typeof value === "string" && value.trim() === "");

    if (isEmpty) {
      errors.push({
        fieldId: id,
        message: `Field "${name}" is required.`,
      });
      continue;
    }

    switch (type) {
      case "string": {
        if (typeof value !== "string") {
          errors.push({
            fieldId: id,
            message: `Field "${name}" must be a string.`,
          });
        }
        break;
      }
      case "number": {
        if (typeof value !== "number" || Number.isNaN(value)) {
          errors.push({
            fieldId: id,
            message: `Field "${name}" must be a number.`,
          });
        }
        break;
      }
      case "boolean": {
        if (typeof value !== "boolean") {
          errors.push({
            fieldId: id,
            message: `Field "${name}" must be a boolean.`,
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
            fieldId: id,
            message: `Field "${name}" must be a date.`,
          });
        }
        break;
      }
      case "none":
        break;
      default:
        errors.push({
          fieldId: id,
          message: `Unsupported field type "${type}" for field ${name}.`,
        });
    }
  }

  return errors;
}
