import { PrismaClient } from "@prisma/client";
import {
  Revenue,
  LatestInvoice,
  InvoiceStatus
} from './definitions';
import { formatCurrency } from "./utils";
import { CreateInvoiceDto } from "./dto/create-invoice.dto";

const prisma = new PrismaClient();

export async function fetchRevenue(): Promise<Revenue[]> {
  return prisma.revenue.findMany({
    select: { revenue:true, month: true }
  });
}

export async function fetchLatestInvoices():Promise<LatestInvoice[]> {
  return prisma.invoice.findMany({
    select: {
      id: true,
      amount: true,
      customer: {
        select: { name: true, email: true, imageUrl: true }
      }
    },
    orderBy: { date: 'desc' },
    take: 6
  })
}

const PAGE_SIZE = 6;
const whereByQuery = (query: string) => ({
  where: {
    customer: {
      OR: [
        { name: { contains: query } },
        { email: { contains: query } }
      ]
    }
  }
})

export async function fetchFilteredInvoices(query: string = '', currentPage: number = 1) {
  return prisma.invoice.findMany({
    select: {
      id: true,
      amount: true,
      date: true,
      status: true,
      customer: {
        select: { name:true, imageUrl:true, email:true }
      }
    },
    ...whereByQuery(query),
    orderBy: { date: 'desc' },
    take: PAGE_SIZE,
    skip: (currentPage - 1) * PAGE_SIZE
  });
}

export async function fetchInvoicesPages(query: string) {
  return prisma.invoice.count({
    ...whereByQuery(query)
  })
  .then((count) => Math.ceil(count / PAGE_SIZE));
}

export async function fetchCardData() {
  const invoiceCount = await prisma.invoice.count();
  const customerCount = await prisma.customer.count();

  const paidInvoice = await prisma.invoice.aggregate({
    _sum: { amount: true },
    where: { status: InvoiceStatus.PAID }
  })
  .then(({_sum}) => formatCurrency(_sum.amount ?? 0));

  const pendingInvoice = await prisma.invoice.aggregate({
    _sum: { amount: true },
    where: { status: InvoiceStatus.PENDING }
  })
  .then(({_sum}) => formatCurrency(_sum.amount ?? 0));

  return {
    invoiceCount,
    customerCount,
    paidInvoice,
    pendingInvoice,
  }
}

export async function fetchCustomers() {
  return prisma.customer.findMany({
    select: { id:true, name:true }
  });
}

export async function createInvoiceInDB(dto:CreateInvoiceDto) {
  return prisma.invoice.create({ data: dto });
}

export async function fetchInvoiceById(id:string) {
  return prisma.invoice.findFirst({
    select: {
      customerId:true,
      amount:true,
      status:true,
      date:true
    },
    where: { id }
  })
}