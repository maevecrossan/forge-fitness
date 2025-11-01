/*
  Warnings:

  - A unique constraint covering the columns `[name,category,primaryMuscle]` on the table `Exercise` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateIndex
CREATE UNIQUE INDEX "Exercise_name_category_primaryMuscle_key" ON "Exercise"("name", "category", "primaryMuscle");
