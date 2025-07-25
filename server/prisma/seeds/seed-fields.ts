import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedFields = async () => {
  const fields: Prisma.FieldCreateInput[] = [
    { name: "separator", displayName: "Separator", type: "none", displayType: "separator" },
    { name: "input", displayName: "Input", type: "string", displayType: "input" },
    { name: "textarea", displayName: "Textarea", type: "string", displayType: "textarea" },
    { name: "checkbox", displayName: "Checkbox", type: "boolean", displayType: "checkbox" },
    { name: "datepicker", displayName: "Datepicker", type: "date", displayType: "datepicker" },
  ];

  for (const data of fields) {
    await prisma.field.create({
      data,
    });
  }
};
