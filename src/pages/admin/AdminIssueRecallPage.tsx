import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { OctagonAlert } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Modal } from '../../components/ui/Modal'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

export function AdminIssueRecallPage() {
  const navigate = useNavigate()
  const [productName, setProductName] = useState('')
  const [batchNumbers, setBatchNumbers] = useState('')
  const [severity, setSeverity] = useState<'low' | 'medium' | 'high'>('medium')
  const [reason, setReason] = useState('')
  const [detail, setDetail] = useState('')
  const [actions, setActions] = useState('')
  const [confirmOpen, setConfirmOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const submit = async () => {
    setBusy(true)
    try {
      await adminFetch('/recalls', {
        method: 'POST',
        body: JSON.stringify({
          productName,
          batchNumbers,
          severity,
          reason: reason || 'Regulatory recall',
          detailDescription: detail,
          requiredActions: actions,
        }),
      })
      setConfirmOpen(false)
      navigate('/admin/recalls')
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <div className="mb-4">
        <Link to="/admin/recalls" className="text-sm font-bold text-brand-primary hover:underline">
          ← Recall Management
        </Link>
      </div>

      <PageHeader
        title="Issue Regulatory Recall"
        subtitle="Initiate a formal product recall for safety or compliance reasons."
      />

      <Card className="max-w-3xl rounded-3xl p-6 sm:p-8">
        <label className="block">
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Product Name</span>
          <select
            value={productName}
            onChange={(e) => setProductName(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold"
          >
            <option value="">Select Product</option>
            <option value="Amoxicillin 500mg">Amoxicillin 500mg</option>
            <option value="Paracetamol B-99">Paracetamol B-99</option>
            <option value="Vitamix-D">Vitamix-D</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Batch Numbers</span>
          <input
            value={batchNumbers}
            onChange={(e) => setBatchNumbers(e.target.value)}
            placeholder="e.g., EMZ-123, EMZ-010"
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium"
          />
          <p className="mt-1 text-[10px] font-bold uppercase tracking-wide text-brand-muted">
            Separate multiple batches with commas
          </p>
        </label>

        <p className="mt-5 text-[10px] font-bold uppercase tracking-wide text-brand-muted">Recall Severity</p>
        <div className="mt-2 flex gap-2">
          {(['low', 'medium', 'high'] as const).map((s) => {
            const active = severity === s
            return (
              <button
                key={s}
                type="button"
                onClick={() => setSeverity(s)}
                className={cn(
                  'flex-1 rounded-xl border-2 py-2.5 text-xs font-bold uppercase',
                  !active && 'border-slate-200 text-brand-muted',
                  active && s === 'low' && 'border-emerald-500 bg-emerald-50 text-emerald-800',
                  active && s === 'medium' && 'border-amber-500 bg-amber-50 text-amber-900',
                  active && s === 'high' && 'border-red-500 bg-red-50 text-red-800',
                )}
              >
                {s}
              </button>
            )
          })}
        </div>

        <label className="mt-5 block">
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Reason for Recall</span>
          <select
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-semibold"
          >
            <option value="">Select Reason</option>
            <option value="Contamination">Contamination</option>
            <option value="Labeling">Labeling defect</option>
            <option value="Substandard">Sub-standard active ingredient</option>
          </select>
        </label>

        <label className="mt-5 block">
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">
            Detailed Description &amp; Risk Analysis
          </span>
          <textarea
            value={detail}
            onChange={(e) => setDetail(e.target.value)}
            rows={4}
            placeholder="Provide a detailed explanation of the issue and potential risk to public health..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
          />
        </label>

        <label className="mt-5 block">
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Required Actions</span>
          <textarea
            value={actions}
            onChange={(e) => setActions(e.target.value)}
            rows={3}
            placeholder="Specify actions required from manufacturer, wholesalers, and the public..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm"
          />
        </label>

        <div className="mt-8 flex flex-wrap justify-end gap-3">
          <Link
            to="/admin/recalls"
            className="inline-flex h-11 items-center rounded-xl border-2 border-brand-primary px-5 text-sm font-bold text-brand-primary"
          >
            Cancel
          </Link>
          <button
            type="button"
            disabled={!productName.trim() || !batchNumbers.trim()}
            onClick={() => setConfirmOpen(true)}
            className="inline-flex h-11 items-center gap-2 rounded-xl bg-red-600 px-5 text-sm font-bold text-white disabled:opacity-50"
          >
            <OctagonAlert className="h-4 w-4" />
            Issue Formal Recall
          </button>
        </div>
      </Card>

      <Modal
        open={confirmOpen}
        onClose={() => setConfirmOpen(false)}
        title="Issue Regulatory Recall"
        footer={
          <div className="flex flex-col gap-2 sm:flex-row sm:justify-end">
            <button type="button" onClick={() => setConfirmOpen(false)} className="rounded-xl border px-4 py-3 text-sm font-bold">
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={submit}
              className="rounded-xl bg-red-600 px-5 py-3 text-sm font-bold text-white disabled:opacity-50"
            >
              Issue Recall Now
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <OctagonAlert className="mt-0.5 h-5 w-5 shrink-0" />
          <p className="font-medium leading-relaxed">
            This is a formal regulatory action. Once issued, it will be published to the national safety database and
            broadcast to stakeholders.
          </p>
        </div>
      </Modal>
    </>
  )
}
