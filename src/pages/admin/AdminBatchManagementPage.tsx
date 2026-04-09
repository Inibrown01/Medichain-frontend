import { useEffect, useState } from 'react'
import { Download, MoreHorizontal, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { adminFetch } from '../../lib/adminApi'

type Row = {
  id: string
  batchNumber: string
  productName: string
  productId: number | null
  manufacturingDate: string
  expiryDate: string
  verifications: number
  status: string
}

export function AdminBatchManagementPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [q, setQ] = useState('')
  const [filter, setFilter] = useState('all')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const qs = new URLSearchParams()
        if (q.trim()) qs.set('q', q.trim())
        if (filter !== 'all') qs.set('status', filter)
        const res = await adminFetch(`/batches?${qs.toString()}`)
        const json = (await res.json()) as { ok?: boolean; data?: Row[]; message?: string }
        if (!res.ok || !json.ok || !Array.isArray(json.data)) throw new Error(json.message || 'Failed to load')
        if (!cancelled) setRows(json.data)
      } catch (e) {
        if (!cancelled) {
          setRows([])
          setError(e instanceof Error ? e.message : 'Failed to load')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [q, filter])

  return (
    <>
      <PageHeader
        title="Batch Management"
        subtitle="Track production batches, verification volume, and compliance status."
        actions={
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary"
          >
            <Download className="h-4 w-4" />
            Export Batch Data
          </button>
        }
      />

      <Card className="mt-2 rounded-3xl p-0 overflow-hidden" padding="none">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search batches, products..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary"
          >
            <option value="all">All</option>
            <option value="active">Active</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
                <th className="px-5 py-3.5">Batch Number</th>
                <th className="px-3 py-3.5">Product Name</th>
                <th className="px-3 py-3.5">Product ID</th>
                <th className="px-3 py-3.5">Mfg Date</th>
                <th className="px-3 py-3.5">Expiry Date</th>
                <th className="px-3 py-3.5">Verifications</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-brand-muted">
                    Loading…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-red-700">
                    {error}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={8} className="px-5 py-12 text-center text-sm text-brand-muted">
                    No batches found.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-50">
                  <td className="px-5 py-4 font-mono text-sm font-bold text-brand-secondary">{r.batchNumber}</td>
                  <td className="px-3 py-4 font-semibold text-brand-secondary">{r.productName}</td>
                  <td className="px-3 py-4 text-xs font-semibold text-brand-muted">{r.productId ?? '—'}</td>
                  <td className="px-3 py-4 text-xs font-medium text-brand-muted">{r.manufacturingDate}</td>
                  <td className="px-3 py-4 text-xs font-medium text-brand-muted">{r.expiryDate}</td>
                  <td className="px-3 py-4 text-sm font-bold text-brand-secondary">{r.verifications.toLocaleString()}</td>
                  <td className="px-3 py-4">
                    <Badge variant={r.status === 'active' ? 'success' : 'danger'} className="normal-case">
                      {r.status === 'active' ? 'Active' : 'Rejected'}
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/admin/batches/${encodeURIComponent(r.batchNumber)}`}
                      className="inline-flex h-9 w-9 items-center justify-center rounded-xl border border-slate-200 text-brand-muted hover:bg-slate-50"
                    >
                      <MoreHorizontal className="h-4 w-4" />
                    </Link>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
