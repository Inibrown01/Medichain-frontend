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
import { manufacturerLogin, manufacturerRegister, setManufacturerSession } from '../lib/manufacturerApi'

const titles = ['Company information', 'Contact details', 'Document verification'] as const

export function ManufacturerRegisterPage() {
  const { step: stepParam } = useParams()
  const navigate = useNavigate()
  const step = Number(stepParam)
  const [showPw, setShowPw] = useState(false)
  const [showPw2, setShowPw2] = useState(false)

  const [company, setCompany] = useState('')
  const [reg, setReg] = useState('')
  const [country, setCountry] = useState('Nigeria')
  const [address, setAddress] = useState('')

  const [email, setEmail] = useState('')
  const [phone, setPhone] = useState('')
  const [contact, setContact] = useState('')
  const [password, setPassword] = useState('')
  const [password2, setPassword2] = useState('')

  const [step2Error, setStep2Error] = useState<string | null>(null)
  const [step3Error, setStep3Error] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)

  if (!stepParam || Number.isNaN(step) || step < 1 || step > 3) {
    return <Navigate to="/manufacturer/register/1" replace />
  }

  return (
    <ManufacturerAuthShell footer={<ManufacturerFooterLoginLink />}>
      <ManufacturerRegisterHeader />

      <Card className="w-full max-w-2xl border-slate-100 shadow-xl" padding="lg">
        <Stepper steps={3} current={step} className="mb-10" />
        <h2 className="text-lg font-bold text-brand-secondary">{titles[step - 1]}</h2>
        {step === 3 ? (
          <p className="mt-1 text-sm text-brand-muted">
            Please upload high-quality scans of your regulatory documents. Your account is created when you finish this step.
          </p>
        ) : null}

        {step === 1 ? (
          <form
            className="mt-8 space-y-5"
            onSubmit={(e) => {
              e.preventDefault()
              if (!company.trim()) return
              navigate('/manufacturer/register/2')
            }}
          >
            <Input
              name="company"
              label="Company name"
              placeholder="e.g., PharmaCorp Nigeria"
              value={company}
              onChange={(e) => setCompany(e.target.value)}
              required
              leftIcon={<Building2 className="h-4 w-4" />}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                name="reg"
                label="Registration number"
                placeholder="CR-012345"
                value={reg}
                onChange={(e) => setReg(e.target.value)}
                leftIcon={<ShieldCheck className="h-4 w-4" />}
              />
              <Input
                name="country"
                label="Country"
                placeholder="Nigeria"
                value={country}
                onChange={(e) => setCountry(e.target.value)}
                leftIcon={<Globe className="h-4 w-4" />}
              />
            </div>
            <Input
              name="address"
              label="Company address"
              placeholder="14 Business Lane, Lagos State"
              value={address}
              onChange={(e) => setAddress(e.target.value)}
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
              setStep2Error(null)
              if (password.length < 8) {
                setStep2Error('Password must be at least 8 characters.')
                return
              }
              if (password !== password2) {
                setStep2Error('Passwords do not match.')
                return
              }
              navigate('/manufacturer/register/3')
            }}
          >
            {step2Error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{step2Error}</p>
            ) : null}
            <Input
              type="email"
              name="email"
              label="Official email"
              placeholder="contact@pharmacorp.ng"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
              leftIcon={<Mail className="h-4 w-4" />}
            />
            <Input
              type="tel"
              name="phone"
              label="Phone number"
              placeholder="+234 800 123 4567"
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              leftIcon={<Phone className="h-4 w-4" />}
            />
            <Input
              name="contact"
              label="Contact person name"
              placeholder="Madeleine Nkiru"
              value={contact}
              onChange={(e) => setContact(e.target.value)}
              leftIcon={<User className="h-4 w-4" />}
            />
            <div className="grid gap-5 sm:grid-cols-2">
              <Input
                name="password"
                type={showPw ? 'text' : 'password'}
                label="Password"
                placeholder="••••••••"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                minLength={8}
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
                value={password2}
                onChange={(e) => setPassword2(e.target.value)}
                required
                minLength={8}
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
            onSubmit={async (e) => {
              e.preventDefault()
              setStep3Error(null)
              setSubmitting(true)
              try {
                await manufacturerRegister({
                  email: email.trim().toLowerCase(),
                  password,
                  companyName: company.trim(),
                })
                const session = await manufacturerLogin(email.trim().toLowerCase(), password)
                setManufacturerSession(session)
                navigate('/manufacturer/verify-email', {
                  state: { email: email.trim().toLowerCase() },
                })
              } catch (err) {
                setStep3Error(err instanceof Error ? err.message : 'Could not create account')
              } finally {
                setSubmitting(false)
              }
            }}
          >
            {step3Error ? (
              <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{step3Error}</p>
            ) : null}
            <FileUploadRow title="Business license" />
            <FileUploadRow title="Regulatory certificate" />
            <FileUploadRow title="Manufacturer approval" />
            <p className="text-xs text-brand-muted">
              You can complete document uploads later from the portal if needed. Creating your account enables the product
              submission workflow.
            </p>
            <div className="flex flex-col gap-3 pt-4 sm:flex-row sm:justify-between">
              <Button
                type="button"
                variant="secondary"
                className="w-full sm:w-auto"
                onClick={() => navigate('/manufacturer/register/2')}
                disabled={submitting}
              >
                Back
              </Button>
              <Button
                type="submit"
                className="w-full sm:min-w-[200px]"
                disabled={submitting}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {submitting ? 'Creating account…' : 'Create account'}
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
