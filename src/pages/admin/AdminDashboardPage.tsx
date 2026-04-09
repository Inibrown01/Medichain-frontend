import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import {
  AlertTriangle,
  ArrowDownRight,
  ArrowUpRight,
  Box,
  ShieldAlert,
  ShieldCheck,
} from 'lucide-react'
import { Cell, Pie, PieChart, ResponsiveContainer, Tooltip as PieTooltip } from 'recharts'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { AdminGlobalVerificationChart, type GlobalTrendPoint } from '../../components/admin/AdminGlobalVerificationChart'
import { adminFetch, getAdminProfile } from '../../lib/adminApi'
import { IntegrationExplainer } from '../../components/integrations/IntegrationExplainer'

type Stat = { key: string; label: string; value: string; delta: string; deltaPositive: boolean }
type AlertRow = { id: string; kind: string; title: string; meta: string; timeLabel: string }
type AuditRow = {
  id: string
  admin: string
  action: string
  target: string
  timeLabel: string
  status: string
}
type Cat = { name: string; value: number; color: string }

const EMPTY_WEEK: GlobalTrendPoint[] = [
  { label: 'Mon', total: 0, flagged: 0, fakes: 0 },
  { label: 'Tue', total: 0, flagged: 0, fakes: 0 },
  { label: 'Wed', total: 0, flagged: 0, fakes: 0 },
  { label: 'Thu', total: 0, flagged: 0, fakes: 0 },
  { label: 'Fri', total: 0, flagged: 0, fakes: 0 },
  { label: 'Sat', total: 0, flagged: 0, fakes: 0 },
  { label: 'Sun', total: 0, flagged: 0, fakes: 0 },
]

