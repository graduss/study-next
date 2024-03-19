import { fetchCardData, fetchLatestInvoices, fetchRevenue } from "@/app/lib/data";
import { lusitana } from "@/app/ui/font";
import RevenueChart from "@/app/ui/dashboard/revenue-chart";
import LatestInvoices from "../ui/dashboard/latest-invoices";
import { Card } from "../ui/dashboard/cards";

export default async function DashboardPage () {
  const revenue = await fetchRevenue();
  const latestInvoices = await fetchLatestInvoices();
  const {
    invoiceCount,
    customerCount,
    paidInvoice,
    pendingInvoice
  } = await fetchCardData();

  return (
    <main>
      <h1 className={`${lusitana.className} md-4 text-xl md:text-2xl`}>Dashboard</h1>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4">
        <Card title="Collected" value={ paidInvoice } type="collected" />
        <Card title="Pending" value={ pendingInvoice } type="pending" />
        <Card title="Total Invoices" value={ invoiceCount } type="invoices" />
        <Card title="Total Customers" value={ customerCount } type="customers" />
      </div>
      <div className="mt-6 grid grid-cols-1 gap-6 md:grid-cols-4 lg:grid-cols-8">
        <RevenueChart revenue={revenue} />
        <LatestInvoices latestInvoices={latestInvoices} />
      </div>
    </main>
  )
}