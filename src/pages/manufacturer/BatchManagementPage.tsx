import { MoreVertical } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

const rows = [
  {
    batch: 'BTH-2026-001',
    product: 'Paracetamol 500mg',
    mfg: '2026-01-10',
    exp: '2028-01-10',
    verifications: '842',
    status: 'Active' as const,
  },
  {
    batch: 'BTH-2026-002',
    product: 'Amoxicillin 250mg',
    mfg: '2026-02-02',
    exp: '2027-02-02',
    verifications: '312',
    status: 'Recalled' as const,
  },
]

export function BatchManagementPage() {
  return (
    <>
      <PageHeader
        title="Batch Management"
        subtitle="Monitor and manage your production batches."
        actions={
          <Link to="/manufacturer/batches/new">
            <Button size="lg" className="rounded-xl px-5">
              + New Batch
            </Button>
          </Link>
        }
      />

      <Card padding="none" className="overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="min-w-[960px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-6 py-4">Batch number</th>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Manufacturing date</th>
                <th className="px-6 py-4">Expiry date</th>
                <th className="px-6 py-4">Verifications</th>
                <th className="px-6 py-4">Status</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={r.batch} className="bg-white">
                  <td className="px-6 py-4 font-bold text-brand-secondary">{r.batch}</td>
                  <td className="px-6 py-4 font-medium text-brand-secondary">{r.product}</td>
                  <td className="px-6 py-4 font-medium text-brand-muted">{r.mfg}</td>
                  <td className="px-6 py-4 font-medium text-brand-muted">{r.exp}</td>
                  <td className="px-6 py-4 font-semibold text-brand-secondary">{r.verifications}</td>
                  <td className="px-6 py-4">
                    {r.status === 'Active' ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="danger">Recalled</Badge>
                    )}
                  </td>
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
