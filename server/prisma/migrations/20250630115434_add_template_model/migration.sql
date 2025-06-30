/*
  Warnings:

  - You are about to drop the column `order` on the `Field` table. All the data in the column will be lost.
  - You are about to drop the column `required` on the `Field` table. All the data in the column will be lost.

*/
-- DropIndex
DROP INDEX "Field_type_key";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "order",
DROP COLUMN "required";

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateField" (
    "templateId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "position" INTEGER,
    "required" BOOLEAN,

    CONSTRAINT "TemplateField_pkey" PRIMARY KEY ("templateId","fieldId")
);

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_key" ON "Template"("name");

-- AddForeignKey
ALTER TABLE "TemplateField" ADD CONSTRAINT "TemplateField_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateField" ADD CONSTRAINT "TemplateField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
