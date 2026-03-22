import { Link } from 'react-router-dom'
import { CheckCircle2, Clock } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { ManufacturerAuthShell } from '../components/manufacturer/ManufacturerAuthShell'

export function ManufacturerAccountReviewPage() {
  return (
    <ManufacturerAuthShell>
      <Card className="w-full max-w-md border-slate-100 text-center shadow-xl" padding="lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-orange-100 text-orange-600">
          <Clock className="h-8 w-8" strokeWidth={2} />
        </div>
        <h1 className="mt-6 text-2xl font-bold text-brand-secondary">Account under review</h1>
        <p className="mt-4 text-base leading-relaxed text-brand-muted">
          Your manufacturer application is currently being reviewed by our regulatory team. This process
          typically takes 2–3 business days.
        </p>

        <div className="mt-8 space-y-4 rounded-xl bg-slate-50 p-6 text-left">
          <div className="flex items-center gap-3">
            <CheckCircle2 className="h-6 w-6 shrink-0 text-emerald-500" aria-hidden />
            <div>
              <p className="font-bold text-brand-secondary">Email verified</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span className="flex h-6 w-6 shrink-0 items-center justify-center text-orange-500">
              <Clock className="h-6 w-6" />
            </span>
            <div>
              <p className="font-bold text-brand-secondary">Regulatory compliance check</p>
            </div>
          </div>
          <div className="flex items-center gap-3">
            <span
              className="h-6 w-6 shrink-0 rounded-full border-2 border-slate-300"
              aria-hidden
            />
            <div>
              <p className="font-medium text-brand-muted">Final approval</p>
            </div>
          </div>
        </div>

        <Link
          to="/"
          className="mt-8 flex h-12 w-full items-center justify-center rounded-xl border-2 border-brand-primary text-sm font-semibold text-brand-primary transition-colors hover:bg-blue-50"
        >
          Return to homepage
        </Link>
      </Card>
    </ManufacturerAuthShell>
  )
}
