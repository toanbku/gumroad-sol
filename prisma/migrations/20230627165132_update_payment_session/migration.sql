/*
  Warnings:

  - Added the required column `owner` to the `PaymentSessions` table without a default value. This is not possible if the table is not empty.

*/
-- AlterTable
ALTER TABLE "PaymentSessions" ADD COLUMN     "owner" TEXT NOT NULL;

-- AddForeignKey
ALTER TABLE "PaymentSessions" ADD CONSTRAINT "PaymentSessions_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
