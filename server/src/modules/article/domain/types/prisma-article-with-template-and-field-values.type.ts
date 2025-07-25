import { PrismaArticleFieldValueWithField } from "@app/modules/articleFieldValue";
import { Article, Template } from "@prisma/client";

export type PrismaArticleWithTemplateAndFieldValues = Article & {
  template: Template;
  fieldValues: PrismaArticleFieldValueWithField[];
};
