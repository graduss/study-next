import { lusitana } from "@/app/ui/font";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "../../ui/dashboard/latest-invoices";
import CardWrapper from "../../ui/dashboard/cards";
import { Suspense } from "react";
import { CardSkeleton, LatestInvoicesSkeleton, RevenueChartSkeleton } from "@/app/ui/skeletons";

export default function DashboardPage () {
  return (
    <main>
      <h1 className={`${lusitana.className} md-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Suspense fallback={ <CardSkeleton /> }>
          <CardWrapper />
        </Suspense>
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <Suspense fallback={<RevenueChartSkeleton />}>
          <RevenueChart />
        </Suspense>

        <Suspense fallback={ <LatestInvoicesSkeleton /> }>
          <LatestInvoices />
        </Suspense>
      </div>
    </main>
  )
}