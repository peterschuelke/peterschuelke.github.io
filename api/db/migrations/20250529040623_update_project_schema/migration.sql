/*
  Warnings:

  - Added the required column `updatedAt` to the `Project` table without a default value. This is not possible if the table is not empty.
  - Made the column `slug` on table `Project` required. This step will fail if there are existing NULL values in that column.

*/
-- RedefineTables
PRAGMA defer_foreign_keys=ON;
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Project" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "title" TEXT NOT NULL,
    "slug" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "summary" TEXT,
    "problem" TEXT,
    "solution" TEXT,
    "execution" TEXT,
    "results" TEXT,
    "image" TEXT NOT NULL,
    "link" TEXT NOT NULL,
    "role" TEXT NOT NULL,
    "createdAt" DATETIME NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" DATETIME NOT NULL
);
INSERT INTO "new_Project" ("createdAt", "description", "execution", "id", "image", "link", "problem", "results", "role", "slug", "solution", "summary", "title") SELECT "createdAt", "description", "execution", "id", "image", "link", "problem", "results", "role", "slug", "solution", "summary", "title" FROM "Project";
DROP TABLE "Project";
ALTER TABLE "new_Project" RENAME TO "Project";
CREATE UNIQUE INDEX "Project_slug_key" ON "Project"("slug");
PRAGMA foreign_keys=ON;
PRAGMA defer_foreign_keys=OFF;

-- First add the column as nullable
ALTER TABLE "Project" ADD COLUMN "updatedAt" DATETIME;

-- Update existing rows with current timestamp
UPDATE "Project" SET "updatedAt" = CURRENT_TIMESTAMP;

-- Now make the column required
ALTER TABLE "Project" ALTER COLUMN "updatedAt" SET NOT NULL;
