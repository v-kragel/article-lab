import { PrismaArticleWithTemplateAndFieldValues } from "../../domain";
import { ArticleResponseDto } from "../dto";

export function mapPrismaArticleToDto(
  article: PrismaArticleWithTemplateAndFieldValues,
): ArticleResponseDto {
  const { id, title, template, fieldValues, createdAt } = article;

  const fields = fieldValues.map((fv) => {
    const finalValue = fv.valueString ?? fv.valueNumber ?? fv.valueDate ?? fv.valueBoolean ?? null;

    return {
      fieldId: fv.fieldId,
      value: finalValue,
    };
  });

  return {
    id,
    title,
    template: {
      id: template.id,
      name: template.name,
    },
    createdAt,
    fields,
  };
}
