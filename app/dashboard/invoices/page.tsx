import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Table from "@/app/ui/invoices/table";
import { Suspense } from "react";
import Pagination from "@/app/ui/invoices/pagination";
import { CreateInvoice } from "@/app/ui/invoices/buttons";

export default function InvoicesPage (
  { searchParams }: { searchParams?: { query?: string, page?: string } }
) {
  const query = searchParams?.query ?? '';
  const page = Number(searchParams?.page ?? 1);

  return (
    <main className="w-full">
      <header>
        <h1>Invoices</h1>
      </header>

      <section className="mt-4 flex gap-2 item-center justify-between">
        <Search placeholder="Search ..." />
        <CreateInvoice />
      </section>

      <Suspense key={query + page} fallback={ <InvoicesTableSkeleton/> }>
        <Table query={query} currentPage={page}></Table>
      </Suspense>

      <footer className="mt-5 flex w-full justify-centerr">
        <Suspense key={query + page} fallback="Loadding ...">
          <Pagination query={query} currentPage={page} />
        </Suspense>
      </footer>
    </main>
  );
}