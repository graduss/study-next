import { fetchCustomers, fetchInvoiceById } from "@/app/lib/data";
import EditInvoiceForm from "@/app/ui/invoices/edit-form";

export default async function EditInvoicePage(
  { params }: { params: { id: string } }
) {
  
  const [customers, invoice] = await Promise.all([
    fetchCustomers(),
    fetchInvoiceById(params.id)
  ]);

  return (
    <main>
      <EditInvoiceForm invoice={invoice} customers={customers} />
    </main>
  );
}