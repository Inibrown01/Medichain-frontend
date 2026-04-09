import { useEffect, useState } from 'react'
import {
  Download,
  FileText,
  Gavel,
  MessageCircle,
  Scale,
  Send,
  ShieldCheck,
} from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type Kpi = { key: string; label: string; value: string; hint: string }
type TimelineItem = { id: string; title: string; body: string; date: string; tone: string }

const PRIORITIES = ['Low', 'Medium', 'High', 'Urgent'] as const

export function AdminCompliancePage() {
  const [kpis, setKpis] = useState<Kpi[]>([])
  const [timeline, setTimeline] = useState<TimelineItem[]>([])
  const [subject, setSubject] = useState('')
  const [message, setMessage] = useState('')
  const [priority, setPriority] = useState<(typeof PRIORITIES)[number]>('Medium')
  const [sent, setSent] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      try {
        const res = await adminFetch('/compliance/overview')
        const json = (await res.json()) as {
          ok?: boolean
          data?: { kpis?: Kpi[]; timeline?: TimelineItem[] }
        }
        if (!res.ok || !json.ok || !json.data) throw new Error('bad')
        if (!cancelled) {
          setKpis(json.data.kpis || [])
          setTimeline(json.data.timeline || [])
        }
      } catch {
        if (!cancelled) {
          setKpis([])
          setTimeline([])
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const send = async () => {
    try {
      const res = await adminFetch('/compliance/contact', {
        method: 'POST',
        body: JSON.stringify({ subject, message, priority }),
      })
      const json = (await res.json()) as { ok?: boolean }
      if (!res.ok || !json.ok) throw new Error('send failed')
      setSent(true)
      setSubject('')
      setMessage('')
    } catch {
      setSent(false)
    }
  }

  const kpiIcons = [FileText, Gavel, ShieldCheck, MessageCircle] as const

  return (
    <>
      <PageHeader
        title="Compliance and regulatory center"
        subtitle="Manage regulatory standards, legal compliance, and direct communication with the compliance team."
        actions={
          <>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-brand-primary bg-white px-4 text-sm font-semibold text-brand-primary"
            >
              <Download className="h-4 w-4" />
              Export report
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white"
            >
              <Scale className="h-4 w-4" />
              Regulatory guidelines
            </button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_340px]">
        <div className="space-y-6">
          <div className="grid gap-4 sm:grid-cols-2">
            {kpis.map((k, i) => {
              const Icon = kpiIcons[i] ?? FileText
              return (
                <Card key={k.key} className="p-5">
                  <div className="flex items-start gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-primary">
                      <Icon className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-medium text-brand-muted">{k.label}</p>
                      <p className="text-2xl font-bold text-brand-secondary">{k.value}</p>
                      <p className="mt-1 text-xs text-brand-muted">{k.hint}</p>
                    </div>
                  </div>
                </Card>
              )
            })}
          </div>

          <Card className="p-6">
            <h2 className="text-lg font-bold text-brand-secondary">Regulatory timeline</h2>
            {timeline.length === 0 ?
              <p className="mt-4 text-sm text-brand-muted">No timeline entries — add regulatory milestones in a future release.</p>
            : <ul className="mt-4 space-y-4">
                {timeline.map((t) => (
                  <li key={t.id} className="flex gap-3 border-b border-slate-100 pb-4 last:border-0">
                    <span
                      className={cn(
                        'mt-1 h-2 w-2 shrink-0 rounded-full',
                        t.tone === 'blue' ? 'bg-brand-primary' : 'bg-emerald-500',
                      )}
                    />
                    <div>
                      <p className="text-xs font-bold uppercase text-brand-muted">{t.date}</p>
                      <p className="font-semibold text-brand-secondary">{t.title}</p>
                      <p className="mt-1 text-sm text-brand-muted">{t.body}</p>
                    </div>
                  </li>
                ))}
              </ul>
            }
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Contact compliance</h3>
            <p className="mt-1 text-sm text-brand-muted">Send a secure message to the regulatory desk.</p>
            {sent ? (
              <p className="mt-4 text-sm font-medium text-emerald-700">Message recorded.</p>
            ) : null}
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase text-brand-muted">Subject</span>
              <input
                value={subject}
                onChange={(e) => setSubject(e.target.value)}
                placeholder="e.g., Counterfeit investigation"
                className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
              />
            </label>
            <label className="mt-4 block">
              <span className="text-xs font-semibold uppercase text-brand-muted">Message</span>
              <textarea
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                rows={4}
                placeholder="Describe the compliance issue in detail..."
                className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm"
              />
            </label>
            <p className="mt-4 text-xs font-semibold uppercase text-brand-muted">Priority</p>
            <div className="mt-2 flex flex-wrap gap-2">
              {PRIORITIES.map((p) => (
                <button
                  key={p}
                  type="button"
                  onClick={() => setPriority(p)}
                  className={cn(
                    'rounded-xl border px-3 py-1.5 text-xs font-bold',
                    priority === p ? 'border-brand-primary bg-blue-50 text-brand-primary' : 'border-slate-200 text-brand-muted',
                  )}
                >
                  {p}
                </button>
              ))}
            </div>
            <button
              type="button"
              onClick={() => void send()}
              className="mt-5 flex h-11 w-full items-center justify-center gap-2 rounded-xl bg-brand-primary text-sm font-semibold text-white"
            >
              <Send className="h-4 w-4" />
              Send message
            </button>
          </Card>

          <Card className="border-slate-800 bg-slate-900 p-5 text-white">
            <h3 className="font-bold">Emergency hotline</h3>
            <ul className="mt-4 space-y-4 text-sm">
              <li className="flex items-start justify-between gap-2">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">24/7 regulatory support</p>
                  <p className="mt-1 font-mono text-lg">+234 800-NAFDAC-01</p>
                </div>
              </li>
              <li className="flex items-start justify-between gap-2 border-t border-slate-700 pt-4">
                <div>
                  <p className="text-xs font-semibold uppercase text-slate-400">Rapid response team</p>
                  <p className="mt-1 font-mono text-lg text-red-300">+234 800-ALERT-99</p>
                </div>
              </li>
            </ul>
            <p className="mt-4 text-xs text-slate-500">For critical threats only. Misuse may be logged.</p>
          </Card>
        </div>
      </div>
    </>
  )
}
