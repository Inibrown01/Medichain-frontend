import { useEffect, useState } from 'react'
import { Download, Plus, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { adminFetch } from '../../lib/adminApi'

type Row = {
  id: string
  productName: string
  category: string
  manufacturerName: string
  nafdacNumber: string
  submissionDate: string
  status: string
}

export function ProductApprovalsPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const res = await adminFetch(`/product-approvals?q=${encodeURIComponent(q)}`)
        const json = (await res.json()) as { ok?: boolean; data?: Row[]; message?: string }
        if (!res.ok || !json.ok || !Array.isArray(json.data)) throw new Error(json.message || 'Failed to load')
        if (!cancelled) setRows(json.data)
      } catch (e) {
        if (!cancelled) {
          setRows([])
          setError(e instanceof Error ? e.message : 'Could not load approvals')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [q])

  return (
    <>
      <PageHeader
        title="Product Approvals"
        subtitle="Review and approve new product submissions from manufacturers."
        actions={
          <Link
            to="/admin/products"
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(29,78,216,0.2)]"
          >
            <Plus className="h-4 w-4" />
            Registered products
          </Link>
        }
      />

      {error ? (
        <p className="mt-2 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
      ) : null}

      <Card className="mt-2 rounded-3xl p-0 overflow-hidden" padding="none">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search submissions..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center justify-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary transition-colors hover:bg-slate-50"
          >
            <Download className="h-4 w-4" />
            Export List
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
                <th className="px-5 py-3.5">Product</th>
                <th className="px-3 py-3.5">Manufacturers</th>
                <th className="px-3 py-3.5">NAFDAC Number</th>
                <th className="px-3 py-3.5">Submission Date</th>
                <th className="px-3 py-3.5">Status</th>
                <th className="px-5 py-3.5 text-right">Action</th>
              </tr>
            </thead>
            <tbody>
              {loading ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-brand-muted">
                    Loading…
                  </td>
                </tr>
              ) : null}
              {!loading && rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-brand-muted">
                    No pending submissions.
                  </td>
                </tr>
              ) : null}
              {!loading &&
                rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-50">
                  <td className="px-5 py-4">
                    <p className="font-bold text-brand-secondary">{r.productName}</p>
                    <p className="text-xs font-medium text-brand-muted">{r.category}</p>
                  </td>
                  <td className="px-3 py-4 font-medium text-brand-secondary">{r.manufacturerName}</td>
                  <td className="px-3 py-4 font-mono text-xs font-semibold text-brand-muted">{r.nafdacNumber}</td>
                  <td className="px-3 py-4 text-xs font-semibold text-brand-muted">{r.submissionDate}</td>
                  <td className="px-3 py-4">
                    <Badge variant="warning" className="normal-case">
                      Pending
                    </Badge>
                  </td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/admin/approvals/${r.id}`}
                      className="inline-flex items-center gap-1 rounded-xl border border-brand-primary bg-white px-4 py-2 text-xs font-bold text-brand-primary transition-colors hover:bg-blue-50"
                    >
                      Review Submission
                      <span aria-hidden>→</span>
                    </Link>
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
