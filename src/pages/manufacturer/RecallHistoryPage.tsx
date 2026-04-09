import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

const rows = [
  {
    product: 'Paracetamol 500mg',
    batch: 'BTH-2022-001',
    reason: 'Packaging defect',
    date: '2022-03-10',
    status: 'Approved' as const,
  },
  {
    product: 'Amoxicillin 250mg',
    batch: 'BTH-2026-002',
    reason: 'Quality concern',
    date: '2026-03-15',
    status: 'Pending' as const,
  },
]

export function RecallHistoryPage() {
  return (
    <>
      <PageHeader
        title="Recall History"
        subtitle="Track the status of your recall requests"
        actions={
          <Link to="/manufacturer/recalls/new">
            <Button size="lg" className="rounded-xl px-5">
              + New Request
            </Button>
          </Link>
        }
      />

      <Card padding="none" className="overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="min-w-[880px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Batch</th>
                <th className="px-6 py-4">Reason</th>
                <th className="px-6 py-4">Date</th>
                <th className="px-6 py-4">Status</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={`${r.product}-${r.batch}`} className="bg-white">
                  <td className="px-6 py-4 font-semibold text-brand-secondary">{r.product}</td>
                  <td className="px-6 py-4 font-medium text-brand-muted">{r.batch}</td>
                  <td className="px-6 py-4 font-medium text-brand-secondary">{r.reason}</td>
                  <td className="px-6 py-4 font-medium text-brand-muted">{r.date}</td>
                  <td className="px-6 py-4">
                    {r.status === 'Approved' ? (
                      <Badge variant="success">Approved</Badge>
                    ) : (
                      <Badge variant="warning">Pending</Badge>
                    )}
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
