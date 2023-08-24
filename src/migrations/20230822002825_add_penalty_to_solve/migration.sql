/*
  Warnings:

  - Added the required column `penalty` to the `Solve` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "Solve" ADD COLUMN     "penalty" INTEGER;
