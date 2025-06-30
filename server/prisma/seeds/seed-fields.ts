import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedFields = async () => {
  const fields: Prisma.FieldCreateInput[] = [
    { name: "Title", type: "text", key: "title" },
    { name: "Description", type: "textarea", key: "description" },
    { name: "Line", type: "line", key: "line" },
  ];

  for (const data of fields) {
    await prisma.field.create({
      data,
    });
  }
};
