/*
  Warnings:

  - Made the column `updatedAt` on table `Account` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `Session` required. This step will fail if there are existing NULL values in that column.
  - Changed the type of `time` on the `Solve` table. No cast exists, the column would be dropped and recreated, which cannot be done if there is data, since the column is required.
  - Made the column `updatedAt` on table `Solve` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `SolveSession` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `User` required. This step will fail if there are existing NULL values in that column.
  - Made the column `updatedAt` on table `VerificationToken` required. This step will fail if there are existing NULL values in that column.

*/
-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Solve" DROP COLUMN "time",
ADD COLUMN     "time" INTEGER NOT NULL,
ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "SolveSession" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "updatedAt" SET NOT NULL;
