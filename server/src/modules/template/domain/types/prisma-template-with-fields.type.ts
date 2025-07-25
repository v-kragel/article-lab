import { PrismaTemplateFieldWithField } from "@app/modules/templateField";
import { Template } from "@prisma/client";

export type PrismaTemplateWithFields = Template & {
  templateFields: PrismaTemplateFieldWithField[];
};
