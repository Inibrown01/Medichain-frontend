import { useEffect, useState } from 'react'
import { Download, MoreHorizontal, Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { adminFetch } from '../../lib/adminApi'

type Row = {
  productId: number
  productName: string
  category: string
  manufacturer: string
  nafdacNumber: string
  approvalDate: string
  status: string
}

function statusBadge(status: string) {
  if (status === 'verified') return <Badge variant="success">Verified</Badge>
  if (status === 'flagged') return <Badge variant="warning">Flagged</Badge>
  return <Badge variant="danger">Rejected</Badge>
}

export function AdminProductsPage() {
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
        const res = await adminFetch(`/products?${qs.toString()}`)
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
        title="Products Management"
        subtitle="Monitor and manage all registered medical products on the platform."
        actions={
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary"
            >
              <Download className="h-4 w-4" />
              Export Data
            </button>
            <Link
              to="/admin/approvals"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              Pending approvals
            </Link>
          </div>
        }
      />

      <Card className="mt-2 rounded-3xl p-0 overflow-hidden" padding="none">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search products, NAFDAC numbers..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
            />
          </div>
          <select
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary"
          >
            <option value="all">All</option>
            <option value="verified">Verified</option>
            <option value="flagged">Flagged</option>
            <option value="rejected">Rejected</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
                <th className="px-5 py-3.5">Product Name</th>
                <th className="px-3 py-3.5">Manufacturer</th>
                <th className="px-3 py-3.5">NAFDAC No</th>
                <th className="px-3 py-3.5">Approval Date</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Actions</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-brand-muted">
                    Loading…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-red-700">
                    {error}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-brand-muted">
                    No products found.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                <tr key={r.productId} className="border-b border-slate-50">
                  <td className="px-5 py-4">
                    <div className="flex items-center gap-3">
                      <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-slate-100 text-brand-primary">
                        <span className="text-xs font-bold">Rx</span>
                      </span>
                      <div>
                        <Link
                          to={`/admin/products/${r.productId}`}
                          className="font-bold text-brand-secondary hover:text-brand-primary"
                        >
                          {r.productName}
                        </Link>
                        <p className="text-xs font-medium text-brand-muted">{r.category}</p>
                      </div>
                    </div>
                  </td>
                  <td className="px-3 py-4 font-medium text-brand-secondary">{r.manufacturer}</td>
                  <td className="px-3 py-4 font-mono text-xs font-semibold text-brand-muted">{r.nafdacNumber}</td>
                  <td className="px-3 py-4 text-xs font-semibold text-brand-muted">{r.approvalDate}</td>
                  <td className="px-3 py-4">{statusBadge(r.status)}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/admin/products/${r.productId}`}
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
