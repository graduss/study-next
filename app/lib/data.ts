import { PrismaClient } from "@prisma/client";
import {
  Revenue,
  LatestInvoice,
  InvoiceStatus
} from './definitions';
import { formatCurrency } from "./utils";

const prisma = new PrismaClient();

export async function fetchRevenue(): Promise<Revenue[]> {
  await new Promise((res) => setTimeout(res, 3000));
  return prisma.revenue.findMany({
    select: { revenue:true, month: true }
  });
}

export async function fetchLatestInvoices():Promise<LatestInvoice[]> {
  await new Promise((res) => setTimeout(res, 1000));

  return prisma.invoices.findMany({
    select: {
      id: true,
      amount: true,
      customer: {
        select: { name: true, email: true, image_url: true }
      }
    },
    orderBy: { date: 'desc' },
    take: 6
  })
}

const PAGE_SIZE = 6;

export async function fetchFilteredInvoices(query: string = '', currentPage: number = 1) {
  return prisma.invoices.findMany({
    select: {
      id: true,
      amount: true,
      date: true,
      status: true,
      customer: {
        select: { name:true, image_url:true, email:true }
      }
    },
    where: {
      customer: {
        OR: [
          { name: { contains: query } },
          { email: { contains: query } }
        ]
      }
    },
    take: PAGE_SIZE,
    skip: (currentPage - 1) * PAGE_SIZE
  });
}

export async function fetchCardData() {
  const invoiceCount = await prisma.invoices.count();
  const customerCount = await prisma.customers.count();

  const paidInvoice = await prisma.invoices.aggregate({
    _sum: { amount: true },
    where: { status: InvoiceStatus.PAID }
  })
  .then(({_sum}) => formatCurrency(_sum.amount ?? 0));

  const pendingInvoice = await prisma.invoices.aggregate({
    _sum: { amount: true },
    where: { status: InvoiceStatus.PENDING }
  })
  .then(({_sum}) => formatCurrency(_sum.amount ?? 0));

  await new Promise((res) => setTimeout(res, 5000));

  return {
    invoiceCount,
    customerCount,
    paidInvoice,
    pendingInvoice,
  }
}