import { Prisma, PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export const seedFields = async () => {
  const fields: Prisma.FieldCreateInput[] = [
    { name: "author", type: "string" },
    { name: "publish_date", type: "date" },
    { name: "separator", type: "separator" },
    { name: "paragraph", type: "string" },
  ];

  for (const data of fields) {
    await prisma.field.create({
      data,
    });
  }
};
