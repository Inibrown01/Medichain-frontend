import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

const rows = [
  { product: 'Paracetamol 500mg', batch: 'BTH-2022-001', date: '2022-03-10' },
  { product: 'Amoxicillin 250mg', batch: 'BTH-2026-002', date: '2026-03-15' },
]

export function QrLibraryPage() {
  return (
    <>
      <PageHeader
        title="QR Code Library"
        subtitle="History of all generated QR codes and labels."
        actions={
          <Link to="/manufacturer/qr-codes/product-level">
            <Button size="lg" className="rounded-xl px-5">
              + Generate New
            </Button>
          </Link>
        }
      />

      <Card padding="none" className="overflow-hidden rounded-3xl">
        <div className="overflow-x-auto">
          <table className="min-w-[800px] w-full text-left text-sm">
            <thead className="bg-slate-50 text-[11px] font-bold uppercase tracking-wide text-brand-muted">
              <tr>
                <th className="px-6 py-4">Product</th>
                <th className="px-6 py-4">Batch</th>
                <th className="px-6 py-4">QR preview</th>
                <th className="px-6 py-4">Generated date</th>
                <th className="px-6 py-4 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {rows.map((r) => (
                <tr key={`${r.product}-${r.batch}`} className="bg-white">
                  <td className="px-6 py-4 font-bold text-brand-secondary">{r.product}</td>
                  <td className="px-6 py-4 font-medium text-brand-muted">{r.batch}</td>
                  <td className="px-6 py-4">
                    <div className="inline-grid h-14 w-14 place-items-center rounded-lg bg-white ring-1 ring-slate-200">
                      <div className="h-10 w-10 bg-[repeating-linear-gradient(0deg,#000_0,#000_1px,transparent_1px,transparent_2px),repeating-linear-gradient(90deg,#000_0,#000_1px,transparent_1px,transparent_2px)]" />
                    </div>
                  </td>
                  <td className="px-6 py-4 font-medium text-brand-muted">{r.date}</td>
                  <td className="px-6 py-4 text-right">
                    <button type="button" className="text-sm font-bold text-brand-primary">
                      Download
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
