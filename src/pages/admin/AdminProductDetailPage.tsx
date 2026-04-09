import { useCallback, useEffect, useState } from 'react'
import {
  AlertTriangle,
  Ban,
  Check,
  Clock,
  Link2,
  MapPin,
  OctagonAlert,
  Pencil,
} from 'lucide-react'
import { Link, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { AdminProductVerificationChart } from '../../components/admin/AdminProductVerificationChart'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type Detail = {
  productId: number
  drugName: string
  manufacturer: string
  nafdacNumber: string
  category: string
  description: string
  blockchainId: string
  approvalDate: string
  uiStatus: string
  stats: { totalVerifications: number; activeBatches: number; fakeDetections: number }
  genuineRateLabel: string
  verificationSeries: { label: string; count: number }[]
  batches: { batchNo: string; mfgDate: string; expiryDate: string; verifications: number; status: string }[]
  regulatory: { compliance: string; blockchain: string; blockchainSub: string }
  risk: { counterfeit: string; supplyChain: string; market: string }
  market: { topRegion: string; topPercent: string }
  health: {
    lastVerification: string
    statusLine: string
    warning: { title: string; body: string } | null
  }
}

const AUDIT_EVENTS = [
  { t: '10:42 AM', text: 'Status changed: Verified → Flagged by Admin Sarah' },
  { t: 'Yesterday', text: 'Batch AMZ-003 registered by Manufacturer System' },
  { t: 'Mar 20', text: 'Description updated by Admin John' },
]

function formatCategoryLabel(raw: string) {
  const s = raw.replace(/_/g, ' ').trim()
  if (!s) return ''
  return s
    .split(/\s+/)
    .map((w) => w.charAt(0).toUpperCase() + w.slice(1).toLowerCase())
    .join(' ')
}

/** threat: high = bad (red). integrity: high = good (green). balance: market / saturation nuance */
function RiskBar({
  label,
  level,
  variant,
}: {
  label: string
  level: string
  variant: 'threat' | 'integrity' | 'balance'
}) {
  const lv = level.toLowerCase()
  const w = lv === 'high' ? 'w-[85%]' : lv === 'medium' ? 'w-[52%]' : 'w-[28%]'
  let color = 'bg-slate-400'
  if (variant === 'threat') {
    color = lv === 'high' ? 'bg-red-500' : lv === 'medium' ? 'bg-amber-500' : 'bg-emerald-500'
  } else if (variant === 'integrity') {
    color = lv === 'high' ? 'bg-emerald-500' : lv === 'medium' ? 'bg-amber-500' : 'bg-red-500'
  } else {
    color = lv === 'high' ? 'bg-amber-500' : lv === 'medium' ? 'bg-blue-500' : 'bg-slate-400'
  }
  return (
    <div>
      <div className="flex justify-between text-xs font-bold text-brand-secondary">
        <span>{label}</span>
        <span className="uppercase tracking-wide text-brand-muted">{level}</span>
      </div>
      <div className="mt-1.5 h-2.5 w-full overflow-hidden rounded-full bg-slate-100">
        <div className={cn('h-full rounded-full transition-all', w, color)} />
      </div>
    </div>
  )
}

export function AdminProductDetailPage() {
  const { productId: pid } = useParams<{ productId: string }>()
  const [d, setD] = useState<Detail | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [loadError, setLoadError] = useState(false)
  const [modal, setModal] = useState<'audit' | 'suspend' | 'flag' | 'recall' | null>(null)
  const [suspendDur, setSuspendDur] = useState<'24h' | '7d' | 'inf'>('24h')
  const [suspendNote, setSuspendNote] = useState('')
  const [flagReason, setFlagReason] = useState('Suspicious verification patterns')
  const [flagNotes, setFlagNotes] = useState('')
  const [recallScope, setRecallScope] = useState('full')
  const [recallNotice, setRecallNotice] = useState('')
  const [busy, setBusy] = useState(false)

  const load = useCallback(async () => {
    if (!pid) return
    const numericId = Number(pid)
    if (!Number.isFinite(numericId)) {
      setNotFound(true)
      setLoadError(false)
      setD(null)
      return
    }
    setNotFound(false)
    setLoadError(false)
    try {
      const res = await adminFetch(`/products/${pid}/detail`)
      const json = (await res.json()) as { ok?: boolean; data?: Detail }
      if (res.status === 404) {
        setNotFound(true)
        setD(null)
        return
      }
      if (res.ok && json.data) {
        setD(json.data)
        return
      }
      setD(null)
      setLoadError(true)
    } catch {
      setD(null)
      setLoadError(true)
    }
  }, [pid])

  useEffect(() => {
    load()
  }, [load])

  if (!d) {
    return (
      <div className="py-16 text-center">
        {notFound ? (
          <>
            <p className="text-lg font-semibold text-brand-secondary">Product not found</p>
            <p className="mt-2 text-sm text-brand-muted">This product ID is not in the registry.</p>
            <Link
              to="/admin/products"
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white"
            >
              Back to products
            </Link>
          </>
        ) : loadError ? (
          <>
            <p className="text-lg font-semibold text-brand-secondary">Could not load product</p>
            <p className="mt-2 text-sm text-brand-muted">Check the API and your admin session.</p>
            <Link
              to="/admin/products"
              className="mt-6 inline-flex h-11 items-center rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white"
            >
              Back to products
            </Link>
          </>
        ) : (
          <p className="text-sm text-brand-muted">Loading product…</p>
        )}
      </div>
    )
  }

  const statusBadge =
    d.uiStatus === 'verified' ?
      <Badge variant="success">Verified</Badge>
    : d.uiStatus === 'flagged' ?
      <Badge variant="warning">Flagged</Badge>
    : <Badge variant="danger">Rejected</Badge>

  const healthBadge =
    d.uiStatus === 'verified' ?
      <Badge variant="success" className="normal-case">
        Active
      </Badge>
    : d.uiStatus === 'flagged' ?
      <Badge variant="warning" className="normal-case">
        Under Review
      </Badge>
    : <Badge variant="danger" className="normal-case">
        Rejected
      </Badge>

  const postAction = async (path: string, body: object) => {
    if (!pid) return
    setBusy(true)
    try {
      await adminFetch(`/products/${pid}${path}`, {
        method: 'POST',
        body: JSON.stringify(body),
      })
      await load()
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="mb-4">
        <Link to="/admin/products" className="text-sm font-semibold text-brand-primary hover:underline">
          ← Products
        </Link>
      </div>

      <PageHeader
        title="Product details"
        subtitle={`${d.manufacturer} · NAFDAC ${d.nafdacNumber} · Product #${d.productId}`}
        actions={
          <>
            <button
              type="button"
              onClick={() => setModal('audit')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-brand-secondary shadow-sm"
            >
              <Clock className="h-4 w-4" />
              View audit log
            </button>
            <button
              type="button"
              onClick={() => setModal('flag')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-amber-300 bg-white px-4 text-sm font-semibold text-amber-900"
            >
              <Pencil className="h-4 w-4" />
              Flag for review
            </button>
            <button
              type="button"
              onClick={() => setModal('recall')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border-2 border-amber-400 bg-amber-50 px-4 text-sm font-semibold text-amber-900"
            >
              <OctagonAlert className="h-4 w-4" />
              Initiate recall
            </button>
            <button
              type="button"
              onClick={() => setModal('suspend')}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(220,38,38,0.25)]"
            >
              <Ban className="h-4 w-4" />
              Suspend product
            </button>
          </>
        }
      />

      <div className="mt-2 grid gap-4 xl:grid-cols-[minmax(0,1fr)_340px]">
        <div className="space-y-4">
          <Card className="rounded-3xl p-5" padding="none">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 lg:flex-row lg:items-start">
              <div className="flex h-24 w-24 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-2xl font-bold text-brand-primary">
                Rx
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="primary" className="normal-case">
                    {formatCategoryLabel(d.category)}
                  </Badge>
                  {statusBadge}
                </div>
                <div className="mt-2 flex flex-wrap items-start justify-between gap-2">
                  <div>
                    <h2 className="text-2xl font-bold text-brand-secondary">{d.drugName}</h2>
                    <p className="mt-1 text-sm font-semibold text-brand-muted">{d.manufacturer}</p>
                    <p className="text-xs font-bold text-brand-muted">Approved {d.approvalDate}</p>
                  </div>
                  <div className="rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-right">
                    <p className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Blockchain ID</p>
                    <p className="font-mono text-xs font-bold text-brand-secondary">{d.blockchainId}</p>
                  </div>
                </div>
                <div className="mt-5 grid gap-4 sm:grid-cols-3">
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="text-[10px] font-bold uppercase text-brand-muted">Total Verifications</p>
                    <p className="mt-1 text-2xl font-bold text-brand-secondary">
                      {d.stats.totalVerifications.toLocaleString()}
                    </p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="text-[10px] font-bold uppercase text-brand-muted">Active Batches</p>
                    <p className="mt-1 text-2xl font-bold text-brand-secondary">{d.stats.activeBatches}</p>
                  </div>
                  <div className="rounded-2xl border border-slate-100 bg-slate-50/80 p-4">
                    <p className="text-[10px] font-bold uppercase text-brand-muted">Fake Detections</p>
                    <p className="mt-1 text-2xl font-bold text-red-600">{d.stats.fakeDetections}</p>
                  </div>
                </div>
                <p className="mt-4 text-sm leading-relaxed text-brand-secondary">{d.description}</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <div className="flex items-center justify-between gap-2">
              <h3 className="text-sm font-bold text-brand-secondary">Verification Health</h3>
              {healthBadge}
            </div>
            <div className="mt-4 grid gap-3 sm:grid-cols-2">
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase text-brand-muted">Last Verification</p>
                <p className="mt-1 text-sm font-bold text-brand-secondary">{d.health.lastVerification}</p>
              </div>
              <div className="rounded-xl border border-slate-100 bg-slate-50 p-4">
                <p className="text-[10px] font-bold uppercase text-brand-muted">Verification Status</p>
                <p className="mt-1 text-sm font-bold text-brand-secondary">{d.health.statusLine}</p>
              </div>
            </div>
            {d.health.warning ?
              <div className="mt-4 flex gap-3 rounded-2xl border border-amber-200 bg-amber-50 p-4">
                <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-amber-600" />
                <div>
                  <p className="text-sm font-bold text-amber-950">{d.health.warning.title}</p>
                  <p className="mt-1 text-xs font-medium text-amber-900">{d.health.warning.body}</p>
                </div>
              </div>
            : d.uiStatus === 'verified' ?
              <div className="mt-4 flex items-center gap-2 rounded-2xl border border-emerald-200 bg-emerald-50 px-4 py-3 text-sm font-bold text-emerald-800">
                <Check className="h-4 w-4" />
                No Active Warnings
              </div>
            : null}
          </Card>

          <Card className="rounded-3xl p-5">
            <div className="flex items-center justify-between">
              <h3 className="text-sm font-bold text-brand-secondary">Verification Activity</h3>
              <Badge variant="success" className="normal-case">
                {d.genuineRateLabel}
              </Badge>
            </div>
            <div className="mt-4 rounded-2xl border border-slate-100 bg-gradient-to-b from-slate-50/80 to-white px-2 pb-2 pt-4">
              <AdminProductVerificationChart data={d.verificationSeries} />
            </div>
          </Card>

          <Card className="rounded-3xl p-0 overflow-hidden">
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <h3 className="text-sm font-bold text-brand-secondary">Active Batches</h3>
              <Link to="/admin/batches" className="text-sm font-bold text-brand-primary">
                View All Batches
              </Link>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full min-w-[640px] text-sm">
                <thead>
                  <tr className="border-b border-slate-100 bg-slate-50/80 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
                    <th className="px-5 py-3 text-left">Batch No</th>
                    <th className="px-3 py-3">Mfg Date</th>
                    <th className="px-3 py-3">Expiry Date</th>
                    <th className="px-3 py-3">Verifications</th>
                    <th className="px-5 py-3 text-right">Status</th>
                  </tr>
                </thead>
                <tbody>
                  {d.batches.map((b) => (
                    <tr key={b.batchNo} className="border-b border-slate-50">
                      <td className="px-5 py-3.5 font-bold text-brand-secondary">
                        {b.batchNo && b.batchNo !== '—' ? (
                          <Link
                            to={`/admin/batches/${encodeURIComponent(b.batchNo)}`}
                            className="text-brand-primary hover:underline"
                          >
                            {b.batchNo}
                          </Link>
                        ) : (
                          b.batchNo
                        )}
                      </td>
                      <td className="px-3 py-3.5 text-xs font-medium text-brand-muted">{b.mfgDate}</td>
                      <td className="px-3 py-3.5 text-xs font-medium text-brand-muted">{b.expiryDate}</td>
                      <td className="px-3 py-3.5 text-xs font-semibold">{b.verifications.toLocaleString()}</td>
                      <td className="px-5 py-3.5 text-right">
                        <Badge
                          variant={
                            b.status === 'active' ? 'success' : b.status === 'recalled' ? 'danger' : 'warning'
                          }
                          className="normal-case"
                        >
                          {b.status}
                        </Badge>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </Card>

        </div>

        <div className="space-y-4">
          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Regulatory Status</h3>
            <div className="mt-4 space-y-3">
              <div className="rounded-2xl border border-emerald-100 bg-emerald-50/80 p-4">
                <p className="text-[10px] font-bold uppercase text-emerald-800">Compliance</p>
                <p className="mt-1 text-sm font-bold text-emerald-900">{d.regulatory.compliance}</p>
              </div>
              <div className="rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
                <p className="text-[10px] font-bold uppercase text-blue-800">Blockchain</p>
                <p className="mt-1 text-sm font-bold text-blue-900">{d.regulatory.blockchain}</p>
                <p className="mt-1 flex items-center gap-1 text-xs font-semibold text-blue-800">
                  <Link2 className="h-3.5 w-3.5" />
                  {d.regulatory.blockchainSub}
                </p>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Risk Assessment</h3>
            <div className="mt-4 space-y-4">
              <RiskBar label="Counterfeit risk" level={d.risk.counterfeit} variant="threat" />
              <RiskBar label="Supply chain integrity" level={d.risk.supplyChain} variant="integrity" />
              <RiskBar label="Market saturation" level={d.risk.market} variant="balance" />
            </div>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Market Distribution</h3>
            <div className="relative mt-4 h-40 overflow-hidden rounded-2xl border border-slate-200 bg-gradient-to-br from-slate-100 to-slate-200">
              <MapPin className="absolute left-1/2 top-1/2 h-8 w-8 -translate-x-1/2 -translate-y-1/2 text-brand-primary opacity-80" />
              <div className="absolute bottom-3 left-3 right-3 rounded-xl border border-white/80 bg-white/95 p-3 shadow-sm backdrop-blur">
                <p className="text-xs font-bold text-brand-secondary">Top Region: {d.market.topRegion}</p>
                <p className="text-[10px] font-semibold text-brand-muted">{d.market.topPercent}</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={modal === 'audit'}
        onClose={() => setModal(null)}
        title={`Audit log · ${d.drugName}`}
        wide
        footer={
          <button
            type="button"
            className="w-full rounded-xl border border-slate-200 bg-white py-3 text-sm font-semibold text-brand-secondary"
          >
            Export full trail
          </button>
        }
      >
        <ul className="relative space-y-0 pl-2">
          <div className="absolute bottom-2 left-[11px] top-2 w-px bg-slate-200" aria-hidden />
          {AUDIT_EVENTS.map((e, i) => (
            <li key={i} className="relative flex gap-4 pb-6 last:pb-0">
              <span className="relative z-[1] mt-1.5 h-3 w-3 shrink-0 rounded-full border-2 border-white bg-brand-primary shadow-sm" />
              <div className="min-w-0 pt-0.5">
                <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{e.t}</p>
                <p className="mt-1 text-sm font-medium text-brand-secondary">{e.text}</p>
              </div>
            </li>
          ))}
        </ul>
      </Modal>

      <Modal
        open={modal === 'suspend'}
        onClose={() => setModal(null)}
        title="Suspend Product Distribution"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy || !suspendNote.trim()}
              onClick={async () => {
                await postAction('/status', { chainStatus: 'flagged', justification: `${suspendDur}: ${suspendNote}` })
                setModal(null)
              }}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Confirm Suspension
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium leading-relaxed">
            Suspending {d.drugName} will immediately invalidate active verification codes and prevent further distribution.
            This action is reversible but highly impactful.
          </p>
        </div>
        <p className="mt-4 text-[10px] font-bold uppercase text-brand-muted">Suspend duration</p>
        <div className="mt-2 flex gap-2">
          {(
            [
              { key: '24h' as const, label: '24 Hours' },
              { key: '7d' as const, label: '7 Days' },
              { key: 'inf' as const, label: 'Indefinite' },
            ] as const
          ).map((o) => (
            <button
              key={o.key}
              type="button"
              onClick={() => setSuspendDur(o.key)}
              className={cn(
                'flex-1 rounded-xl border py-2 text-xs font-bold',
                suspendDur === o.key ? 'border-brand-primary bg-blue-50 text-brand-primary' : 'border-slate-200 text-brand-muted',
              )}
            >
              {o.label}
            </button>
          ))}
        </div>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase text-brand-muted">Internal justification</span>
          <textarea
            value={suspendNote}
            onChange={(e) => setSuspendNote(e.target.value)}
            rows={3}
            placeholder="Required for regulatory audit trail..."
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:ring-2 focus:ring-brand-primary/20"
          />
        </label>
      </Modal>

      <Modal
        open={modal === 'flag'}
        onClose={() => setModal(null)}
        title="Flag Product for Review"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModal(null)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                await postAction('/status', {
                  chainStatus: 'flagged',
                  justification: `${flagReason}: ${flagNotes}`,
                })
                setModal(null)
              }}
              className="rounded-xl bg-amber-500 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Flag Product
            </button>
          </div>
        }
      >
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          Flagging {d.drugName} will alert enforcement and the manufacturer. The product stays active but marked under
          review.
        </div>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase text-brand-muted">Reason</span>
          <select
            value={flagReason}
            onChange={(e) => setFlagReason(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold"
          >
            <option>Suspicious verification patterns</option>
            <option>Documentation mismatch</option>
            <option>Consumer complaints</option>
          </select>
        </label>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase text-brand-muted">Additional notes</span>
          <textarea
            value={flagNotes}
            onChange={(e) => setFlagNotes(e.target.value)}
            rows={3}
            placeholder="Provide detailed context for the enforcement team..."
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm"
          />
        </label>
      </Modal>

      <Modal
        open={modal === 'recall'}
        onClose={() => setModal(null)}
        title="Initiate Product Recall"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button type="button" onClick={() => setModal(null)} className="rounded-xl border px-4 py-2.5 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={async () => {
                await postAction('/recall', { publicNotice: recallNotice || recallScope })
                setModal(null)
              }}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Initiate Recall
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <OctagonAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium leading-relaxed">
            Regulatory action required — initiating a recall for {d.drugName} will trigger notifications to consumers and
            supply chain partners.
          </p>
        </div>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase text-brand-muted">Recall scope</span>
          <select
            value={recallScope}
            onChange={(e) => setRecallScope(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm font-semibold"
          >
            <option value="full">Full Product Recall (All Batches)</option>
            <option value="batch">Selected Batches Only</option>
          </select>
        </label>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase text-brand-muted">Public notice content</span>
          <textarea
            value={recallNotice}
            onChange={(e) => setRecallNotice(e.target.value)}
            rows={3}
            placeholder="This message will be sent to consumers..."
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm"
          />
        </label>
      </Modal>
    </>
  )
}
