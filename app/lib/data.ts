import { PrismaClient } from "@prisma/client";

const prisma = new PrismaClient();

export async function fetchLatestInvoices() {
  return prisma.invoices.findMany({
    select: {
      customer_id: true
    }
  })
}