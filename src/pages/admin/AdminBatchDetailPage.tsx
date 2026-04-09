import { useCallback, useEffect, useState } from 'react'
import {
  AlertTriangle,
  Ban,
  Check,
  Download,
  Flag,
  OctagonAlert,
  Package,
  ShieldAlert,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { AdminBatchGeoBarChart, type GeoBarPoint } from '../../components/admin/AdminBatchGeoBarChart'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type Scan = { id: string; location: string; device: string; timeLabel: string; genuine: boolean }
type Life = { key: string; title: string; subtitle: string; at: string; tone: string }

type Detail = {
  batchNumber: string
  productName: string
  status: string
  expiryDate: string
  qrHash: string
  stats: { totalQuantity: number; verifiedScans: number; marketReachStates: number; flaggedUnits: number }
  geoDistribution: GeoBarPoint[]
  recentScans: Scan[]
  lifecycle?: Life[]
  integrity: { tamperProof: number; traceability: number; shelfLifeLabel: string }
}

export function AdminBatchDetailPage() {
  const { batchNumber: raw } = useParams<{ batchNumber: string }>()
  const batchKey = raw ? decodeURIComponent(raw) : ''
  const [d, setD] = useState<Detail | null>(null)
  const [loadError, setLoadError] = useState<string | null>(null)
  const [modal, setModal] = useState<'flag' | 'suspend' | 'recall' | null>(null)
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    if (!batchKey) return
    setLoadError(null)
    try {
      const res = await adminFetch(`/batches/${encodeURIComponent(batchKey)}/detail`)
      const json = (await res.json()) as { ok?: boolean; data?: Detail; message?: string }
      if (res.ok && json.data) {
        setD(json.data)
      } else {
        setD(null)
        setLoadError(json.message || 'Batch not found')
      }
    } catch {
      setD(null)
      setLoadError('Could not load batch')
    }
  }, [batchKey])

  useEffect(() => {
    load()
  }, [load])

  const post = async (path: string, body?: object) => {
    if (!batchKey) return
    setBusy(true)
    try {
      await adminFetch(`/batches/${encodeURIComponent(batchKey)}${path}`, {
        method: 'POST',
        body: body ? JSON.stringify(body) : undefined,
      })
      setModal(null)
      await load()
    } finally {
      setBusy(false)
    }
  }

  if (loadError) {
    return (
      <div className="py-20 text-center">
        <Link to="/admin/batches" className="text-sm font-bold text-brand-primary">
          ← Batches
        </Link>
        <p className="mt-6 text-sm text-red-700">{loadError}</p>
      </div>
    )
  }

  if (!d) return <div className="py-20 text-center text-sm text-brand-muted">Loading…</div>

  const active = d.status === 'active'
  const life = d.lifecycle || []

  return (
    <>
      <div className="mb-4">
        <Link to="/admin/batches" className="text-sm font-bold text-brand-primary hover:underline">
          ← Batches
        </Link>
      </div>

      <PageHeader
        title="Batch Details"
        actions={
          <>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary"
            >
              <Download className="h-4 w-4" />
              Export Batch Report
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white"
              onClick={() => setModal('recall')}
            >
              <OctagonAlert className="h-4 w-4" />
              Initiate Recall
            </button>
          </>
        }
      />

      <div className="mt-2 grid gap-4 xl:grid-cols-[minmax(0,1fr)_300px]">
        <div className="space-y-4">
          <Card className="rounded-3xl p-5" padding="none">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-start">
              <div className="flex h-16 w-16 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-brand-primary">
                <Package className="h-8 w-8" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Batch record</span>
                  <Badge variant={active ? 'success' : 'danger'} className="normal-case">
                    {active ? 'Active' : d.status}
                  </Badge>
                </div>
                <h2 className="mt-1 text-xl font-bold text-brand-secondary">Batch #{d.batchNumber}</h2>
                <p className="mt-1 text-sm font-semibold text-brand-secondary">{d.productName}</p>
                <p className="text-xs font-bold text-brand-muted">Exp: {d.expiryDate}</p>
                <p className="mt-2 font-mono text-[10px] text-brand-muted">Batch QR Hash · {d.qrHash}</p>
              </div>
            </div>
            <div className="grid gap-3 p-5 sm:grid-cols-2 lg:grid-cols-4">
              {[
                ['Total Quantity', `${d.stats.totalQuantity.toLocaleString()} units`],
                ['Verified Scans', d.stats.verifiedScans.toLocaleString()],
                ['Market Reach', `${d.stats.marketReachStates} States`],
                ['Flagged Units', String(d.stats.flaggedUnits)],
              ].map(([k, v]) => (
                <div key={k} className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                  <p className="text-[10px] font-bold uppercase text-brand-muted">{k}</p>
                  <p
                    className={cn(
                      'mt-1 text-lg font-bold',
                      k === 'Flagged Units' ? 'text-red-600' : 'text-brand-secondary',
                    )}
                  >
                    {v}
                  </p>
                </div>
              ))}
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Geographic Distribution</h3>
            <p className="mt-0.5 text-xs font-medium text-brand-muted">Verification counts by region</p>
            <div className="mt-4">
              <AdminBatchGeoBarChart data={d.geoDistribution} />
            </div>
          </Card>

          <Card className="rounded-3xl p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-sm font-bold text-brand-secondary">Recent Verification Logs</h3>
              <button type="button" className="text-sm font-bold text-brand-primary">
                View All Logs
              </button>
            </div>
            <ul className="divide-y divide-slate-100">
              {d.recentScans.map((s) => (
                <li key={s.id} className="flex items-start gap-3 px-5 py-4">
                  <span
                    className={cn(
                      'mt-0.5 flex h-9 w-9 shrink-0 items-center justify-center rounded-xl',
                      s.genuine ? 'bg-emerald-50 text-emerald-600' : 'bg-red-50 text-red-600',
                    )}
                  >
                    {s.genuine ? <Check className="h-4 w-4" /> : <ShieldAlert className="h-4 w-4" />}
                  </span>
                  <div className="min-w-0 flex-1">
                    <p className="text-sm font-bold text-brand-secondary">{s.location}</p>
                    <p className="text-xs font-medium text-brand-muted">
                      {s.device} · {s.timeLabel}
                    </p>
                  </div>
                  <Badge variant={s.genuine ? 'success' : 'danger'} className="normal-case shrink-0">
                    {s.genuine ? 'Genuine' : 'Fake Detected'}
                  </Badge>
                </li>
              ))}
            </ul>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Batch Lifecycle</h3>
            <ul className="mt-4 space-y-4">
              {life.length === 0 ?
                <li className="text-sm text-brand-muted">No lifecycle data.</li>
              : life.map((step, i, arr) => (
                <li key={step.key} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white',
                        step.tone === 'green' && 'bg-emerald-500',
                        step.tone === 'blue' && 'bg-brand-primary',
                        step.tone === 'orange' && 'bg-amber-500',
                      )}
                    >
                      {i + 1}
                    </span>
                    {i < arr.length - 1 ? <span className="mt-1 min-h-[20px] w-px grow bg-slate-200" /> : null}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-secondary">{step.title}</p>
                    <p className="text-xs text-brand-muted">{new Date(step.at).toLocaleDateString()}</p>
                    <p className="mt-1 text-xs text-brand-muted">{step.subtitle}</p>
                  </div>
                </li>
              ))
              }
            </ul>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Supply Chain Integrity</h3>
            <div className="mt-4 space-y-4">
              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span>Tamper Proof</span>
                  <span className="text-emerald-600">{d.integrity.tamperProof}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div className="h-full w-full rounded-full bg-emerald-500" />
                </div>
              </div>
              <div>
                <div className="flex justify-between text-xs font-bold">
                  <span>Traceability</span>
                  <span className="text-blue-600">{d.integrity.traceability}%</span>
                </div>
                <div className="mt-1 h-2 rounded-full bg-slate-100">
                  <div className="h-full rounded-full bg-blue-600" style={{ width: `${d.integrity.traceability}%` }} />
                </div>
              </div>
              <div className="rounded-xl border border-amber-200 bg-amber-50 px-3 py-2 text-xs font-bold text-amber-900">
                Shelf Life: {d.integrity.shelfLifeLabel}
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Batch Actions</h3>
            <div className="mt-4 space-y-2">
              <button
                type="button"
                onClick={() => setModal('flag')}
                className="flex w-full items-center gap-3 rounded-2xl border border-amber-200 bg-amber-50/50 p-4 text-left hover:bg-amber-50"
              >
                <Flag className="h-5 w-5 text-amber-600" />
                <div>
                  <p className="text-sm font-bold text-brand-secondary">Flag Batch</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-amber-800">Mark for investigation</p>
                </div>
              </button>
              <button
                type="button"
                onClick={() => setModal('suspend')}
                className="flex w-full items-center gap-3 rounded-2xl border border-red-200 bg-red-50/50 p-4 text-left hover:bg-red-50"
              >
                <Ban className="h-5 w-5 text-red-600" />
                <div>
                  <p className="text-sm font-bold text-brand-secondary">Suspend Batch</p>
                  <p className="text-[10px] font-bold uppercase tracking-wide text-red-800">Stop distribution</p>
                </div>
              </button>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={modal === 'flag'}
        onClose={() => setModal(null)}
        title="Flag Batch for Review"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModal(null)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => post('/flag')}
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Flag Batch
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <Flag className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium leading-relaxed">
            Flagging triggers a mandatory quality audit. Scans show Caution until the investigation completes.
          </p>
        </div>
      </Modal>

      <Modal
        open={modal === 'suspend'}
        onClose={() => setModal(null)}
        title="Suspend Batch Distribution"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModal(null)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => post('/suspend')}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Suspend Batch
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium leading-relaxed">
            Temporary suspension while awaiting lab results. Distributors will hold stock from this batch.
          </p>
        </div>
      </Modal>

      <Modal
        open={modal === 'recall'}
        onClose={() => setModal(null)}
        title="Initiate Batch Recall"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModal(null)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => post('/recall', { publicNotice: `Batch ${d.batchNumber} recall` })}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Confirm Recall
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <OctagonAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium leading-relaxed">
            Recalled batches return high-risk alerts on future verification scans.
          </p>
        </div>
      </Modal>
    </>
  )
}
