import { Download, MoreVertical, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

const rows = [
  {
    name: 'Paracetamol 500mg',
    category: 'Analgesics',
    status: 'Approved' as const,
    batches: '12',
    verifications: '4.2k',
  },
  {
    name: 'Amoxicillin 250mg',
    category: 'Antibiotics',
    status: 'Pending' as const,
    batches: '4',
    verifications: '1.1k',
  },
  {
    name: 'Vitamin D3 1000IU',
    category: 'Supplements',
    status: 'Rejected' as const,
    batches: '0',
    verifications: '—',
  },
]

function statusBadge(status: (typeof rows)[number]['status']) {
  if (status === 'Approved') return <Badge variant="success">Approved</Badge>
  if (status === 'Pending') return <Badge variant="warning">Pending</Badge>
  return <Badge variant="danger">Rejected</Badge>
}

export function ProductRegistryPage() {
  return (
    <>
      <PageHeader
        title="Product Registry"
        subtitle="Manage your approved products and their lifecycle."
        actions={
          <Link to="/manufacturer/products/new">
            <Button size="lg" className="rounded-xl px-5">
              + Register Product
            </Button>
          </Link>
        }
      />

      <Card padding="none" className="overflow-hidden rounded-3xl">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              placeholder="Search products..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100"
            />
          </div>
          <Button variant="secondary" size="md" className="rounded-xl" leftIcon={<Download className="h-4 w-4" />}>
            Export
          </Button>
        </div>

        <div className="overflow-x-auto">
          <table className="min-w-[900px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-6 py-4">Product name</th>
                <th className="px-6 py-4">Category</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4">Number of batches</th>
                <th className="px-6 py-4">Verifications</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.name} className="bg-white">
                  <td className="px-6 py-4">
                    <div className="flex items-center gap-3">
                      <span className="h-10 w-10 shrink-0 rounded-lg bg-slate-100" />
                      <span className="font-semibold text-brand-secondary">{r.name}</span>
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-brand-muted">{r.category}</td>
                  <td className="px-6 py-4">{statusBadge(r.status)}</td>
                  <td className="px-6 py-4 font-semibold text-brand-secondary">{r.batches}</td>
                  <td className="px-6 py-4 font-semibold text-brand-secondary">{r.verifications}</td>
                  <td className="px-6 py-4 text-right">
                    <button
                      type="button"
                      className="inline-flex h-9 w-9 items-center justify-center rounded-lg text-slate-500 hover:bg-slate-50"
                      aria-label="Row actions"
                    >
                      <MoreVertical className="h-4 w-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
