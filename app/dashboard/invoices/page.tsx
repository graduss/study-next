import Search from "@/app/ui/search";
import { InvoicesTableSkeleton } from "@/app/ui/skeletons";
import Table from "@/app/ui/invoices/table";
import { Suspense } from "react";

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

      <section className="mt-4 flex gap-2 item-center">
        <Search placeholder="Search ..." />
      </section>

      <Suspense fallback={ <InvoicesTableSkeleton/> }>
        <Table query={query} currentPage={page}></Table>
      </Suspense>
    </main>
  );
}