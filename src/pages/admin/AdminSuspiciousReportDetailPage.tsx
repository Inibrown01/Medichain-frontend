import { useCallback, useEffect, useState } from 'react'
import { AlertTriangle, MapPin, Shield } from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type Tl = { key: string; title: string; subtitle: string; at: string; tone: string }

type Detail = {
  id: string
  reporterName: string
  reporterEmail: string
  productName: string
  batchNumber: string
  location: string
  description: string
  status: string
  reliabilityScore: number
  reliabilityNote: string
  recommendedAction: string
  timeline: Tl[]
  evidenceUrls?: string[]
}

export function AdminSuspiciousReportDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [d, setD] = useState<Detail | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [escalate, setEscalate] = useState(false)
  const [dispatchOpen, setDispatchOpen] = useState(false)
  const [lead, setLead] = useState('Inspector G. Musa (Lagos)')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    if (!id) return
    setLoadError(null)
    try {
      const res = await adminFetch(`/suspicious-reports/${id}`)
      const json = (await res.json()) as { ok?: boolean; data?: Detail; message?: string }
      if (res.ok && json.data) {
        setD(json.data)
      } else {
        setD(null)
        setLoadError(json.message || 'Report not found')
      }
    } catch {
      setD(null)
      setLoadError('Could not load report')
    }
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const patchStatus = async (status: string) => {
    if (!id) return
    setBusy(true)
    try {
      await adminFetch(`/suspicious-reports/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ status }),
      })
      setEscalate(false)
      await load()
    } finally {
      setBusy(false)
    }
  }

  const patchDispatch = async () => {
    if (!id) return
    setBusy(true)
    try {
      await adminFetch(`/suspicious-reports/${id}`, {
        method: 'PATCH',
        body: JSON.stringify({ fieldTeamLead: lead }),
      })
      setDispatchOpen(false)
      await load()
    } finally {
      setBusy(false)
    }
  }

  if (loadError) {
    return (
      <div className="py-20 text-center">
        <Link to="/admin/suspicious" className="text-sm font-bold text-brand-primary">
          ← Back
        </Link>
        <p className="mt-6 text-sm text-red-700">{loadError}</p>
      </div>
    )
  }

  if (!d) return <div className="py-20 text-center text-sm text-brand-muted">Loading…</div>

  return (
    <>
      <div className="mb-4">
        <Link to="/admin/suspicious" className="text-sm font-bold text-brand-primary hover:underline">
          ← Suspicious Reports
        </Link>
      </div>

      <PageHeader
        title="Report Details"
        actions={
          <>
            <button
              type="button"
              onClick={() => patchStatus('dismissed')}
              className="rounded-xl border border-slate-200 bg-white px-4 py-2.5 text-sm font-bold text-brand-secondary"
            >
              Dismiss Report
            </button>
            <button
              type="button"
              onClick={() => patchStatus('flagged')}
              className="rounded-xl border-2 border-amber-400 bg-amber-50 px-4 py-2.5 text-sm font-bold text-amber-900"
            >
              Flag Product
            </button>
            <button
              type="button"
              onClick={() => setEscalate(true)}
              className="rounded-xl bg-red-600 px-4 py-2.5 text-sm font-bold text-white"
            >
              Escalate to Enforcement
            </button>
          </>
        }
      />

      <div className="mt-2 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <Card className="rounded-3xl p-5">
            <div className="flex flex-wrap items-center gap-2">
              <Shield className="h-6 w-6 text-red-600" />
              <Badge variant="danger" className="normal-case">
                Suspicious Activity
              </Badge>
              <Badge variant="warning" className="normal-case">
                Pending Review
              </Badge>
            </div>
            <h2 className="mt-3 text-2xl font-bold text-brand-secondary">{d.productName}</h2>
            <p className="mt-2 text-sm font-semibold text-brand-muted">Reported by {d.reporterName}</p>
            <p className="mt-1 flex items-center gap-1 text-xs font-bold text-brand-muted">
              <MapPin className="h-3.5 w-3.5" />
              {d.location}
            </p>
            <div className="mt-4 rounded-2xl border border-slate-100 bg-slate-50 p-4">
              <p className="text-sm leading-relaxed text-brand-secondary">{d.description}</p>
            </div>
            <p className="mt-4 text-[10px] font-bold uppercase text-brand-muted">Attached Evidence</p>
            <div className="mt-2 grid grid-cols-3 gap-2">
              {d.evidenceUrls && d.evidenceUrls.length > 0 ?
                d.evidenceUrls.map((url, i) => (
                  <a
                    key={url}
                    href={url}
                    target="_blank"
                    rel="noreferrer"
                    className="flex aspect-[4/3] items-center justify-center rounded-xl border border-slate-200 bg-slate-50 text-xs font-bold text-brand-primary hover:bg-slate-100"
                  >
                    Link {i + 1}
                  </a>
                ))
              : <p className="text-xs text-brand-muted">No files attached.</p>}
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Investigation Log</h3>
            <ul className="mt-4 space-y-4">
              {(d.timeline || []).map((step, i, arr) => (
                <li key={step.key} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'h-3 w-3 rounded-full',
                        step.tone === 'red' && 'bg-red-500',
                        step.tone === 'blue' && 'bg-brand-primary',
                        step.tone === 'yellow' && 'bg-amber-500',
                        step.tone === 'green' && 'bg-emerald-500',
                      )}
                    />
                    {i < arr.length - 1 ? <span className="mt-1 min-h-[24px] w-px grow bg-slate-200" /> : null}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-secondary">{step.title}</p>
                    <p className="text-xs font-semibold text-brand-muted">
                      {new Date(step.at).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}
                    </p>
                    <p className="mt-1 text-xs text-brand-muted">{step.subtitle}</p>
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Reporter Information</h3>
            <p className="mt-3 text-sm font-bold text-brand-secondary">{d.reporterName}</p>
            <p className="text-xs font-medium text-brand-muted">{d.reporterEmail || '—'}</p>
            <div className="mt-4 rounded-xl border border-slate-100 bg-slate-50 p-3">
              <p className="text-[10px] font-bold uppercase text-brand-muted">Reliability Score</p>
              <p className="mt-1 text-lg font-bold text-brand-secondary">
                High ({d.reliabilityScore}/100)
              </p>
              <p className="text-xs text-brand-muted">{d.reliabilityNote}</p>
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Recommended Action</h3>
            <div className="mt-3 rounded-xl border-2 border-red-200 bg-red-50 p-4">
              <p className="text-[10px] font-bold uppercase text-red-800">High Priority</p>
              <p className="mt-2 text-sm font-medium leading-relaxed text-red-950">{d.recommendedAction}</p>
            </div>
            <button
              type="button"
              onClick={() => setDispatchOpen(true)}
              className="mt-4 w-full rounded-xl bg-brand-primary py-3 text-sm font-bold text-white"
            >
              Dispatch Field Team
            </button>
          </Card>
        </div>
      </div>

      <Modal
        open={escalate}
        onClose={() => setEscalate(false)}
        title="Escalate to Enforcement"
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setEscalate(false)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => patchStatus('escalated')}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Escalate Now
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium leading-relaxed">
            This transfers the case to the NAFDAC Enforcement Directorate for legal action and potential seizure of goods.
          </p>
        </div>
      </Modal>

      <Modal
        open={dispatchOpen}
        onClose={() => setDispatchOpen(false)}
        title="Dispatch Field Team"
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setDispatchOpen(false)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={patchDispatch}
              className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Confirm Dispatch
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-xl border border-blue-200 bg-blue-50 p-4 text-sm text-blue-950">
          <MapPin className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium leading-relaxed">
            A field team will investigate the reported location within 24 hours, collect samples, and verify the vendor.
          </p>
        </div>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase text-brand-muted">Assign team lead</span>
          <select
            value={lead}
            onChange={(e) => setLead(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold"
          >
            <option>Inspector G. Musa (Lagos)</option>
            <option>Inspector A. Bello (Kano)</option>
            <option>Inspector K. Okafor (Abuja)</option>
          </select>
        </label>
      </Modal>
    </>
  )
}
