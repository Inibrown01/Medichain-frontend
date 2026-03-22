import { Link } from 'react-router-dom'
import { ArrowRight, ShieldCheck } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { ManufacturerAuthShell } from '../components/manufacturer/ManufacturerAuthShell'

export function ManufacturerVerificationSuccessPage() {
  return (
    <ManufacturerAuthShell>
      <Card className="w-full max-w-lg border-slate-100 text-center shadow-xl" padding="lg">
        <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-emerald-100 text-emerald-600">
          <ShieldCheck className="h-9 w-9" strokeWidth={2} />
        </div>
        <p className="mt-4 text-xs font-bold uppercase tracking-wider text-emerald-600">• Verification complete</p>
        <h1 className="mt-3 flex flex-wrap items-center justify-center gap-x-2 font-sans text-3xl font-bold text-brand-secondary md:text-4xl">
          <span>Account</span>
          <span className="font-serif italic text-emerald-600">Verified.</span>
        </h1>
        <p className="mt-4 text-sm leading-relaxed text-brand-muted">
          Your manufacturer credentials have been authenticated. You are now a{' '}
          <strong className="font-semibold text-brand-secondary">National Partner</strong>.
        </p>

        <div className="mt-8 grid grid-cols-2 gap-3">
          <div className="rounded-xl bg-slate-50 p-4 text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Registry access</p>
            <p className="mt-1 font-semibold text-brand-secondary">Full permissions</p>
          </div>
          <div className="rounded-xl bg-slate-50 p-4 text-left">
            <p className="text-[10px] font-bold uppercase tracking-wider text-brand-muted">Verification limit</p>
            <p className="mt-1 font-semibold text-brand-secondary">Unlimited</p>
          </div>
        </div>

        <Link
          to="/manufacturer/login"
          className="mt-8 flex h-14 w-full items-center justify-center gap-2 rounded-xl bg-brand-secondary text-base font-semibold text-white transition-colors hover:bg-slate-800"
        >
          Enter dashboard
          <ArrowRight className="h-5 w-5" aria-hidden />
        </Link>
      </Card>
    </ManufacturerAuthShell>
  )
}
