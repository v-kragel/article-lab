import { CreateArticleFieldValueDto } from "@app/modules/articleFieldValue";
import { TemplateResponseDto } from "@app/modules/template";
import { TemplateFieldResponseDto } from "@app/modules/templateField";
import { Prisma } from "@prisma/client";

function mapValueByFieldDisplayType(
  tf: CreateArticleFieldValueDto,
  fields: TemplateFieldResponseDto[],
) {
  const { value } = tf;

  const field = fields.find((f) => f.id === tf.fieldId);

  if (!field?.displayType) return {};

  const { displayType } = field;

  switch (displayType) {
    case "input":
    case "textarea":
      return {
        valueString: value as string,
        valueNumber: null,
        valueBoolean: null,
        valueDate: null,
      };
    case "checkbox":
      return {
        valueString: null,
        valueNumber: null,
        valueBoolean: value as boolean,
        valueDate: null,
      };
    case "datepicker":
      return {
        valueString: null,
        valueNumber: null,
        valueBoolean: null,
        valueDate: value as Date,
      };
    case "select":
    case "separator":
      return {
        valueString: null,
        valueNumber: null,
        valueBoolean: null,
        valueDate: null,
      };

    default:
      return assertNever(displayType);
  }
}

export function mapDtoToArticleFieldsValues(
  articleId: string,
  dtoFields: CreateArticleFieldValueDto[],
  template: TemplateResponseDto,
): Prisma.ArticleFieldValueCreateManyInput[] {
  return dtoFields.map((tf) => {
    const { fields } = template;

    const value = mapValueByFieldDisplayType(tf, fields);

    return {
      articleId,
      fieldId: tf.fieldId,
      ...value,
    };
  });
}

function assertNever(value: never): never {
  throw new Error(`Unhandled field type: ${value}`);
}
