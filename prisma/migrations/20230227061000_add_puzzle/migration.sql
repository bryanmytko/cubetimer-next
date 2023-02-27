/*
  Warnings:

  - Added the required column `puzzle` to the `Solve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solve" ADD COLUMN     "puzzle" TEXT NOT NULL;
