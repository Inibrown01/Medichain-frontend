import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Building2, Lock, Mail } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { AuthEnter } from '../components/motion/AuthEnter'
import { manufacturerLogin, setManufacturerSession } from '../lib/manufacturerApi'

export function ManufacturerLoginPage() {
  const navigate = useNavigate()
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <AuthEnter>
          <div className="mb-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-brand-primary">
              <Building2 className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-brand-secondary">Manufacturer Portal</h1>
            <p className="mt-2 text-brand-muted">Secure access to your product registry.</p>
          </div>

          <Card className="w-full max-w-md border-slate-100 shadow-lg" padding="lg">
            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault()
                setError(null)
                setLoading(true)
                try {
                  const data = await manufacturerLogin(email.trim(), password)
                  setManufacturerSession(data)
                  navigate('/manufacturer/dashboard', { replace: true })
                } catch (err) {
                  setError(err instanceof Error ? err.message : 'Sign in failed')
                } finally {
                  setLoading(false)
                }
              }}
            >
              {error ? (
                <p className="rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{error}</p>
              ) : null}
              <Input
                type="email"
                name="email"
                label="Official email"
                placeholder="contact@pharmcorp.ng"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail className="h-4 w-4" />}
              />
              <div>
                <div className="mb-1.5 flex items-center justify-between">
                  <label htmlFor="password" className="text-sm font-semibold text-brand-secondary">
                    Password
                  </label>
                  <button type="button" className="text-sm font-medium text-brand-primary hover:underline">
                    Forgot password?
                  </button>
                </div>
                <Input
                  id="password"
                  name="password"
                  type="password"
                  placeholder="••••••••"
                  autoComplete="current-password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  required
                  leftIcon={<Lock className="h-4 w-4" />}
                />
              </div>
              <label className="flex items-center gap-2 text-sm text-brand-muted">
                <input type="checkbox" className="rounded border-slate-300" />
                Remember login
              </label>
              <Button
                type="submit"
                className="w-full"
                size="lg"
                disabled={loading}
                rightIcon={<ArrowRight className="h-4 w-4" />}
              >
                {loading ? 'Signing in…' : 'Sign in to dashboard'}
              </Button>
            </form>
          </Card>

          <p className="mt-8 text-center text-sm text-brand-muted">
            New manufacturer?{' '}
            <Link to="/manufacturer/register/1" className="font-semibold text-brand-primary hover:underline">
              Register your company
            </Link>
          </p>
        </AuthEnter>
      </div>
    </div>
  )
}
