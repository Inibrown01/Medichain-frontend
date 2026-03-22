import { Link } from 'react-router-dom'
import { Package } from 'lucide-react'
import { StatusBadge, type VerificationStatus } from './StatusBadge'
import { cn } from '../../lib/cn'

export type ProductRowProps = {
  id: string
  name: string
  batch: string
  expiry: string
  manufacturer: string
  nafdacId: string
  classification: string
  status: VerificationStatus
}

export function ProductRow({
  id,
  name,
  batch,
  expiry,
  manufacturer,
  nafdacId,
  classification,
  status,
}: ProductRowProps) {
  return (
    <div className="grid grid-cols-1 gap-4 rounded-2xl border border-slate-100 bg-white p-4 shadow-sm md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.7fr)] md:items-center">
      <div className="flex gap-3">
        <span
          className={cn(
            'mt-0.5 flex h-10 w-10 shrink-0 items-center justify-center rounded-xl',
            status === 'verified' && 'bg-emerald-50 text-emerald-600',
            status === 'flagged' && 'bg-orange-50 text-orange-600',
            status === 'pending' && 'bg-amber-50 text-amber-700',
          )}
        >
          <Package className="h-5 w-5" aria-hidden />
        </span>
        <div className="min-w-0">
          <Link
            to={`/verify/${encodeURIComponent(id)}`}
            className="font-semibold text-brand-secondary hover:text-brand-primary"
          >
            {name}
          </Link>
          <p className="mt-1 text-xs text-brand-muted">
            Batch {batch} · Exp {expiry}
          </p>
        </div>
      </div>
      <p className="text-sm text-brand-secondary md:border-l md:border-slate-100 md:pl-4">{manufacturer}</p>
      <p className="font-mono text-sm text-brand-secondary md:border-l md:border-slate-100 md:pl-4">
        {nafdacId}
      </p>
      <span className="inline-flex w-fit rounded-full bg-slate-100 px-2 py-0.5 text-xs font-semibold uppercase tracking-wide text-slate-600 md:border-l md:border-slate-100 md:pl-4">
        {classification}
      </span>
      <div className="md:flex md:justify-end md:border-l md:border-slate-100 md:pl-4">
        <StatusBadge status={status} />
      </div>
    </div>
  )
}
