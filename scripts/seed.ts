import { PrismaClient } from '@prisma/client';
import bcrypt from 'bcrypt';
import {
  invoices,
  customers,
  revenue,
  users,
} from '../app/lib/placeholder-data';

const prisma = new PrismaClient();

async function seedUsers(client: PrismaClient) {
  try {
    await Promise.all(
      users.map( async (user) => client.user.create({data: {...user, password: await bcrypt.hash(user.password, 10)} }))
    )
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedInvoices(client:PrismaClient) {
  try {
    await Promise.all(
      invoices.map( async (invoice) => client.invoices.create({data: { ...invoice, date: (new Date(invoice.date)).toISOString() } }))
    )
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function seedCustomers(client:PrismaClient) {
  try {
    await Promise.all(
      customers.map( async (customer) => client.customers.create({data: { ...customer } }))
    )
  } catch (error) {
    console.error('Error seeding users:', error);
    throw error;
  }
}

async function main() {
  await seedUsers(prisma);
  await seedInvoices(prisma);
  await seedCustomers(prisma);
}

main();

