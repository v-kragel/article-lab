import { Prisma, PrismaClient } from "../../generated/prisma/client";
import { PrismaPg } from "@prisma/adapter-pg";

const prisma = new PrismaClient({
  adapter: new PrismaPg({ connectionString: process.env.DATABASE_URL }),
});

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
