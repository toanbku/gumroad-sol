/*
  Warnings:

  - A unique constraint covering the columns `[orderId]` on the table `PaymentSessions` will be added. If there are existing duplicate values, this will fail.

*/
-- CreateTable
CREATE TABLE "Transaction" (
    "id" TEXT NOT NULL,
    "assetId" TEXT NOT NULL,
    "quantity" INTEGER NOT NULL,
    "orderId" TEXT NOT NULL,

    CONSTRAINT "Transaction_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "PaymentSessions_orderId_key" ON "PaymentSessions"("orderId");

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_orderId_fkey" FOREIGN KEY ("orderId") REFERENCES "PaymentSessions"("orderId") ON DELETE RESTRICT ON UPDATE CASCADE;

-- AddForeignKey
ALTER TABLE "Transaction" ADD CONSTRAINT "Transaction_assetId_fkey" FOREIGN KEY ("assetId") REFERENCES "Assets"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
