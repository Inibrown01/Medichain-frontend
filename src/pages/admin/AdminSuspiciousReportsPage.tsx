import { useEffect, useState } from 'react'
import { Clock, Download, OctagonAlert, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { RecallClassCards } from '../../components/admin/RecallClassCards'
import { adminFetch } from '../../lib/adminApi'

type Row = {
  id: string
  reporter: string
  product: string
  batchNumber: string
  location: string
  date: string
  status: string
}

function stBadge(s: string) {
  const x = s.toLowerCase()
  if (x === 'pending') return <Badge variant="warning">Pending</Badge>
  if (x === 'flagged' || x === 'escalated') return <Badge variant="danger">{s}</Badge>
  return <Badge variant="outline">{s}</Badge>
}

export function AdminSuspiciousReportsPage() {
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
        const qs = q.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''
        const res = await adminFetch(`/suspicious-reports${qs}`)
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
  }, [q])

  return (
    <>
      <PageHeader
        title="Suspicious Reports"
        subtitle="Review and investigate reports of counterfeit or suspicious products from the public."
        actions={
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary"
            >
              <Clock className="h-4 w-4" />
              View Full History
            </button>
            <Link
              to="/admin/recalls/new"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white"
            >
              <OctagonAlert className="h-4 w-4" />
              Issue New Recall
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
              placeholder="Search reports, locations..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
            />
          </div>
          <button
            type="button"
            className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary"
          >
            <Download className="h-4 w-4" />
            Export Reports
          </button>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[900px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
                <th className="px-5 py-3.5">Reporter</th>
                <th className="px-3 py-3.5">Product</th>
                <th className="px-3 py-3.5">Location</th>
                <th className="px-3 py-3.5">Date</th>
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
              ) : error ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-red-700">
                    {error}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm text-brand-muted">
                    No reports.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                <tr key={r.id} className="border-b border-slate-50">
                  <td className="px-5 py-4 font-bold text-brand-secondary">{r.reporter}</td>
                  <td className="px-3 py-4">
                    <p className="font-semibold text-brand-secondary">{r.product}</p>
                    {r.batchNumber ? <p className="text-xs text-brand-muted">Batch: {r.batchNumber}</p> : null}
                  </td>
                  <td className="px-3 py-4 text-sm font-medium text-brand-muted">{r.location}</td>
                  <td className="px-3 py-4 text-xs font-semibold text-brand-muted">{r.date}</td>
                  <td className="px-3 py-4">{stBadge(r.status)}</td>
                  <td className="px-5 py-4 text-right">
                    <Link
                      to={`/admin/suspicious/${r.id}`}
                      className="rounded-xl border border-brand-primary px-4 py-2 text-xs font-bold text-brand-primary"
                    >
                      View Report
                    </Link>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <RecallClassCards />
    </>
  )
}
