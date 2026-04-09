import { useEffect, useState } from 'react'
import { Clock, OctagonAlert, Search } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { RecallClassCards } from '../../components/admin/RecallClassCards'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type Row = {
  id: string
  productName: string
  batches: string
  manufacturerName: string
  reason: string
  riskAnalysis: string
  severity: string
  date: string
  status: string
}

function sevBadge(s: string) {
  const x = s.toLowerCase()
  if (x === 'high') return <Badge variant="danger">High</Badge>
  if (x === 'medium') return <Badge variant="warning">Medium</Badge>
  return <Badge variant="outline">Low</Badge>
}

export function AdminRecallManagementPage() {
  const [tab, setTab] = useState<'pending' | 'history'>('pending')
  const [rows, setRows] = useState<Row[]>([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [review, setReview] = useState<Row | null>(null)
  const [approveOpen, setApproveOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const qs = new URLSearchParams()
        qs.set('tab', tab)
        if (q.trim()) qs.set('q', q.trim())
        const res = await adminFetch(`/recalls?${qs.toString()}`)
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
  }, [tab, q])

  const display = rows
  const pendingCount = rows.filter((r) => r.status === 'pending').length

  const approve = async () => {
    if (!review) return
    setBusy(true)
    try {
      await adminFetch(`/recalls/${review.id}/approve`, { method: 'POST' })
      setApproveOpen(false)
      setReview(null)
      setRows((r) => r.filter((x) => x.id !== review.id))
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Recall Management"
        subtitle="Approve manufacturer recall requests or issue regulatory recalls."
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

      <div className="flex gap-2 border-b border-slate-200">
        <button
          type="button"
          onClick={() => setTab('pending')}
          className={cn(
            '-mb-px border-b-2 px-4 py-3 text-sm font-bold',
            tab === 'pending' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-muted',
          )}
        >
          Pending Requests ({pendingCount})
        </button>
        <button
          type="button"
          onClick={() => setTab('history')}
          className={cn(
            '-mb-px border-b-2 px-4 py-3 text-sm font-bold',
            tab === 'history' ? 'border-brand-primary text-brand-primary' : 'border-transparent text-brand-muted',
          )}
        >
          Recall History
        </button>
      </div>

      <Card className="mt-4 rounded-3xl p-0 overflow-hidden" padding="none">
        <div className="flex flex-col gap-3 border-b border-slate-100 p-4 sm:flex-row sm:items-center sm:justify-between sm:px-5">
          <div className="relative max-w-md flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search recalls..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
            />
          </div>
          <select className="h-11 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary">
            <option>All Status</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[960px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
                <th className="px-5 py-3.5">Product / Batch</th>
                <th className="px-3 py-3.5">Manufacturer</th>
                <th className="px-3 py-3.5">Reason</th>
                <th className="px-3 py-3.5">Severity</th>
                <th className="px-3 py-3.5">Date</th>
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
              ) : display.length === 0 ? (
                <tr>
                  <td colSpan={6} className="px-5 py-12 text-center text-sm font-medium text-brand-muted">
                    No recalls in this view.
                  </td>
                </tr>
              ) : (
                display.map((r) => (
                  <tr key={r.id} className="border-b border-slate-50">
                    <td className="px-5 py-4">
                      <p className="font-bold text-brand-secondary">{r.productName}</p>
                      <p className="text-xs font-semibold text-brand-muted">Batches: {r.batches}</p>
                    </td>
                    <td className="px-3 py-4 font-medium text-brand-secondary">{r.manufacturerName}</td>
                    <td className="max-w-[220px] px-3 py-4 text-xs font-medium text-brand-muted">{r.reason}</td>
                    <td className="px-3 py-4">{sevBadge(r.severity)}</td>
                    <td className="px-3 py-4 text-xs font-semibold text-brand-muted">{r.date}</td>
                    <td className="px-5 py-4 text-right">
                      {tab === 'pending' ?
                        <div className="flex justify-end gap-2">
                          <button
                            type="button"
                            onClick={() => setReview(r)}
                            className="rounded-xl border border-brand-primary px-3 py-2 text-xs font-bold text-brand-primary"
                          >
                            Review
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              setReview(r)
                              setApproveOpen(true)
                            }}
                            className="rounded-xl bg-emerald-600 px-3 py-2 text-xs font-bold text-white"
                          >
                            Approve
                          </button>
                        </div>
                      : <span className="text-xs font-bold uppercase text-brand-muted">{r.status}</span>}
                    </td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <RecallClassCards />

      <Modal
        open={Boolean(review) && !approveOpen}
        onClose={() => setReview(null)}
        title="Review Recall Request"
        size="lg"
        wide
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setReview(null)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              onClick={() => setApproveOpen(true)}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white"
            >
              Proceed to Approve
            </button>
          </div>
        }
      >
        {review ?
          <div className="space-y-4">
            <div className="grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-[10px] font-bold uppercase text-brand-muted">Manufacturer</p>
                <p className="mt-1 text-sm font-bold text-brand-secondary">{review.manufacturerName}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-3">
                <p className="text-[10px] font-bold uppercase text-brand-muted">Severity</p>
                <div className="mt-1">{sevBadge(review.severity)}</div>
              </div>
            </div>
            <div>
              <p className="text-[10px] font-bold uppercase text-brand-muted">Reason for Recall</p>
              <div className="mt-2 rounded-xl border border-blue-100 bg-blue-50/80 p-3 text-sm text-brand-secondary">
                {review.reason}
              </div>
            </div>
            {review.riskAnalysis ?
              <div>
                <p className="text-[10px] font-bold uppercase text-brand-muted">Risk Analysis</p>
                <div className="mt-2 rounded-xl border border-red-100 bg-red-50/80 p-3 text-sm text-red-900">
                  {review.riskAnalysis}
                </div>
              </div>
            : null}
          </div>
        : null}
      </Modal>

      <Modal
        open={approveOpen && Boolean(review)}
        onClose={() => setApproveOpen(false)}
        title="Approve Product Recall"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setApproveOpen(false)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={approve}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Confirm Approval
            </button>
          </div>
        }
      >
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          Approving triggers an immediate public alert and notifies pharmacies and wholesalers to halt affected batches.
        </div>
      </Modal>
    </>
  )
}
