import { useCallback, useEffect, useState } from 'react'
import {
  Check,
  ChevronLeft,
  Download,
  FileText,
  MessageSquare,
  Minus,
  RotateCw,
} from 'lucide-react'
import { Link, useNavigate, useParams } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type Doc = { name: string; fileName?: string; status: string; mimeType?: string; previewUrl?: string }
type TimelineStep = { key: string; title: string; subtitle?: string; at: string; tone: string }
type CheckItem = { id: string; label: string; done: boolean }

type Submission = {
  _id: string
  productName: string
  category: string
  manufacturerName: string
  nafdacNumber: string
  description: string
  licenseId: string
  contactEmail: string
  registrationLabel: string
  manufacturerEntityStatus: string
  productType: string
  status: string
  documents: Doc[]
  timeline: TimelineStep[]
  checklist: CheckItem[]
  internalNotes: string
  createdAt: string
}

export function ReviewSubmissionPage() {
  const { id } = useParams<{ id: string }>()
  const navigate = useNavigate()
  const [data, setData] = useState<Submission | null>(null)
  const [selectedDoc, setSelectedDoc] = useState(0)
  const [notes, setNotes] = useState('')
  const [checklist, setChecklist] = useState<CheckItem[]>([])
  const [modal, setModal] = useState<'approve' | 'reject' | 'changes' | null>(null)
  const [approveNote, setApproveNote] = useState('')
  const [rejectReason, setRejectReason] = useState('')
  const [changesMsg, setChangesMsg] = useState('')
  const [saving, setSaving] = useState(false)

  const load = useCallback(async () => {
    if (!id) return
    const res = await adminFetch(`/submissions/${id}`)
    const json = (await res.json()) as { ok?: boolean; data?: Submission }
    if (!res.ok || !json.data) return
    setData(json.data)
    setNotes(json.data.internalNotes || '')
    setChecklist(json.data.checklist?.length ? json.data.checklist : [])
  }, [id])

  useEffect(() => {
    load()
  }, [load])

  const persistNotes = async (value: string) => {
    if (!id) return
    await adminFetch(`/submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ internalNotes: value }),
    })
  }

  const toggleCheck = async (itemId: string) => {
    if (!id) return
    const next = checklist.map((c) => (c.id === itemId ? { ...c, done: !c.done } : c))
    setChecklist(next)
    await adminFetch(`/submissions/${id}`, {
      method: 'PATCH',
      body: JSON.stringify({ checklist: next }),
    })
  }

  const setDocStatus = async (idx: number, status: string) => {
    if (!id) return
    const res = await adminFetch(`/submissions/${id}/documents/${idx}`, {
      method: 'PATCH',
      body: JSON.stringify({ status }),
    })
    const json = (await res.json()) as { ok?: boolean; data?: Submission }
    if (json.data) setData(json.data as Submission)
  }

  const submitApprove = async () => {
    if (!id) return
    setSaving(true)
    try {
      await adminFetch(`/submissions/${id}/approve`, {
        method: 'POST',
        body: JSON.stringify({ note: approveNote }),
      })
      setModal(null)
      navigate('/admin/approvals')
    } finally {
      setSaving(false)
    }
  }

  const submitReject = async () => {
    if (!id || !rejectReason.trim()) return
    setSaving(true)
    try {
      await adminFetch(`/submissions/${id}/reject`, {
        method: 'POST',
        body: JSON.stringify({ reason: rejectReason }),
      })
      setModal(null)
      navigate('/admin/approvals')
    } finally {
      setSaving(false)
    }
  }

  const submitChanges = async () => {
    if (!id || !changesMsg.trim()) return
    setSaving(true)
    try {
      await adminFetch(`/submissions/${id}/request-changes`, {
        method: 'POST',
        body: JSON.stringify({ message: changesMsg }),
      })
      setModal(null)
      navigate('/admin/approvals')
    } finally {
      setSaving(false)
    }
  }

  if (!data) {
    return (
      <div className="py-20 text-center text-sm font-medium text-brand-muted">
        Loading submission…
      </div>
    )
  }

  const docs = data.documents?.length ? data.documents : [{ name: 'No documents', status: 'pending' }]
  const doc = docs[selectedDoc] ?? docs[0]
  const submitted = data.createdAt ? new Date(data.createdAt).toISOString().slice(0, 10) : '—'

  return (
    <>
      <div className="mb-4">
        <Link
          to="/admin/approvals"
          className="inline-flex items-center gap-1 text-sm font-bold text-brand-primary hover:underline"
        >
          <ChevronLeft className="h-4 w-4" />
          Back to approvals
        </Link>
      </div>

      <PageHeader
        title="Review Submission"
        subtitle="Details of manufacturer's submission."
        actions={
          <>
            <button
              type="button"
              onClick={() => setModal('changes')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-slate-200 bg-white px-4 text-sm font-bold text-brand-secondary"
            >
              <MessageSquare className="h-4 w-4" />
              Request Changes
            </button>
            <button
              type="button"
              onClick={() => setModal('reject')}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-red-200 bg-red-50 px-4 text-sm font-bold text-red-700"
            >
              <Minus className="h-4 w-4" />
              Reject
            </button>
            <button
              type="button"
              onClick={() => setModal('approve')}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-emerald-600 px-5 text-sm font-bold text-white shadow-sm"
            >
              <Check className="h-4 w-4" />
              Approve
            </button>
          </>
        }
      />

      <div className="mt-2 grid gap-4 xl:grid-cols-[minmax(0,1fr)_320px]">
        <div className="space-y-4">
          <Card className="rounded-3xl p-5" padding="none">
            <div className="flex flex-col gap-4 border-b border-slate-100 p-5 sm:flex-row sm:items-start">
              <div className="flex h-20 w-20 shrink-0 items-center justify-center rounded-2xl bg-slate-100 text-brand-primary">
                <FileText className="h-9 w-9" />
              </div>
              <div className="min-w-0 flex-1">
                <div className="flex flex-wrap items-center gap-2">
                  <Badge variant="outline" className="normal-case">
                    {data.productType || 'MEDICINE'}
                  </Badge>
                  <Badge variant="warning" className="normal-case">
                    Pending Approval
                  </Badge>
                </div>
                <h2 className="mt-2 text-xl font-bold text-brand-secondary">{data.productName}</h2>
                <div className="mt-2 flex flex-wrap gap-4 text-xs font-semibold text-brand-muted">
                  <span>{data.manufacturerName}</span>
                  <span>Submitted {submitted}</span>
                </div>
              </div>
            </div>

            <div className="grid gap-4 border-b border-slate-100 p-5 sm:grid-cols-2">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Regulatory Information</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium text-brand-muted">NAFDAC Number</dt>
                    <dd className="font-bold text-brand-secondary">{data.nafdacNumber || '—'}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium text-brand-muted">Category</dt>
                    <dd className="font-bold text-brand-secondary">{data.category || '—'}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium text-brand-muted">Registration Status</dt>
                    <dd>
                      <Badge variant="outline" className="normal-case">
                        {data.registrationLabel || 'NEW APPLICATION'}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </div>
              <div>
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Manufacturer Details</p>
                <dl className="mt-3 space-y-2 text-sm">
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium text-brand-muted">License ID</dt>
                    <dd className="font-bold text-brand-secondary">{data.licenseId || '—'}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium text-brand-muted">Contact</dt>
                    <dd className="truncate font-bold text-brand-secondary">{data.contactEmail || '—'}</dd>
                  </div>
                  <div className="flex justify-between gap-2">
                    <dt className="font-medium text-brand-muted">Verification Status</dt>
                    <dd>
                      <Badge variant="success" className="normal-case">
                        {data.manufacturerEntityStatus || 'VERIFIED ENTITY'}
                      </Badge>
                    </dd>
                  </div>
                </dl>
              </div>
            </div>

            <div className="p-5">
              <p className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Product Description</p>
              <p className="mt-2 text-sm italic leading-relaxed text-brand-secondary">{data.description}</p>
            </div>
          </Card>

          <Card className="rounded-3xl p-5" padding="none">
            <div className="border-b border-slate-100 p-5">
              <h3 className="text-sm font-bold text-brand-secondary">Document Verification</h3>
            </div>
            <div className="grid gap-4 p-5 lg:grid-cols-[minmax(0,240px)_minmax(0,1fr)]">
              <div className="space-y-2">
                {docs.map((d, i) => (
                  <button
                    key={i}
                    type="button"
                    onClick={() => setSelectedDoc(i)}
                    className={cn(
                      'flex w-full items-start gap-3 rounded-2xl border p-3 text-left transition-colors',
                      selectedDoc === i ? 'border-brand-primary bg-blue-50/50' : 'border-slate-200 bg-white hover:bg-slate-50',
                    )}
                  >
                    <FileText className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                    <div className="min-w-0">
                      <p className="truncate text-xs font-bold text-brand-secondary">{d.name}</p>
                      <Badge
                        variant={d.status === 'verified' ? 'success' : d.status === 'rejected' ? 'danger' : 'warning'}
                        className="mt-1 normal-case"
                      >
                        {d.status}
                      </Badge>
                    </div>
                  </button>
                ))}
              </div>

              <div className="flex min-h-[320px] flex-col rounded-2xl border border-slate-200 bg-slate-50">
                <div className="flex flex-wrap items-center justify-between gap-2 border-b border-slate-200 bg-white px-4 py-2">
                  <span className="text-xs font-bold text-brand-muted">2 / 4</span>
                  <div className="flex gap-2">
                    <button type="button" className="rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold">
                      Zoom
                    </button>
                    <button type="button" className="rounded-lg border border-slate-200 p-1 text-slate-500">
                      <RotateCw className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      className="inline-flex items-center gap-1 rounded-lg border border-slate-200 px-2 py-1 text-xs font-bold"
                    >
                      <Download className="h-3.5 w-3.5" />
                      Download
                    </button>
                  </div>
                </div>
                <div className="relative flex flex-1 items-center justify-center p-6">
                  <div className="max-h-[280px] w-full max-w-md rounded-xl border border-dashed border-slate-300 bg-white p-8 text-center shadow-inner">
                    <p className="text-xs font-bold uppercase tracking-wide text-brand-muted">Certificate preview</p>
                    <p className="mt-2 text-sm font-semibold text-brand-secondary">{doc.name}</p>
                    <p className="mt-4 text-[10px] font-bold text-amber-800">MANUAL VERIFICATION REQUIRED</p>
                  </div>
                </div>
                <div className="border-t border-slate-200 bg-white px-4 py-3">
                  <p className="text-center text-xs font-bold text-brand-muted">Verify this document:</p>
                  <div className="mt-2 flex justify-center gap-2">
                    <button
                      type="button"
                      onClick={() => setDocStatus(selectedDoc, 'verified')}
                      className="rounded-xl bg-brand-primary px-4 py-2 text-xs font-bold text-white"
                    >
                      Approve
                    </button>
                    <button
                      type="button"
                      onClick={() => setDocStatus(selectedDoc, 'rejected')}
                      className="rounded-xl border border-slate-200 px-4 py-2 text-xs font-bold text-brand-secondary"
                    >
                      Reject
                    </button>
                  </div>
                  <p className="mt-2 text-center text-[10px] font-medium text-brand-muted">
                    Upload date {submitted} · {doc.mimeType?.includes('image') ? 'IMAGE' : 'CERTIFICATE'}
                  </p>
                </div>
              </div>
            </div>
          </Card>
        </div>

        <div className="space-y-4">
          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Review Checklist</h3>
            <ul className="mt-4 space-y-3">
              {checklist.map((c) => (
                <li key={c.id}>
                  <label className="flex cursor-pointer items-start gap-3">
                    <input
                      type="checkbox"
                      checked={c.done}
                      onChange={() => toggleCheck(c.id)}
                      className="mt-1 h-4 w-4 rounded border-slate-300 text-brand-primary"
                    />
                    <span className="text-sm font-medium text-brand-secondary">{c.label}</span>
                  </label>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Internal Notes</h3>
            <textarea
              value={notes}
              onChange={(e) => setNotes(e.target.value)}
              onBlur={() => persistNotes(notes)}
              placeholder="Add your review notes here..."
              rows={5}
              className="mt-3 w-full rounded-xl border border-slate-200 bg-slate-50 p-3 text-sm font-medium outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
            />
            <p className="mt-2 text-[10px] font-medium text-brand-muted">
              Notes are only visible to other admins.
            </p>
          </Card>

          <Card className="rounded-3xl p-5">
            <h3 className="text-sm font-bold text-brand-secondary">Submission Timeline</h3>
            <ul className="mt-4 space-y-4">
              {(data.timeline || []).map((step, i) => (
                <li key={step.key} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <span
                      className={cn(
                        'flex h-8 w-8 items-center justify-center rounded-full text-xs font-bold text-white',
                        step.tone === 'green' && 'bg-emerald-500',
                        step.tone === 'orange' && 'bg-amber-500',
                        step.tone === 'blue' && 'bg-brand-primary',
                      )}
                    >
                      {step.tone === 'green' ? <Check className="h-4 w-4" /> : i + 1}
                    </span>
                    {i < (data.timeline?.length || 0) - 1 ? (
                      <span className="mt-1 h-full min-h-[24px] w-px bg-slate-200" />
                    ) : null}
                  </div>
                  <div>
                    <p className="text-sm font-bold text-brand-secondary">{step.title}</p>
                    <p className="text-xs font-semibold text-brand-muted">
                      {new Date(step.at).toLocaleString('en-US', {
                        month: 'short',
                        day: 'numeric',
                        hour: 'numeric',
                        minute: '2-digit',
                      })}
                    </p>
                    {step.subtitle ? <p className="mt-1 text-xs text-brand-muted">{step.subtitle}</p> : null}
                  </div>
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Modal
        open={modal === 'approve'}
        onClose={() => setModal(null)}
        title="Approve Product Submission"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-brand-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving}
              onClick={submitApprove}
              className="rounded-xl bg-emerald-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Confirm Approval
            </button>
          </div>
        }
      >
        <div className="rounded-xl border border-emerald-200 bg-emerald-50/80 p-4 text-sm text-emerald-900">
          <p className="flex items-start gap-2 font-bold">
            <Check className="mt-0.5 h-4 w-4 shrink-0" />
            Confirm Approval
          </p>
          <p className="mt-2 font-medium leading-relaxed">
            Approving this product will grant it a &apos;Verified&apos; status on the platform. The manufacturer will be
            notified and can proceed with batch registration.
          </p>
        </div>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Final approval note (optional)</span>
          <textarea
            value={approveNote}
            onChange={(e) => setApproveNote(e.target.value)}
            rows={3}
            placeholder="Add any final remarks for the manufacturer..."
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
          />
        </label>
      </Modal>

      <Modal
        open={modal === 'reject'}
        onClose={() => setModal(null)}
        title="Reject Product Submission"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-brand-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving || !rejectReason.trim()}
              onClick={submitReject}
              className="rounded-xl bg-red-600 px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Reject Submission
            </button>
          </div>
        }
      >
        <div className="rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-900">
          <p className="font-bold">Confirm Rejection</p>
          <p className="mt-2 font-medium leading-relaxed">
            This will permanently reject the current submission. The manufacturer will need to submit a new application.
          </p>
        </div>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Rejection reason (required)</span>
          <textarea
            value={rejectReason}
            onChange={(e) => setRejectReason(e.target.value)}
            rows={4}
            placeholder="Please provide a detailed reason for rejection..."
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
          />
        </label>
      </Modal>

      <Modal
        open={modal === 'changes'}
        onClose={() => setModal(null)}
        title="Request Changes"
        size="lg"
        footer={
          <div className="flex justify-end gap-2">
            <button
              type="button"
              onClick={() => setModal(null)}
              className="rounded-xl border border-slate-200 px-4 py-2.5 text-sm font-bold text-brand-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={saving || !changesMsg.trim()}
              onClick={submitChanges}
              className="rounded-xl bg-brand-primary px-5 py-2.5 text-sm font-bold text-white disabled:opacity-50"
            >
              Send Request
            </button>
          </div>
        }
      >
        <div className="rounded-xl border border-amber-200 bg-amber-50 p-4 text-sm text-amber-950">
          <p className="font-bold">Request Clarification</p>
          <p className="mt-2 font-medium leading-relaxed">
            Ask the manufacturer to update specific documents or provide more information without rejecting the entire
            submission.
          </p>
        </div>
        <label className="mt-4 block">
          <span className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Instructions for manufacturer</span>
          <textarea
            value={changesMsg}
            onChange={(e) => setChangesMsg(e.target.value)}
            rows={4}
            placeholder="List the specific changes or documents required..."
            className="mt-2 w-full rounded-xl border border-slate-200 p-3 text-sm outline-none focus:border-brand-primary focus:ring-2 focus:ring-brand-primary/15"
          />
        </label>
      </Modal>
    </>
  )
}
