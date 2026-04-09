import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { Building2, Download, ShieldAlert } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { adminFetch } from '../../lib/adminApi'

type ProductRow = {
  productId: number
  name: string
  batchNumber: string
  category: string
  status: string
}

type Detail = {
  id: string
  companyName: string
  email: string
  isActive: boolean
  licenseSuspended: boolean
  suspensionReason: string
  complianceDocuments: { name: string; meta: string }[]
  auditHistory: { id: string; title: string; date: string; status: string }[]
  products: ProductRow[]
}

export function AdminManufacturerDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<Detail | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [suspendOpen, setSuspendOpen] = useState(false)
  const [reason, setReason] = useState('')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    if (!id) return
    let cancelled = false
    ;(async () => {
      try {
        setNotFound(false)
        const res = await adminFetch(`/manufacturers/${id}/detail`)
        const json = (await res.json()) as { ok?: boolean; data?: Detail }
        if (res.status === 404) {
          if (!cancelled) {
            setData(null)
            setNotFound(true)
          }
          return
        }
        if (!res.ok || !json.ok || !json.data) throw new Error('bad')
        if (!cancelled) setData(json.data)
      } catch {
        if (!cancelled) {
          setData(null)
          setNotFound(true)
        }
      }
    })()
    return () => {
      cancelled = true
    }
  }, [id])

  const suspend = async () => {
    if (!id) return
    setBusy(true)
    try {
      await adminFetch(`/manufacturers/${id}/suspend-license`, {
        method: 'POST',
        body: JSON.stringify({ reason }),
      })
      setSuspendOpen(false)
      setReason('')
      const res = await adminFetch(`/manufacturers/${id}/detail`)
      const json = (await res.json()) as { ok?: boolean; data?: Detail }
      if (res.ok && json.ok && json.data) setData(json.data)
    } finally {
      setBusy(false)
    }
  }

  if (!data) {
    return (
      <p className="text-sm text-brand-muted">
        {notFound ? 'Manufacturer not found.' : 'Loading manufacturer…'}{' '}
        <Link to="/admin/manufacturers" className="text-brand-primary">
          Back to list
        </Link>
      </p>
    )
  }

  return (
    <>
      <PageHeader
        title="Manufacturer details"
        subtitle={data.companyName}
        actions={
          <div className="flex flex-wrap gap-3">
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-brand-secondary"
            >
              Contact compliance
            </button>
            <button
              type="button"
              onClick={() => setSuspendOpen(true)}
              disabled={data.licenseSuspended}
              className="inline-flex h-11 items-center justify-center rounded-xl bg-red-600 px-4 text-sm font-semibold text-white disabled:opacity-50"
            >
              Suspend license
            </button>
            <button
              type="button"
              className="inline-flex h-11 items-center justify-center rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white"
            >
              Renew certificate
            </button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_320px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-2xl bg-blue-50 text-brand-primary">
                <Building2 className="h-8 w-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-brand-secondary">{data.companyName}</h2>
                <p className="mt-1 text-sm text-brand-muted">{data.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  {data.licenseSuspended ? (
                    <Badge variant="danger">License suspended</Badge>
                  ) : (
                    <Badge variant="success">Active</Badge>
                  )}
                  <Badge variant="outline">ID {data.id.slice(-8)}</Badge>
                </div>
              </div>
            </div>
            <p className="mt-6 text-sm font-medium text-brand-muted">
              Total products:{' '}
              <span className="text-brand-secondary">{data.products.length}</span>
            </p>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-brand-secondary">Registered products</h3>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full min-w-[560px] text-left text-sm">
                <thead>
                  <tr className="border-b border-slate-200 text-xs font-semibold uppercase text-brand-muted">
                    <th className="pb-2 pr-3">Product</th>
                    <th className="pb-2 pr-3">Batch</th>
                    <th className="pb-2 pr-3">NAFDAC / ref</th>
                    <th className="pb-2">Status</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-slate-100">
                  {data.products.length === 0 ? (
                    <tr>
                      <td colSpan={4} className="py-8 text-center text-brand-muted">
                        No products linked to this manufacturer name in the registry.
                      </td>
                    </tr>
                  ) : (
                    data.products.map((p) => (
                      <tr key={`${p.productId}-${p.batchNumber}`}>
                        <td className="py-2.5 pr-3 font-medium text-brand-secondary">{p.name}</td>
                        <td className="py-2.5 pr-3 text-brand-muted">{p.batchNumber}</td>
                        <td className="py-2.5 pr-3 text-brand-muted">{p.category}</td>
                        <td className="py-2.5">
                          {p.status === 'active' ? (
                            <Badge variant="success">Active</Badge>
                          ) : p.status === 'flagged' ? (
                            <Badge variant="danger">Flagged</Badge>
                          ) : (
                            <Badge variant="warning">Review</Badge>
                          )}
                        </td>
                      </tr>
                    ))
                  )}
                </tbody>
              </table>
            </div>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Compliance documents</h3>
            <ul className="mt-3 space-y-2">
              {data.complianceDocuments.map((d) => (
                <li key={d.name}>
                  <button
                    type="button"
                    className="flex w-full items-center justify-between gap-2 rounded-xl border border-slate-200 px-3 py-2 text-left text-sm font-medium text-brand-primary hover:bg-slate-50"
                  >
                    <span className="truncate">{d.name}</span>
                    <Download className="h-4 w-4 shrink-0" />
                  </button>
                  <p className="mt-0.5 text-xs text-brand-muted">{d.meta}</p>
                </li>
              ))}
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Recent audit history</h3>
            <ul className="mt-3 space-y-3">
              {data.auditHistory.map((a) => (
                <li key={a.id} className="flex items-center justify-between gap-2 text-sm">
                  <div>
                    <p className="font-semibold text-brand-secondary">{a.title}</p>
                    <p className="text-xs text-brand-muted">{a.date}</p>
                  </div>
                  {a.status === 'passed' ? (
                    <Badge variant="success">Passed</Badge>
                  ) : (
                    <Badge variant="warning">Pending</Badge>
                  )}
                </li>
              ))}
            </ul>
          </Card>
        </div>
      </div>

      <Modal
        open={suspendOpen}
        onClose={() => setSuspendOpen(false)}
        title="Suspend manufacturer license"
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setSuspendOpen(false)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-brand-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void suspend()}
              className="h-11 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Suspend license
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
          <ShieldAlert className="h-5 w-5 shrink-0 text-red-600" />
          <div>
            <p className="font-semibold text-red-900">Confirm suspension</p>
            <p className="mt-1 text-sm text-red-800/90">
              Suspending {data.companyName} will prevent them from registering new products or batches. Existing batches
              may be marked for review.
            </p>
          </div>
        </div>
        <label className="mt-5 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Reason for suspension</span>
          <textarea
            value={reason}
            onChange={(e) => setReason(e.target.value)}
            rows={4}
            placeholder="Provide detailed justification for license suspension..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-brand-primary/20 focus:border-brand-primary focus:ring-4"
          />
        </label>
      </Modal>
    </>
  )
}
