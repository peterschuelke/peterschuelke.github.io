-- AlterTable
ALTER TABLE "Project" ADD COLUMN "slug" TEXT;
-- Now make the column required and unique
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");