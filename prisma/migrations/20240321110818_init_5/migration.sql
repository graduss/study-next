/*
  Warnings:

  - You are about to drop the `Customers` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Invoices` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `Revenue` table. If the table is not empty, all the data it contains will be lost.
  - You are about to drop the `User` table. If the table is not empty, all the data it contains will be lost.

*/
-- DropForeignKey
ALTER TABLE "Invoices" DROP CONSTRAINT "Invoices_customer_id_fkey";

-- DropTable
DROP TABLE "Customers";

-- DropTable
DROP TABLE "Invoices";

-- DropTable
DROP TABLE "Revenue";

-- DropTable
DROP TABLE "User";

-- CreateTable
CREATE TABLE "users" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "password" VARCHAR(255) NOT NULL,

    CONSTRAINT "users_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "invoices" (
    "id" UUID NOT NULL,
    "customer_id" UUID NOT NULL,
    "amount" INTEGER NOT NULL,
    "status" VARCHAR(255) NOT NULL,
    "date" DATE NOT NULL,

    CONSTRAINT "invoices_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "customers" (
    "id" UUID NOT NULL,
    "name" VARCHAR(255) NOT NULL,
    "email" VARCHAR(255) NOT NULL,
    "image_url" VARCHAR(255) NOT NULL,

    CONSTRAINT "customers_pkey" PRIMARY KEY ("id")
);

-- CreateTable
CREATE TABLE "revenues" (
    "id" UUID NOT NULL,
    "month" VARCHAR(4) NOT NULL,
    "revenue" INTEGER NOT NULL,

    CONSTRAINT "revenues_pkey" PRIMARY KEY ("id")
);

-- CreateIndex
CREATE UNIQUE INDEX "users_email_key" ON "users"("email");

-- CreateIndex
CREATE UNIQUE INDEX "customers_email_key" ON "customers"("email");

-- AddForeignKey
ALTER TABLE "invoices" ADD CONSTRAINT "invoices_customer_id_fkey" FOREIGN KEY ("customer_id") REFERENCES "customers"("id") ON DELETE RESTRICT ON UPDATE CASCADE;
