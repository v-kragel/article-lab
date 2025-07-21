/*
  Warnings:

  - You are about to drop the column `key` on the `Field` table. All the data in the column will be lost.
  - Changed the type of `type` on the `Field` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `position` on table `TemplateField` required. This step will fail if there are existing NULL values in that column.
  - Made the column `required` on table `TemplateField` required. This step will fail if there are existing NULL values in that column.
  - Made the column `label` on table `TemplateField` required. This step will fail if there are existing NULL values in that column.

*/
-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('string', 'number', 'date', 'boolean');

-- DropIndex
DROP INDEX "Field_key_key";

-- AlterTable
ALTER TABLE "Field" DROP COLUMN "key",
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
DROP COLUMN "type",
ADD COLUMN     "type" "FieldType" NOT NULL;

-- AlterTable
ALTER TABLE "Template" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP;

-- AlterTable
ALTER TABLE "TemplateField" ALTER COLUMN "position" SET NOT NULL,
ALTER COLUMN "required" SET NOT NULL,
ALTER COLUMN "required" SET DEFAULT false,
ALTER COLUMN "label" SET NOT NULL;

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleFieldValue" (
    "id" TEXT NOT NULL,
    "fieldName" TEXT NOT NULL,
    "fieldType" "FieldType" NOT NULL,
    "fieldLabel" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "valueString" TEXT,
    "valueNumber" DOUBLE PRECISION,
    "valueDate" TIMESTAMP(3),
    "valueBoolean" BOOLEAN,

    CONSTRAINT "ArticleFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE INDEX "ArticleFieldValue_articleId_idx" ON "ArticleFieldValue"("articleId");

-- CreateIndex
CREATE INDEX "TemplateField_fieldId_idx" ON "TemplateField"("fieldId");

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleFieldValue" ADD CONSTRAINT "ArticleFieldValue_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
