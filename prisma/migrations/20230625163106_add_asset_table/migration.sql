-- CreateTable
CREATE TABLE "Assets" (
    "id" TEXT NOT NULL,
    "title" TEXT NOT NULL,
    "description" TEXT NOT NULL,
    "price" DOUBLE PRECISION NOT NULL,
    "file" TEXT NOT NULL,
    "owner" TEXT NOT NULL,

    CONSTRAINT "Assets_pkey" PRIMARY KEY ("id")
);

-- AddForeignKey
ALTER TABLE "Assets" ADD CONSTRAINT "Assets_owner_fkey" FOREIGN KEY ("owner") REFERENCES "Users"("address") ON DELETE RESTRICT ON UPDATE CASCADE;
