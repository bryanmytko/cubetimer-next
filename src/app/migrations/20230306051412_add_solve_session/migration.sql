-- AlterTable
ALTER TABLE "Solve" ADD COLUMN     "solveSessionId" TEXT;

-- CreateTable
CREATE TABLE "SolveSession" (
    "id" TEXT NOT NULL,
    "size" INTEGER NOT NULL,
    "userId" TEXT NOT NULL,

    CONSTRAINT "SolveSession_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Solve" ADD CONSTRAINT "Solve_solveSessionId_fkey" FOREIGN KEY ("solveSessionId") REFERENCES "SolveSession"("id") ON DELETE CASCADE ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "SolveSession" ADD CONSTRAINT "SolveSession_userId_fkey" FOREIGN KEY ("userId") REFERENCES "User"("id") ON DELETE CASCADE ON UPDATE CASCADE;
