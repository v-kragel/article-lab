-- CreateEnum
CREATE TYPE "FieldType" AS ENUM ('string', 'number', 'date', 'boolean', 'none');

-- CreateEnum
CREATE TYPE "FieldDisplayType" AS ENUM ('input', 'textarea', 'select', 'checkbox', 'datepicker', 'separator');

-- CreateTable
CREATE TABLE "Field" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "displayName" TEXT NOT NULL DEFAULT '',
    "description" TEXT,
    "type" "FieldType" NOT NULL,
    "displayType" "FieldDisplayType" NOT NULL DEFAULT 'input',
    "metadata" JSONB,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Field_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Template" (
    "id" TEXT NOT NULL,
    "name" TEXT NOT NULL,
    "description" TEXT,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Template_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "TemplateField" (
    "id" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL,
    "label" TEXT NOT NULL,
    "position" INTEGER NOT NULL,
    "required" BOOLEAN NOT NULL DEFAULT false,
    "metadata" JSONB,

    CONSTRAINT "TemplateField_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "Article" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "templateId" TEXT NOT NULL,
    "deletedAt" TIMESTAMP(3),
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,

    CONSTRAINT "Article_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "ArticleFieldValue" (
    "id" TEXT NOT NULL,
    "articleId" TEXT NOT NULL,
    "fieldId" TEXT NOT NULL DEFAULT '',
    "valueString" TEXT,
    "valueNumber" DOUBLE PRECISION,
    "valueDate" TIMESTAMP(3),
    "valueBoolean" BOOLEAN,

    CONSTRAINT "ArticleFieldValue_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "Field_name_deletedAt_key" ON "Field"("name", "deletedAt");

-- CreateIndex
CREATE UNIQUE INDEX "Template_name_deletedAt_key" ON "Template"("name", "deletedAt");

-- CreateIndex
CREATE INDEX "TemplateField_templateId_idx" ON "TemplateField"("templateId");

-- CreateIndex
CREATE INDEX "TemplateField_fieldId_idx" ON "TemplateField"("fieldId");

-- CreateIndex
CREATE UNIQUE INDEX "TemplateField_templateId_position_key" ON "TemplateField"("templateId", "position");

-- CreateIndex
CREATE INDEX "Article_templateId_idx" ON "Article"("templateId");

-- CreateIndex
CREATE INDEX "ArticleFieldValue_articleId_idx" ON "ArticleFieldValue"("articleId");

-- AddForeignKey
ALTER TABLE "TemplateField" ADD CONSTRAINT "TemplateField_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "TemplateField" ADD CONSTRAINT "TemplateField_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Article" ADD CONSTRAINT "Article_templateId_fkey" FOREIGN KEY ("templateId") REFERENCES "Template"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleFieldValue" ADD CONSTRAINT "ArticleFieldValue_articleId_fkey" FOREIGN KEY ("articleId") REFERENCES "Article"("id") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "ArticleFieldValue" ADD CONSTRAINT "ArticleFieldValue_fieldId_fkey" FOREIGN KEY ("fieldId") REFERENCES "Field"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