export function AdminDashboardPage() {
  const adminEmail = getAdminProfile()?.email || ''
  const [welcomeDate, setWelcomeDate] = useState(() =>
    new Date().toLocaleDateString('en-US', { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }),
  )
  const [stats, setStats] = useState<Stat[]>([
    { key: 'p', label: 'Total Products', value: '0', delta: '—', deltaPositive: true },
    { key: 'v', label: 'Verifications', value: '0', delta: '—', deltaPositive: true },
    { key: 'f', label: 'Unregistered Lookups', value: '0', delta: '—', deltaPositive: true },
    { key: 'a', label: 'Flagged Verifications', value: '0', delta: '—', deltaPositive: false },
  ])
  const [mode, setMode] = useState<'weekly' | 'monthly'>('weekly')
  const [weekly, setWeekly] = useState(EMPTY_WEEK)
  const [monthly, setMonthly] = useState<GlobalTrendPoint[]>([])
  const [alerts, setAlerts] = useState<AlertRow[]>([])
  const [audit, setAudit] = useState<AuditRow[]>([])
  const [categories, setCategories] = useState<Cat[]>([])
  const [loadError, setLoadError] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await adminFetch('/overview')
        const json = (await res.json()) as { ok?: boolean; data?: Record<string, unknown> }
        if (!res.ok || !json.ok || !json.data) throw new Error('bad')
        const d = json.data
        if (cancelled) return
        setLoadError(false)
        if (typeof d.welcomeDateLabel === 'string') setWelcomeDate(d.welcomeDateLabel)
        if (Array.isArray(d.stats)) setStats(d.stats as Stat[])
        if (Array.isArray(d.chartWeekly) && (d.chartWeekly as GlobalTrendPoint[]).length)
          setWeekly(d.chartWeekly as GlobalTrendPoint[])
        if (Array.isArray(d.chartMonthly) && (d.chartMonthly as GlobalTrendPoint[]).length)
          setMonthly(d.chartMonthly as GlobalTrendPoint[])
        if (Array.isArray(d.alerts)) setAlerts(d.alerts as AlertRow[])
        if (Array.isArray(d.auditLog)) setAudit(d.auditLog as AuditRow[])
        if (Array.isArray(d.categoryBreakdown)) setCategories(d.categoryBreakdown as Cat[])
      } catch {
        if (!cancelled) {
          setLoadError(true)
          setWeekly(EMPTY_WEEK)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const chartData = mode === 'weekly' ? weekly : monthly.length ? monthly : EMPTY_WEEK

  const statIcons = [Box, ShieldCheck, ShieldAlert, AlertTriangle] as const

  const welcomeName = adminEmail ? adminEmail.split('@')[0] : 'Admin'

  return (
    <>
      <div className="mb-6">
        <IntegrationExplainer variant="admin" />
      </div>
      {loadError ? (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-sm text-amber-900">
          Could not load dashboard metrics. Check API URL and admin session.
        </p>
      ) : null}
      <div className="flex flex-col gap-4 sm:flex-row sm:items-start sm:justify-between">
        <div>
          <h1 className="text-2xl font-bold tracking-tight text-brand-secondary sm:text-3xl">
            Welcome back{welcomeName ? `, ${welcomeName}` : ''}
          </h1>
          <p className="mt-1 text-sm font-medium text-brand-muted">{welcomeDate}</p>
        </div>
        <Link
          to="/admin/analytics"
          className="inline-flex h-11 shrink-0 items-center justify-center rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(29,78,216,0.2)]"
        >
          View Analytics
        </Link>
      </div>

      <div className="mt-6 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {stats.map((s, i) => {
          const Icon = statIcons[i] ?? Box
          return (
            <Card key={s.key} className="rounded-2xl p-5" padding="none">
              <div className="p-5">
                <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-slate-50 text-brand-primary ring-1 ring-slate-100">
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-brand-muted">{s.label}</p>
                <p className="mt-1 text-3xl font-bold text-brand-secondary">{s.value}</p>
                <p
                  className={`mt-2 inline-flex items-center gap-1 text-xs font-bold ${
                    s.deltaPositive ? 'text-emerald-600' : 'text-red-600'
                  }`}
                >
                  {s.deltaPositive ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                  {s.delta}
                </p>
              </div>
            </Card>
          )
        })}
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="rounded-3xl p-5" padding="none">
          <div className="flex flex-wrap items-start justify-between gap-3 border-b border-slate-100 p-5 pb-4">
            <div>
              <h3 className="text-lg font-bold text-brand-secondary">Verification Activity</h3>
              <p className="mt-0.5 text-xs font-medium text-brand-muted">Global verification trends over the last 7 days.</p>
            </div>
            <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
              <button
                type="button"
                onClick={() => setMode('weekly')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  mode === 'weekly' ? 'bg-white text-brand-primary shadow-sm' : 'text-brand-muted'
                }`}
              >
                Weekly
              </button>
              <button
                type="button"
                onClick={() => setMode('monthly')}
                className={`rounded-lg px-3 py-1.5 text-xs font-bold transition-colors ${
                  mode === 'monthly' ? 'bg-white text-brand-primary shadow-sm' : 'text-brand-muted'
                }`}
              >
                Monthly
              </button>
            </div>
          </div>
          <div className="p-5 pt-2">
            <AdminGlobalVerificationChart data={chartData.length ? chartData : EMPTY_WEEK} />
          </div>
        </Card>

        <Card className="rounded-3xl p-5" padding="none">
          <div className="border-b border-slate-100 p-5 pb-4">
            <h3 className="text-lg font-bold text-brand-secondary">Urgent Alerts</h3>
          </div>
          <div className="space-y-3 p-5 pt-4">
            {alerts.length === 0 ? (
              <p className="text-sm text-brand-muted">No urgent alerts.</p>
            ) : null}
            {alerts.map((a) => (
              <div
                key={a.id}
                className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-3"
              >
                <span
                  className={`mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl ${
                    a.kind === 'danger' ? 'bg-red-50 text-red-600' : 'bg-amber-50 text-amber-700'
                  }`}
                >
                  {a.kind === 'danger' ? <ShieldAlert className="h-4 w-4" /> : <AlertTriangle className="h-4 w-4" />}
                </span>
                <div className="min-w-0">
                  <p className="text-sm font-bold text-brand-secondary">{a.title}</p>
                  <p className="mt-0.5 text-xs font-medium text-brand-muted">{a.meta}</p>
                  <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{a.timeLabel}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="px-5 pb-5">
            <button
              type="button"
              className="w-full rounded-xl border-2 border-brand-primary py-3 text-sm font-bold text-brand-primary transition-colors hover:bg-blue-50"
            >
              View All Alerts
            </button>
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="rounded-3xl p-0 overflow-hidden">
          <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
            <h3 className="text-lg font-bold text-brand-secondary">Recent Regulatory Activity</h3>
            <button type="button" className="text-sm font-bold text-brand-primary">
              View Audit Log
            </button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full min-w-[640px] text-left text-sm">
              <thead>
                <tr className="border-b border-slate-100 bg-slate-50/50 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
                  <th className="px-5 py-3">Admin</th>
                  <th className="px-3 py-3">Action</th>
                  <th className="px-3 py-3">Target Resource</th>
                  <th className="px-3 py-3">Time Stamp</th>
                  <th className="px-5 py-3 text-right">Status</th>
                </tr>
              </thead>
              <tbody>
                {audit.length === 0 ? (
                  <tr>
                    <td colSpan={5} className="px-5 py-8 text-center text-sm text-brand-muted">
                      No audit records yet.
                    </td>
                  </tr>
                ) : null}
                {audit.map((row) => (
                  <tr key={row.id} className="border-b border-slate-50">
                    <td className="px-5 py-3.5 font-semibold text-brand-secondary">{row.admin}</td>
                    <td className="px-3 py-3.5 font-medium text-brand-muted">{row.action}</td>
                    <td className="px-3 py-3.5 font-medium text-brand-secondary">{row.target}</td>
                    <td className="px-3 py-3.5 text-xs font-medium text-brand-muted">{row.timeLabel}</td>
                    <td className="px-5 py-3.5 text-right">
                      <Badge
                        variant={
                          row.status === 'completed' ? 'success'
                          : row.status === 'pending' ? 'warning'
                          : 'danger'
                        }
                        className="normal-case"
                      >
                        {row.status}
                      </Badge>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </Card>

        <Card className="rounded-3xl p-5">
          <h3 className="text-lg font-bold text-brand-secondary">Registry by verification status</h3>
          <p className="mt-1 text-xs text-brand-muted">Counts from ProductRecord (Genuine / Flagged / Not registered).</p>
          {categories.length === 0 ? (
            <p className="mt-4 text-sm text-brand-muted">No products in the registry yet.</p>
          ) : (
            <>
              <div className="mt-4 h-56">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie
                      data={categories}
                      dataKey="value"
                      nameKey="name"
                      cx="50%"
                      cy="50%"
                      innerRadius={56}
                      outerRadius={80}
                      paddingAngle={2}
                    >
                      {categories.map((c) => (
                        <Cell key={c.name} fill={c.color} stroke="white" strokeWidth={2} />
                      ))}
                    </Pie>
                    <PieTooltip
                      formatter={(value: number, name: string) => [String(value), name]}
                      contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0' }}
                    />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-2">
                {categories.map((c) => {
                  const sum = categories.reduce((s, x) => s + x.value, 0) || 1
                  const pct = Math.round((c.value / sum) * 100)
                  return (
                    <li key={c.name} className="flex items-center justify-between text-xs font-semibold">
                      <span className="flex items-center gap-2 text-brand-secondary">
                        <span className="h-2.5 w-2.5 rounded-full" style={{ backgroundColor: c.color }} />
                        {c.name}
                      </span>
                      <span className="text-brand-muted">{pct}%</span>
                    </li>
                  )
                })}
              </ul>
            </>
          )}
        </Card>
      </div>
    </>
  )
}
