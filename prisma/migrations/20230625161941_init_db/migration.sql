-- CreateTable
CREATE TABLE "Users" (
    "address" TEXT NOT NULL,
    "auth" JSONB NOT NULL,
    "email" TEXT,
    "createdAt" TIMESTAMP(3) NOT NULL DEFAULT CURRENT_TIMESTAMP,
    "updatedAt" TIMESTAMP(3) NOT NULL,

    CONSTRAINT "Users_pkey" PRIMARY KEY ("address")
);
