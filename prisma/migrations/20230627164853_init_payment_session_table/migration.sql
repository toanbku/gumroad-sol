-- CreateEnum
CREATE TYPE "PaymentSessionStatus" AS ENUM ('Pending', 'Successful', 'Failed');

-- CreateTable
CREATE TABLE "PaymentSessions" (
    "id" TEXT NOT NULL,
    "sessionId" TEXT NOT NULL,
    "orderId" TEXT NOT NULL,
    "status" "PaymentSessionStatus" NOT NULL,

    CONSTRAINT "PaymentSessions_pkey" PRIMARY KEY ("id")
);
