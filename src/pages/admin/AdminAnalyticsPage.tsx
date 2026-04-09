import { useEffect, useState } from 'react'
import { ArrowDownRight, ArrowUpRight, Clock, Download, ShieldAlert, ShieldCheck } from 'lucide-react'
import {
  Bar,
  BarChart,
  CartesianGrid,
  Cell,
  Line,
  LineChart,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type Kpi = {
  key: string
  label: string
  value: string
  delta: string
  deltaUp: boolean
  good: boolean
}

type TrendPoint = { label: string; verifications: number; fakes: number }
type Cat = { name: string; value: number; color: string }
type Region = { city: string; risk: number }

const RANGE_OPTS = [
  { id: '7d' as const, label: '7 days' },
  { id: '30d' as const, label: '30 days' },
  { id: '90d' as const, label: '90 days' },
]

export function AdminAnalyticsPage() {
  const [range, setRange] = useState<'7d' | '30d' | '90d'>('7d')
  const [kpis, setKpis] = useState<Kpi[]>([])
  const [trend, setTrend] = useState<TrendPoint[]>([])
  const [categories, setCategories] = useState<Cat[]>([])
  const [regional, setRegional] = useState<Region[]>([])
  const [devices, setDevices] = useState<Cat[]>([])

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await adminFetch(`/analytics/regulatory?range=${range}`)
        const json = (await res.json()) as {
          ok?: boolean
          data?: {
            kpis?: Kpi[]
            trend?: TrendPoint[]
            categories?: Cat[]
            regionalRisk?: Region[]
            devices?: Cat[]
          }
        }
        if (!res.ok || !json.ok || !json.data) throw new Error('bad')
        if (cancelled) return
        const d = json.data
        setKpis(d.kpis || [])
        setTrend(d.trend || [])
        setCategories(d.categories || [])
        setRegional(d.regionalRisk || [])
        setDevices(d.devices || [])
      } catch {
        if (!cancelled) {
          setKpis([])
          setTrend([])
          setCategories([])
          setRegional([])
          setDevices([])
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [range])

  const kpiIcons = [ShieldCheck, Clock, ShieldAlert, ShieldAlert] as const

  return (
    <>
      <PageHeader
        title="Regulatory analytics"
        subtitle="Deep insights into market health, verification trends, and risk assessment."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <div className="flex rounded-xl border border-slate-200 bg-slate-50 p-1">
              {RANGE_OPTS.map((r) => (
                <button
                  key={r.id}
                  type="button"
                  onClick={() => setRange(r.id)}
                  className={cn(
                    'rounded-lg px-3 py-1.5 text-xs font-semibold',
                    range === r.id ? 'bg-white text-brand-primary shadow-sm' : 'text-brand-muted',
                  )}
                >
                  {r.label}
                </button>
              ))}
            </div>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-brand-primary bg-white px-4 text-sm font-semibold text-brand-primary"
            >
              <Download className="h-4 w-4" />
              Export report
            </button>
          </div>
        }
      />

      <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
        {kpis.length === 0 ?
          <p className="col-span-full rounded-xl border border-slate-200 bg-slate-50 px-4 py-3 text-sm text-brand-muted">
            No analytics data — check admin session and API.
          </p>
        : kpis.map((k, i) => {
            const Icon = kpiIcons[i] ?? ShieldCheck
            return (
              <Card key={k.key} className="p-5">
                <div className="flex items-start justify-between gap-2">
                  <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-primary">
                    <Icon className="h-5 w-5" />
                  </span>
                  <span
                    className={cn(
                      'inline-flex items-center gap-0.5 text-xs font-bold',
                      k.good ? 'text-emerald-600' : 'text-red-600',
                    )}
                  >
                    {k.deltaUp ? <ArrowUpRight className="h-3.5 w-3.5" /> : <ArrowDownRight className="h-3.5 w-3.5" />}
                    {k.delta}
                  </span>
                </div>
                <p className="mt-3 text-sm font-medium text-brand-muted">{k.label}</p>
                <p className="mt-1 text-2xl font-bold text-brand-secondary">{k.value}</p>
              </Card>
            )
          })
        }
      </div>

      <div className="mt-6 grid gap-6 xl:grid-cols-3">
        <Card className="p-5 xl:col-span-2">
          <h3 className="text-lg font-bold text-brand-secondary">Verification and fraud trends</h3>
          <p className="text-sm text-brand-muted">Total verifications vs. failed or suspicious scans.</p>
          {trend.length === 0 ?
            <p className="mt-8 text-sm text-brand-muted">No verification activity in this range.</p>
          : <div className="mt-4 h-72">
              <ResponsiveContainer width="100%" height="100%">
                <LineChart data={trend}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="label" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Line type="monotone" dataKey="verifications" name="Verifications" stroke="#2563eb" strokeWidth={2} dot />
                  <Line type="monotone" dataKey="fakes" name="Fakes" stroke="#dc2626" strokeWidth={2} dot />
                </LineChart>
              </ResponsiveContainer>
            </div>
          }
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-bold text-brand-secondary">Registry by verification status</h3>
          <p className="mt-1 text-xs text-brand-muted">Counts from ProductRecord (not therapeutic classes).</p>
          {categories.length === 0 ?
            <p className="mt-6 text-sm text-brand-muted">No registered products yet.</p>
          : <>
              <div className="mt-2 h-64">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={categories} dataKey="value" nameKey="name" cx="50%" cy="50%" outerRadius={72} label>
                      {categories.map((e, idx) => (
                        <Cell key={idx} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-1 text-xs text-brand-muted">
                {categories.map((c) => {
                  const sum = categories.reduce((s, x) => s + x.value, 0) || 1
                  const pct = Math.round((c.value / sum) * 100)
                  return (
                    <li key={c.name} className="flex justify-between gap-2">
                      <span className="flex items-center gap-2">
                        <span className="h-2 w-2 rounded-full" style={{ background: c.color }} />
                        {c.name}
                      </span>
                      <span className="font-semibold text-brand-secondary">{pct}%</span>
                    </li>
                  )
                })}
              </ul>
            </>
          }
        </Card>

        <Card className="p-5 xl:col-span-2">
          <div className="flex items-start justify-between gap-2">
            <div>
              <h3 className="text-lg font-bold text-brand-secondary">Regional risk analysis</h3>
              <p className="text-sm text-brand-muted">Relative risk score by city (from regulatory analytics API).</p>
            </div>
            <button type="button" className="text-xs font-semibold text-brand-primary hover:underline">
              View audit log
            </button>
          </div>
          {regional.length === 0 ?
            <p className="mt-6 text-sm text-brand-muted">No regional breakdown (no geo data in logs yet).</p>
          : <div className="mt-4 h-64">
              <ResponsiveContainer width="100%" height="100%">
                <BarChart data={regional}>
                  <CartesianGrid strokeDasharray="3 3" stroke="#e2e8f0" />
                  <XAxis dataKey="city" tick={{ fontSize: 11 }} />
                  <YAxis tick={{ fontSize: 11 }} />
                  <Tooltip />
                  <Bar dataKey="risk" radius={[6, 6, 0, 0]}>
                    {regional.map((_, i) => (
                      <Cell key={i} fill={i % 3 === 0 ? '#2563eb' : i % 3 === 1 ? '#dc2626' : '#f59e0b'} />
                    ))}
                  </Bar>
                </BarChart>
              </ResponsiveContainer>
            </div>
          }
        </Card>

        <Card className="p-5">
          <h3 className="text-lg font-bold text-brand-secondary">Device ecosystem</h3>
          {devices.length === 0 ?
            <p className="mt-6 text-sm text-brand-muted">No device breakdown yet.</p>
          : <>
              <div className="mt-2 h-52">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie data={devices} dataKey="value" nameKey="name" cx="50%" cy="50%" innerRadius={40} outerRadius={64}>
                      {devices.map((e, idx) => (
                        <Cell key={idx} fill={e.color} />
                      ))}
                    </Pie>
                    <Tooltip />
                  </PieChart>
                </ResponsiveContainer>
              </div>
              <ul className="mt-2 space-y-1 text-sm">
                {devices.map((d) => (
                  <li key={d.name} className="flex justify-between font-medium text-brand-secondary">
                    <span>{d.name}</span>
                    <span>{d.value}%</span>
                  </li>
                ))}
              </ul>
            </>
          }
        </Card>
      </div>
    </>
  )
}
