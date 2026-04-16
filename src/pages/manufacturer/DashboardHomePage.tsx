import { useEffect, useState } from 'react'
import {
  AlertTriangle,
  Box,
  Flag,
  Layers,
  Package,
  PackageCheck,
  Plus,
  ChartNoAxesCombined,
  ShieldCheck,
  QrCode,
} from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../../components/ui/Card'
import { PageHeader, VerificationActivityChart, type VerificationDayPoint } from '../../components/dashboard'
import { apiBaseUrl } from '../../lib/chainConfig'
import { fetchManufacturerSummary, getManufacturerProfile, type ManufacturerSummary } from '../../lib/manufacturerApi'

type RecentRow = { kind: string; title: string; meta: string; timeLabel: string }

const emptyWeek: VerificationDayPoint[] = [
  { label: 'Mon', checks: 0, fake: 0 },
  { label: 'Tue', checks: 0, fake: 0 },
  { label: 'Wed', checks: 0, fake: 0 },
  { label: 'Thu', checks: 0, fake: 0 },
  { label: 'Fri', checks: 0, fake: 0 },
  { label: 'Sat', checks: 0, fake: 0 },
  { label: 'Sun', checks: 0, fake: 0 },
]

function dashboardAnalyticsUrl(companyName: string | undefined) {
  const qs = new URLSearchParams()
  if (companyName?.trim()) qs.set('manufacturer', companyName.trim())
  const q = qs.toString()
  return `${apiBaseUrl}/analytics/dashboard${q ? `?${q}` : ''}`
}

function ActivityIcon({ kind }: { kind: string }) {
  if (kind === 'ok') {
    return (
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-600 ring-1 ring-emerald-100">
        <ShieldCheck className="h-4 w-4" />
      </span>
    )
  }
  if (kind === 'flag') {
    return (
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-red-50 text-red-600 ring-1 ring-red-100">
        <Flag className="h-4 w-4" />
      </span>
    )
  }
  if (kind === 'warn') {
    return (
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-amber-50 text-amber-600 ring-1 ring-amber-100">
        <AlertTriangle className="h-4 w-4" />
      </span>
    )
  }
  if (kind === 'batch') {
    return (
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
        <Layers className="h-4 w-4" />
      </span>
    )
  }
  if (kind === 'product') {
    return (
      <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-blue-600 ring-1 ring-blue-100">
        <Package className="h-4 w-4" />
      </span>
    )
  }
  return (
    <span className="mt-0.5 inline-flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-slate-50 text-brand-primary ring-1 ring-slate-200">
      <ShieldCheck className="h-4 w-4" />
    </span>
  )
}

function buildStats(s: ManufacturerSummary) {
  return [
    { label: 'Total applications', value: String(s.totalApplications), meta: 'All time', icon: Box, color: 'text-blue-600 bg-blue-50' },
    {
      label: 'Approved',
      value: String(s.approved),
      meta: 'Registered on-chain after approval',
      icon: PackageCheck,
      color: 'text-emerald-600 bg-emerald-50',
    },
    { label: 'Pending', value: String(s.pending), meta: 'Awaiting review', icon: Box, color: 'text-green-700 bg-green-50' },
    {
      label: 'Changes requested',
      value: String(s.changesRequested),
      meta: 'Resubmit required',
      icon: ChartNoAxesCombined,
      color: 'text-teal-700 bg-teal-50',
    },
    { label: 'Rejected', value: String(s.rejected), meta: 'Not approved', icon: Flag, color: 'text-red-600 bg-red-50' },
  ] as const
}

