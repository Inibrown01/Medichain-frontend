import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'

const regions = [
  { region: 'Lagos', value: '5.2k', pct: 100 },
  { region: 'Abuja', value: '3.1k', pct: 60 },
  { region: 'Kano', value: '1.8k', pct: 35 },
  { region: 'Port Harcourt', value: '1.2k', pct: 23 },
  { region: 'Others', value: '0.6k', pct: 12 },
]

export function VerificationInsightsPage() {
  return (
    <>
      <PageHeader
        title="Verification Analytics"
        subtitle="Deep insights into your product lifecycle and market integrity."
      />

      <div className="grid gap-4 lg:grid-cols-2">
        <Card className="rounded-3xl p-6">
          <h3 className="text-lg font-bold text-brand-secondary">Verification Activity</h3>
          <div className="mt-4 h-56 rounded-2xl border border-slate-200 bg-gradient-to-b from-blue-50 to-white p-4">
            <div className="flex h-full items-end justify-between gap-2">
              {['Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat', 'Sun'].map((d) => (
                <div key={d} className="flex flex-1 flex-col items-center gap-2">
                  <div className="flex h-40 w-full items-end justify-center gap-1">
                    <div
                      className="w-2 rounded-full bg-brand-primary"
                      style={{ height: `${20 + (d === 'Thu' ? 70 : 30)}%` }}
                    />
                    <div
                      className="w-2 rounded-full bg-red-500"
                      style={{ height: `${10 + (d === 'Thu' ? 25 : 8)}%` }}
                    />
                  </div>
                  <span className="text-[10px] font-bold uppercase text-brand-muted">{d}</span>
                </div>
              ))}
            </div>
          </div>
          <div className="mt-3 flex gap-4 text-xs font-bold">
            <span className="text-brand-primary">● checks</span>
            <span className="text-red-500">● fake</span>
          </div>
        </Card>

        <Card className="rounded-3xl p-6">
          <h3 className="text-lg font-bold text-brand-secondary">Geographic distribution</h3>
          <div className="mt-6 space-y-4">
            {regions.map((r) => (
              <div key={r.region}>
                <div className="flex items-center justify-between text-sm font-semibold">
                  <span className="text-brand-secondary">{r.region}</span>
                  <span className="text-brand-muted">{r.value}</span>
                </div>
                <div className="mt-2 h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-brand-primary" style={{ width: `${r.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </Card>
      </div>
    </>
  )
}
