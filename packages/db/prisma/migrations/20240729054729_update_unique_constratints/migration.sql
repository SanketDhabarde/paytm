/*
  Warnings:

  - A unique constraint covering the columns `[token]` on the table `OnRampTransection` will be added. If there are existing duplicate values, this will fail.

*/
-- DropIndex
DROP INDEX "OnRampTransection_userId_key";

-- CreateIndex
CREATE UNIQUE INDEX "OnRampTransection_token_key" ON "OnRampTransection"("token");