export function DashboardHomePage() {
  const profile = getManufacturerProfile()
  const [summary, setSummary] = useState<ManufacturerSummary | null>(null)
  const [week, setWeek] = useState<VerificationDayPoint[]>(emptyWeek)
  const [recent, setRecent] = useState<RecentRow[]>([])
  const [analyticsError, setAnalyticsError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const sm = await fetchManufacturerSummary()
        if (!cancelled) setSummary(sm)
      } catch {
        if (!cancelled) setSummary(null)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  useEffect(() => {
    const name = summary?.companyName || profile?.companyName
    const url = dashboardAnalyticsUrl(name)
    let cancelled = false
    ;(async () => {
      setAnalyticsError(null)
      try {
        const res = await fetch(url)
        const json = await res.json()
        if (!res.ok || !json?.ok || !json?.data) throw new Error(json?.message || 'Analytics unavailable')
        const w = json.data.verificationWeek
        const r = json.data.recentActivity
        if (!cancelled && Array.isArray(w) && w.length > 0) {
          setWeek(
            w.map((d: { label: string; checks?: number; fake?: number }) => ({
              label: d.label,
              checks: Number(d.checks) || 0,
              fake: Number(d.fake) || 0,
            })),
          )
        } else if (!cancelled) {
          setWeek(emptyWeek)
        }
        if (!cancelled && Array.isArray(r) && r.length > 0) {
          setRecent(
            r.map((row: RecentRow) => ({
              kind: row.kind || 'info',
              title: row.title,
              meta: row.meta,
              timeLabel: row.timeLabel,
            })),
          )
        } else if (!cancelled) {
          setRecent([])
        }
      } catch (e) {
        if (!cancelled) {
          setWeek(emptyWeek)
          setRecent([])
          setAnalyticsError(e instanceof Error ? e.message : 'Analytics failed')
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [summary, profile?.companyName])

  const stats = summary ? buildStats(summary) : []
  const titleName = summary?.companyName || profile?.companyName || 'Manufacturer'

  return (
    <>
      <PageHeader
        title={`Welcome back, ${titleName}`}
        subtitle="Application pipeline and verification activity for your company name on the registry."
        actions={
          <>
            <Link
              to="/manufacturer/batches/new"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-brand-primary bg-white px-5 text-sm font-semibold text-brand-primary"
            >
              <Plus className="h-4 w-4" />
              New Batch
            </Link>
            <Link
              to="/manufacturer/products/new"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white"
            >
              <Plus className="h-4 w-4" />
              Register Product
            </Link>
          </>
        }
      />

      <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-5">
        {summary ?
          stats.map((s) => (
            <Card key={s.label} className="rounded-2xl p-4">
              <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${s.color}`}>
                <s.icon className="h-5 w-5" />
              </span>
              <p className="mt-3 text-sm font-semibold text-brand-muted">{s.label}</p>
              <p className="mt-1 text-3xl font-bold text-brand-secondary">{s.value}</p>
              <p className="mt-2 text-xs font-semibold text-brand-muted">{s.meta}</p>
            </Card>
          ))
        : <p className="col-span-full rounded-2xl border border-amber-100 bg-amber-50 px-4 py-3 text-sm text-amber-900">
            Could not load application summary. Check that you are logged in and the API is reachable.
          </p>
        }
      </div>

      <div className="mt-6 grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <Card className="rounded-3xl p-5 shadow-[var(--shadow-brand-md)]">
          <div className="flex flex-wrap items-start justify-between gap-2">
            <h3 className="text-lg font-bold text-brand-secondary">Verification Activity</h3>
            {analyticsError ?
              <span className="rounded-lg bg-amber-50 px-2 py-1 text-[10px] font-bold uppercase tracking-wide text-amber-800">
                {analyticsError}
              </span>
            : null}
          </div>
          <p className="mt-1 text-xs font-medium text-brand-muted">
            Genuine checks (blue) vs suspicious / unregistered lookups (red), UTC week Mon–Sun. Filtered by your
            manufacturer name in ProductRecord.
          </p>
          <div className="mt-4 rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50/80 to-white px-2 pb-2 pt-4">
            <VerificationActivityChart data={week} />
          </div>
        </Card>

        <Card className="rounded-3xl p-5 shadow-[var(--shadow-brand-md)]">
          <div className="mb-3 flex items-center justify-between">
            <h3 className="text-lg font-bold text-brand-secondary">Recent Activity</h3>
          </div>
          <div className="space-y-3">
            {recent.length === 0 ?
              <p className="text-sm text-brand-muted">No verification events this period.</p>
            : recent.map((row, i) => (
                <div key={`${row.title}-${i}`} className="flex gap-3 rounded-xl bg-slate-50 p-3">
                  <ActivityIcon kind={row.kind} />
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-semibold text-brand-secondary">{row.title}</p>
                    <p className="text-xs font-medium text-brand-muted">{row.meta}</p>
                    <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-slate-400">{row.timeLabel}</p>
                  </div>
                </div>
              ))
            }
          </div>
        </Card>
      </div>

      <div className="mt-6 grid gap-4 md:grid-cols-3">
        <Link
          to="/manufacturer/products/new"
          className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[var(--shadow-brand-md)] transition-shadow hover:shadow-lg"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-blue-50 text-blue-600 ring-1 ring-blue-100">
            <Package className="h-7 w-7" />
          </span>
          <p className="mt-4 text-sm font-bold text-brand-secondary">Register Product</p>
          <p className="mt-2 text-xs font-medium text-brand-muted">Submit a new SKU for approval.</p>
        </Link>
        <Link
          to="/manufacturer/batches/new"
          className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[var(--shadow-brand-md)] transition-shadow hover:shadow-lg"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
            <Layers className="h-7 w-7" />
          </span>
          <p className="mt-4 text-sm font-bold text-brand-secondary">Add Batch</p>
          <p className="mt-2 text-xs font-medium text-brand-muted">Create a production batch record.</p>
        </Link>
        <Link
          to="/manufacturer/qr-codes/product-level"
          className="flex flex-col items-center rounded-3xl border border-slate-100 bg-white p-8 text-center shadow-[var(--shadow-brand-md)] transition-shadow hover:shadow-lg"
        >
          <span className="inline-flex h-14 w-14 items-center justify-center rounded-full bg-emerald-50 text-emerald-700 ring-1 ring-emerald-100">
            <QrCode className="h-7 w-7" />
          </span>
          <p className="mt-4 text-sm font-bold text-brand-secondary">Generate QR Code</p>
          <p className="mt-2 text-xs font-medium text-brand-muted">Download packaging-ready codes.</p>
        </Link>
      </div>
    </>
  )
}
