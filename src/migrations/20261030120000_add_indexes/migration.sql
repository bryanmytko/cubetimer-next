-- CreateIndex
CREATE INDEX "Solve_userId_createdAt_idx" ON "Solve"("userId", "createdAt");

-- CreateIndex
CREATE INDEX "Solve_solveSessionId_idx" ON "Solve"("solveSessionId");

-- CreateIndex
CREATE INDEX "SolveSession_userId_createdAt_idx" ON "SolveSession"("userId", "createdAt");
