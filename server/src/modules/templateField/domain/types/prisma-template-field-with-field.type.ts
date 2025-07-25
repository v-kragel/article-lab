import { Field, TemplateField } from "@prisma/client";

export type PrismaTemplateFieldWithField = TemplateField & { field: Field };
