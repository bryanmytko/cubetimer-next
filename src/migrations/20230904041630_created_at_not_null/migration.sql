-- AlterTable
ALTER TABLE "Account" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Session" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "Solve" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "SolveSession" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "User" ALTER COLUMN "createdAt" SET NOT NULL;

-- AlterTable
ALTER TABLE "VerificationToken" ALTER COLUMN "createdAt" SET NOT NULL;
