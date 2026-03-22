import { useState } from 'react'
import { Link, Navigate, useNavigate, useParams } from 'react-router-dom'
import {
  ArrowRight,
  Building2,
  Eye,
  EyeOff,
  Globe,
  Lock,
  Mail,
  MapPin,
  Phone,
  ShieldCheck,
  User,
} from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { Stepper } from '../components/ui/Stepper'
import {
  ManufacturerAuthShell,
  ManufacturerFooterLoginLink,
  ManufacturerRegisterHeader,
} from '../components/manufacturer/ManufacturerAuthShell'
import { FileUploadRow } from '../components/manufacturer/FileUploadRow'

const titles = ['Company information', 'Contact details', 'Document verification'] as const

export function ManufacturerRegisterPage() {
  const { step: stepParam } = useParams()
  const navigate = useNavigate()
  const step = Number(stepParam)
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)

  if (!stepParam || Number.isNaN(step) || step < 1 || step > 3) {
    return <Navigate to="/manufacturer/register/1" replace />
  }

  return (
    <ManufacturerAuthShell
      footer={<ManufacturerFooterLoginLink />}
    >
      <ManufacturerRegisterHeader />

      <Card className="w-full max-w-2xl border-slate-100 shadow-xl" padding="lg">
        <Stepper steps={3} current={step} className="mb-10" />
        <h2 className="text-lg font-bold text-brand-secondary">{titles[step - 1]}</h2>
        {step === 3 ? (
          <p className="mt-1 text-sm text-brand-muted">
            Please upload high-quality scans of your regulatory documents.
          </p>
        ) : null}

        {step === 1 ? (
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/manufacturer/register/2')
            }}
          >
            <Input
              name="company"
              label="Company name"
              placeholder="e.g., PharmaCorp Nigeria"
              leftIcon={<Building2 className="h-4 w-4" />}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                name="reg"
                label="Registration number"
                placeholder="CR-012345"
                leftIcon={<ShieldCheck className="h-4 w-4" />}
              />
              <Input
                name="country"
                label="Country"
                placeholder="Nigeria"
                leftIcon={<Globe className="h-4 w-4" />}
              />
            </div>
            <Input
              name="address"
              label="Company address"
              placeholder="14 Business Lane, Lagos State"
              leftIcon={<MapPin className="h-4 w-4" />}
            />
            <Button type="submit" className="w-full" size="lg" rightIcon={<ArrowRight className="h-4 w-4" />}>
              Continue
            </Button>
          </form>
        ) : null}

        {step === 2 ? (
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/manufacturer/register/3')
            }}
          >
            <Input
              type="email"
              name="email"
              label="Official email"
              placeholder="contact@pharmacorp.ng"
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <Input
              type="tel"
              name="phone"
              label="Phone number"
              placeholder="+234 800 123 4567"
              leftIcon={<Phone className="h-4 w-4" />}
            />
            <Input
              name="contact"
              label="Contact person name"
              placeholder="Madeleine Nkiru"
              leftIcon={<User className="h-4 w-4" />}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                name="password"
                type={showPw ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4" />}
                rightElement={
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                    onClick={() => setShowPw(!showPw)}
                    aria-label={showPw ? 'Hide password' : 'Show password'}
                  >
                    {showPw ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
              <Input
                name="password2"
                type={showPw2 ? 'text' : 'password'}
                label="Confirm password"
                placeholder="••••••••"
                leftIcon={<Lock className="h-4 w-4" />}
                rightElement={
                  <button
                    type="button"
                    className="rounded-lg p-1.5 text-slate-500 hover:bg-slate-100"
                    onClick={() => setShowPw2(!showPw2)}
                    aria-label={showPw2 ? 'Hide password' : 'Show password'}
                  >
                    {showPw2 ? <EyeOff className="h-4 w-4" /> : <Eye className="h-4 w-4" />}
                  </button>
                }
              />
            </div>
            <div className="flex flex-col gap-3 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => navigate('/manufacturer/register/1')}
              >
                Back
              </Button>
              <Button type="submit" className="w-full sm:min-w-[200px]" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Continue
              </Button>
            </div>
          </form>
        ) : null}

        {step === 3 ? (
          <form
            className="mt-8 space-y-4"
            onSubmit={(e) => {
              e.preventDefault()
              navigate('/manufacturer/verify-email', {
                state: { email: 'contact@pharmacorp.ng' },
              })
            }}
          >
            <FileUploadRow title="Business license" />
            <FileUploadRow title="Regulatory certificate" />
            <FileUploadRow title="Manufacturer approval" />
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => navigate('/manufacturer/register/2')}
              >
                Back
              </Button>
              <Button type="submit" className="w-full sm:min-w-[200px]" rightIcon={<ArrowRight className="h-4 w-4" />}>
                Create account
              </Button>
            </div>
          </form>
        ) : null}
      </Card>

      <p className="mt-6 text-center text-sm text-brand-muted md:hidden">
        Step {step} of 3 —{' '}
        <Link to="/manufacturer/login" className="font-semibold text-brand-primary">
          Login
        </Link>
      </p>
    </ManufacturerAuthShell>
  )
}
