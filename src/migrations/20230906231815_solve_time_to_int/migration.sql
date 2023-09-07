-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Solve" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "SolveSession" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "updatedAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "updatedAt" SET NOT NULL;
