import { ShieldAlert } from 'lucide-react'
import { Link } from 'react-router-dom'
import { Card } from '../components/ui/Card'
import { ManufacturerAuthShell } from '../components/manufacturer/ManufacturerAuthShell'
import { cn } from '../lib/cn'

const findings = [
  'Missing valid NAFDAC Manufacturing License',
  'Incomplete batch history for Q4 2025',
  'Corporate address verification failed',
] as const

export function ManufacturerAccountFlaggedPage() {
  return (
    <ManufacturerAuthShell>
      <Card className="w-full max-w-lg border-slate-100 shadow-xl" padding="lg">
        <div className="text-center">
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50 text-red-600">
            <ShieldAlert className="h-9 w-9" strokeWidth={2} />
          </div>
          <p className="mt-4 text-xs font-bold uppercase tracking-wider text-red-600">• Action required</p>
          <h1 className="mt-3 flex flex-wrap items-center justify-center gap-x-2 font-sans text-3xl font-bold text-brand-secondary md:text-4xl">
            <span>Account</span>
            <span className="font-serif italic text-red-600">Flagged.</span>
          </h1>
          <p className="mt-4 text-sm leading-relaxed text-brand-muted">
            Regulatory review identified inconsistencies in your documentation.{' '}
            <strong className="font-semibold text-brand-secondary">Account access restricted.</strong>
          </p>
        </div>

        <div className="mt-8 rounded-xl border border-red-100 bg-red-50/80 p-5 text-left">
          <p className="text-xs font-bold uppercase tracking-wide text-red-700">Review findings</p>
          <ul className="mt-3 space-y-2 text-sm text-brand-secondary">
            {findings.map((f) => (
              <li key={f} className="flex gap-2">
                <span className="text-red-500" aria-hidden>
                  •
                </span>
                {f}
              </li>
            ))}
          </ul>
        </div>

        <div className="mt-8 flex flex-col gap-3 sm:flex-row">
          <Link
            to="/contact"
            className={cn(
              'inline-flex h-12 flex-1 items-center justify-center rounded-xl border border-slate-200 bg-white px-4 text-sm font-semibold text-brand-secondary transition-colors hover:bg-slate-50',
            )}
          >
            Contact support
          </Link>
          <Link
            to="/manufacturer/register/1"
            className="inline-flex h-12 flex-1 items-center justify-center rounded-xl bg-brand-secondary px-4 text-sm font-semibold text-white transition-colors hover:bg-slate-800"
          >
            Update application
          </Link>
        </div>
      </Card>
    </ManufacturerAuthShell>
  )
}
