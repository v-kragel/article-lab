import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedFields = async () => {
  const fields: Prisma.FieldCreateInput[] = [
    { name: "Title", type: "text", key: "title", required: true },
    { name: "Description", type: "textarea", key: "description", required: true },
    { name: "Line", type: "line", key: "line", required: true },
  ];

  for (const data of fields) {
    await prisma.field.create({
      data,
    });
  }
};
