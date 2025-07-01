import { Template } from "@prisma/client";
import { TemplateFieldInputDto } from "../dto";

export type TemplateWithFields = Template & { fields: TemplateFieldInputDto[] };
