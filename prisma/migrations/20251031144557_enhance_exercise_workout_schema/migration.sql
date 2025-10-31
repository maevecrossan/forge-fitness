/*
  Warnings:

  - You are about to drop the column `type` on the `Exercise` table. All the data in the column will be lost.
  - Added the required column `category` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `primaryMuscle` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Exercise` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `Workout` table without a default value. This is not possible if the table is not empty.
  - Added the required column `updatedAt` to the `WorkoutExercise` table without a default value. This is not possible if the table is not empty.

*/
-- CreateEnum
CREATE TYPE "ExerciseCategory" AS ENUM ('WEIGHTS', 'CARDIO', 'MOBILITY', 'FUNCTIONAL', 'COOL_DOWN');

-- CreateEnum
CREATE TYPE "MuscleGroup" AS ENUM ('CHEST', 'BACK', 'SHOULDERS', 'BICEPS', 'TRICEPS', 'QUADS', 'HAMSTRINGS', 'GLUTES', 'CALVES', 'CORE', 'FULL_BODY', 'UPPER_BODY', 'LOWER_BODY', 'OTHER');

-- AlterTable
ALTER TABLE "Exercise" DROP COLUMN "type",
ADD COLUMN     "category" "ExerciseCategory" NOT NULL,
ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "description" TEXT,
ADD COLUMN     "equipment" TEXT,
ADD COLUMN     "modality" TEXT,
ADD COLUMN     "primaryMuscle" "MuscleGroup" NOT NULL,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "Workout" ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- AlterTable
ALTER TABLE "WorkoutExercise" ADD COLUMN     "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
ADD COLUMN     "updatedAt" TIMESTAMP(3) NOT NULL;

-- CreateIndex
CREATE INDEX "Exercise_name_idx" ON "Exercise"("name");

-- CreateIndex
CREATE INDEX "Exercise_category_primaryMuscle_idx" ON "Exercise"("category", "primaryMuscle");
