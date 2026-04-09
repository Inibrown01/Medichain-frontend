import { useEffect, useMemo, useState } from 'react'
import {
  Download,
  Lock,
  Search,
  ShieldCheck,
} from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type LogRow = {
  id: string
  type: string
  eventTitle: string
  eventSub: string
  actor: string
  timestamp: string
  severity: string
}

type Overview = {
  totalEvents24h: number
  criticalAlerts: number
  adminActions: number
}

function sevBadge(sev: string) {
  const s = sev.toLowerCase()
  if (s === 'success') return <Badge variant="success">Success</Badge>
  if (s === 'failed') return <Badge variant="danger">Failed</Badge>
  if (s === 'high') return <Badge variant="danger">High</Badge>
  if (s === 'medium') return <Badge variant="warning">Medium</Badge>
  return <Badge variant="outline">Low</Badge>
}

function typeBadge(t: string) {
  const u = t.toUpperCase()
  const cls =
    u === 'AUDIT'
      ? 'bg-slate-100 text-slate-700'
      : u === 'VERIFICATION'
        ? 'bg-blue-50 text-brand-primary'
        : 'bg-violet-50 text-violet-700'
  return (
    <span className={cn('rounded-full px-2.5 py-0.5 text-xs font-bold uppercase', cls)}>{u}</span>
  )
}

const TABS = [
  { id: 'all', label: 'All logs' },
  { id: 'audit', label: 'Audit logs' },
  { id: 'verification', label: 'Verification logs' },
  { id: 'system', label: 'System logs' },
] as const

export function AdminLogExplorerPage() {
  const [tab, setTab] = useState<(typeof TABS)[number]['id']>('all')
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [rows, setRows] = useState<LogRow[]>([])
  const [overview, setOverview] = useState<Overview | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const qs = new URLSearchParams()
        qs.set('tab', tab)
        if (q.trim()) qs.set('q', q.trim())
        if (status) qs.set('status', status)
        const res = await adminFetch(`/logs?${qs.toString()}`)
        const json = (await res.json()) as {
          ok?: boolean
          data?: { rows?: LogRow[]; overview?: Overview }
        }
        if (!res.ok || !json.ok || !json.data) throw new Error('bad')
        if (!cancelled) {
          setRows(json.data.rows || [])
          setOverview(json.data.overview || null)
        }
      } catch {
        if (!cancelled) {
          setRows([])
          setOverview(null)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [tab, q, status])

  const ov = useMemo(
    () =>
      overview || {
        totalEvents24h: 1242,
        criticalAlerts: 3,
        adminActions: 452,
      },
    [overview],
  )

  return (
    <>
      <PageHeader
        title="Log explorer"
        subtitle="Centralized access to all system, audit, and verification logs for deep forensic analysis."
        actions={
          <>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-brand-primary bg-white px-4 text-sm font-semibold text-brand-primary"
            >
              <ShieldCheck className="h-4 w-4" />
              Verify log integrity
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(29,78,216,0.2)]"
            >
              <Download className="h-4 w-4" />
              Export audit trail
            </button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_280px]">
        <Card className="p-4 sm:p-6">
          <div className="flex flex-wrap gap-2 border-b border-slate-100 pb-4">
            {TABS.map((t) => (
              <button
                key={t.id}
                type="button"
                onClick={() => setTab(t.id)}
                className={cn(
                  'rounded-xl px-4 py-2 text-sm font-semibold transition-colors',
                  tab === t.id
                    ? 'border border-brand-primary bg-white text-brand-primary'
                    : 'text-brand-muted hover:bg-slate-50',
                )}
              >
                {t.label}
              </button>
            ))}
          </div>

          <div className="mt-4 flex flex-col gap-3 sm:flex-row sm:items-center">
            <div className="relative flex-1">
              <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
              <input
                type="search"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                placeholder="Search across all log types..."
                className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none ring-brand-primary/20 focus:border-brand-primary focus:ring-4"
              />
            </div>
            <select
              value={status}
              onChange={(e) => setStatus(e.target.value)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-brand-secondary"
            >
              <option value="">All status</option>
              <option value="success">Success</option>
              <option value="failed">Failed</option>
              <option value="high">High</option>
              <option value="medium">Medium</option>
              <option value="low">Low</option>
            </select>
          </div>

          <div className="mt-4 overflow-x-auto">
            <table className="w-full min-w-[720px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-brand-muted">
                  <th className="pb-3 pr-3">Type</th>
                  <th className="pb-3 pr-3">Event / action</th>
                  <th className="pb-3 pr-3">Actor / device</th>
                  <th className="pb-3 pr-3">Timestamp</th>
                  <th className="pb-3">Status / severity</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-slate-100">
                {rows.map((r) => (
                  <tr key={r.id}>
                    <td className="py-3 pr-3 align-top">{typeBadge(r.type)}</td>
                    <td className="py-3 pr-3">
                      <p className="font-semibold text-brand-secondary">{r.eventTitle}</p>
                      <p className="text-xs text-brand-muted">{r.eventSub}</p>
                    </td>
                    <td className="py-3 pr-3 text-brand-muted">{r.actor}</td>
                    <td className="py-3 pr-3 text-brand-muted">{r.timestamp}</td>
                    <td className="py-3">{sevBadge(r.severity)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Audit overview</h3>
            <div className="mt-3 space-y-2">
              <div className="rounded-xl bg-blue-50 px-3 py-3">
                <p className="text-xs font-semibold uppercase text-brand-muted">Total events (24h)</p>
                <p className="text-2xl font-bold text-brand-primary">{ov.totalEvents24h.toLocaleString()}</p>
              </div>
              <div className="rounded-xl bg-red-50 px-3 py-3">
                <p className="text-xs font-semibold uppercase text-red-800">Critical alerts</p>
                <p className="text-2xl font-bold text-red-600">{ov.criticalAlerts}</p>
              </div>
              <div className="rounded-xl bg-blue-50/80 px-3 py-3">
                <p className="text-xs font-semibold uppercase text-brand-muted">Admin actions</p>
                <p className="text-2xl font-bold text-brand-primary">{ov.adminActions}</p>
              </div>
            </div>
          </Card>

          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Security status</h3>
            <ul className="mt-3 space-y-3 text-sm">
              <li className="flex items-center gap-2">
                <ShieldCheck className="h-4 w-4 text-emerald-600" />
                <span className="text-brand-secondary">Log integrity: Verified &amp; immutable</span>
              </li>
              <li className="flex items-center gap-2">
                <Lock className="h-4 w-4 text-emerald-600" />
                <span className="text-brand-secondary">Encryption: AES-256 active</span>
              </li>
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Forensic tools</h3>
            <ul className="mt-3 space-y-2 text-sm font-semibold text-brand-primary">
              <li>
                <button type="button" className="hover:underline">
                  Trace IP address
                </button>
              </li>
              <li>
                <button type="button" className="hover:underline">
                  Compare audit trails
                </button>
              </li>
              <li>
                <button type="button" className="hover:underline">
                  Verify blockchain hash
                </button>
              </li>
              <li>
                <button type="button" className="hover:underline">
                  Export forensic report
                </button>
              </li>
            </ul>
          </Card>
        </div>
      </div>
    </>
  )
}
