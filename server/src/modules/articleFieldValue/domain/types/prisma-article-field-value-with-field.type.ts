import { ArticleFieldValue, Field } from "@prisma/client";

export type PrismaArticleFieldValueWithField = ArticleFieldValue & { field: Field };
