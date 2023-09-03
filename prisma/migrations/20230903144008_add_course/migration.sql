/*
  Warnings:

  - Added the required column `courseId` to the `Vocabulary` table without a default value. This is not possible if the table is not empty.

*/
-- CreateTable
CREATE TABLE "Course" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "name" TEXT NOT NULL
);

-- RedefineTables
PRAGMA foreign_keys=OFF;
CREATE TABLE "new_Vocabulary" (
    "id" INTEGER NOT NULL PRIMARY KEY AUTOINCREMENT,
    "word" TEXT NOT NULL,
    "explaination" TEXT NOT NULL,
    "pronunciation" TEXT NOT NULL,
    "courseId" INTEGER NOT NULL,
    CONSTRAINT "Vocabulary_courseId_fkey" FOREIGN KEY ("courseId") REFERENCES "Course" ("id") ON DELETE RESTRICT ON UPDATE CASCADE
);
INSERT INTO "new_Vocabulary" ("explaination", "id", "pronunciation", "word") SELECT "explaination", "id", "pronunciation", "word" FROM "Vocabulary";
DROP TABLE "Vocabulary";
ALTER TABLE "new_Vocabulary" RENAME TO "Vocabulary";
PRAGMA foreign_key_check;
PRAGMA foreign_keys=ON;
