import { Link } from 'react-router-dom'
import { Building2, ChevronRight, MapPin } from 'lucide-react'
import { Badge } from '../ui/Badge'
import { Card } from '../ui/Card'

export type ManufacturerCardProps = {
  slug: string
  name: string
  location: string
  products: number
  /** When unknown (registry-only), pass null — shows an em dash */
  certifiedYear: number | null
}

export function ManufacturerCard({
  slug,
  name,
  location,
  products,
  certifiedYear,
}: ManufacturerCardProps) {
  return (
    <Card padding="none" className="overflow-hidden border-slate-100">
      <div className="flex items-start justify-between p-5 pb-0">
        <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-blue-50 text-brand-primary">
          <Building2 className="h-5 w-5" />
        </span>
        <Badge variant="success">Active</Badge>
      </div>
      <div className="space-y-4 p-5 pt-3">
        <div>
          <h3 className="text-lg font-bold text-brand-secondary">{name}</h3>
          <p className="mt-1 flex items-center gap-1.5 text-sm text-brand-muted">
            <MapPin className="h-4 w-4 shrink-0" aria-hidden />
            {location}
          </p>
        </div>
        <div className="grid grid-cols-2 gap-3 border-t border-slate-100 pt-4">
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Products</p>
            <p className="text-lg font-bold text-brand-secondary">{products}</p>
          </div>
          <div>
            <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Certified</p>
            <p className="text-lg font-bold text-brand-secondary">{certifiedYear != null ? certifiedYear : '—'}</p>
          </div>
        </div>
      </div>
      <Link
        to={`/manufacturers/${slug}`}
        className="flex items-center justify-center gap-1 border-t border-slate-100 bg-slate-50 py-3 text-sm font-semibold text-brand-secondary transition-colors hover:bg-slate-100"
      >
        View profile
        <ChevronRight className="h-4 w-4" aria-hidden />
      </Link>
    </Card>
  )
}
