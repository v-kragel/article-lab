/*
  Warnings:

  - The primary key for the `TemplateField` table will be changed. If it partially fails, the table could be left without primary key constraint.
  - The required column `id` was added to the `TemplateField` table with a prisma-level default value. This is not possible if the table is not empty. Please add this column as optional, then populate it before making it required.

*/
-- AlterTable
ALTER TABLE "TemplateField" DROP CONSTRAINT "TemplateField_pkey",
ADD COLUMN     "id" TEXT NOT NULL,
ADD COLUMN     "label" TEXT,
ADD CONSTRAINT "TemplateField_pkey" PRIMARY KEY ("id");

-- CreateIndex
CREATE INDEX "TemplateField_templateId_idx" ON "TemplateField"("templateId");
