'use server';
import { redirect } from 'next/navigation';
import { createInvoiceInDB } from './data';
import { CreateInvoiceDto } from './dto/create-invoice.dto';
import { ValidationError, validateOrReject } from 'class-validator';
import { revalidatePath } from 'next/cache';


export async function createInvoice(formData: FormData) {

  const invoiceData = new CreateInvoiceDto;
  invoiceData.customerId = formData.get('customerId') as string;
  invoiceData.amount = Number(formData.get('amount') || Number.NaN) * 100;
  invoiceData.status = formData.get('status') as 'pending' | 'paid'
  invoiceData.date = new Date;

  try {
    await validateOrReject(invoiceData);
    await createInvoiceInDB(invoiceData);

  } catch (error) {
    return { message: (error as ValidationError | Error).toString() }
  }

  revalidatePath('/dashboard/invoices')
  redirect('/dashboard/invoices');
}