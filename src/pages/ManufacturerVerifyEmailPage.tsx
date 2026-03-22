import { Link, useLocation, useNavigate } from 'react-router-dom'
import { Mail } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Button } from '../components/ui/Button'
import { ManufacturerAuthShell } from '../components/manufacturer/ManufacturerAuthShell'

export function ManufacturerVerifyEmailPage() {
  const navigate = useNavigate()
  const { state } = useLocation() as { state?: { email?: string } }
  const email = state?.email ?? 'contact@pharmacorp.ng'

  return (
    <ManufacturerAuthShell>
      <Card className="w-full max-w-md border-slate-100 shadow-xl" padding="lg">
        <div className="text-center">
          <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-brand-primary">
            <Mail className="h-7 w-7" strokeWidth={2} />
          </div>
          <h1 className="mt-6 text-2xl font-bold text-brand-secondary">Verify your email</h1>
          <p className="mt-3 text-sm leading-relaxed text-brand-muted">
            We&apos;ve sent a verification link to{' '}
            <strong className="font-semibold text-brand-secondary">{email}</strong>. Please check your inbox
            to continue.
          </p>
        </div>
        <div className="mt-8 space-y-4">
          <Button
            type="button"
            className="w-full"
            size="lg"
            onClick={() => navigate('/manufacturer/pending-review')}
          >
            I&apos;ve verified my email
          </Button>
          <button
            type="button"
            className="w-full text-center text-sm font-semibold text-brand-primary hover:underline"
          >
            Resend email
          </button>
        </div>
      </Card>
      <p className="mt-8 text-center text-sm text-brand-muted">
        Wrong email?{' '}
        <Link to="/manufacturer/register/2" className="font-semibold text-brand-primary hover:underline">
          Go back
        </Link>
      </p>
    </ManufacturerAuthShell>
  )
}
