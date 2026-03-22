import { Download, Share2 } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'
import { cn } from '../../lib/cn'

export type RecallRisk = 'high' | 'low'

export type RecallCardProps = {
  title: string
  risk: RecallRisk
  description: string
  date: string
  reference: string
}

export function RecallCard({ title, risk, description, date, reference }: RecallCardProps) {
  const border =
    risk === 'high'
      ? 'border-l-red-600'
      : 'border-l-amber-400'

  return (
    <Card padding="md" className={cn('border-l-4', border)}>
      <div className="flex flex-wrap items-start justify-between gap-3">
        <div className="flex flex-wrap items-center gap-2">
          <h3 className="text-lg font-semibold text-brand-secondary">{title}</h3>
          <Badge variant={risk === 'high' ? 'danger' : 'warning'}>
            {risk === 'high' ? 'High risk' : 'Low risk'}
          </Badge>
        </div>
        <div className="flex gap-1">
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Share"
          >
            <Share2 className="h-4 w-4" />
          </button>
          <button
            type="button"
            className="rounded-lg p-2 text-slate-500 hover:bg-slate-100"
            aria-label="Download"
          >
            <Download className="h-4 w-4" />
          </button>
        </div>
      </div>
      <p className="mt-3 text-sm leading-relaxed text-brand-muted">{description}</p>
      <div className="mt-4 flex flex-wrap items-center justify-between gap-2 border-t border-slate-100 pt-4 text-xs text-brand-muted">
        <span>
          Published {date} · Ref {reference}
        </span>
        <button type="button" className="font-semibold text-brand-primary hover:underline">
          Full technical notice →
        </button>
      </div>
    </Card>
  )
}
