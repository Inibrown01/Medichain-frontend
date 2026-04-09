import { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { ArrowRight, Lock, Mail, Shield } from 'lucide-react'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { Button } from '../components/ui/Button'
import { AuthEnter } from '../components/motion/AuthEnter'
import { adminLogin, isAdminSessionValid } from '../lib/adminApi'

export function AdminLoginPage() {
  const navigate = useNavigate()
  useEffect(() => {
    if (isAdminSessionValid()) navigate('/admin/dashboard', { replace: true })
  }, [navigate])
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [rememberMe, setRememberMe] = useState(false)
  const [error, setError] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)

  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-12">
        <AuthEnter>
          <div className="mb-10 text-center">
            <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-indigo-100 text-indigo-700">
              <Shield className="h-7 w-7" />
            </div>
            <h1 className="mt-6 text-3xl font-bold text-brand-secondary">Admin sign in</h1>
            <p className="mt-2 text-brand-muted">Regulatory dashboard — JWT required.</p>
          </div>

          <Card className="w-full max-w-md border-slate-100 shadow-lg" padding="lg">
            <form
              className="space-y-5"
              onSubmit={async (e) => {
                e.preventDefault()
                setError(null)
                setLoading(true)
                try {
                  await adminLogin(email.trim(), password, { remember: rememberMe })
                  navigate('/admin/dashboard', { replace: true })
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
                label="Admin email"
                autoComplete="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                leftIcon={<Mail className="h-4 w-4" />}
              />
              <Input
                name="password"
                type="password"
                label="Password"
                autoComplete="current-password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                leftIcon={<Lock className="h-4 w-4" />}
              />
              <label className="flex cursor-pointer items-start gap-3 text-sm text-brand-secondary">
                <input
                  type="checkbox"
                  className="mt-0.5 h-4 w-4 rounded border-slate-300 text-brand-primary focus:ring-brand-primary"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>
                  <span className="font-semibold">Remember me on this device</span>
                  <span className="mt-0.5 block text-xs font-normal text-brand-muted">
                    When off, signing out happens when you close the browser. When on, your session is stored longer
                    (still sign out from the menu when sharing a computer).
                  </span>
                </span>
              </label>
              <Button type="submit" className="w-full" size="lg" disabled={loading} rightIcon={<ArrowRight className="h-4 w-4" />}>
                {loading ? 'Signing in…' : 'Continue to dashboard'}
              </Button>
            </form>
          </Card>

          <p className="mt-8 text-center text-sm text-brand-muted">
            <Link to="/" className="font-semibold text-brand-primary hover:underline">
              Back to public site
            </Link>
          </p>
        </AuthEnter>
      </div>
    </div>
  )
}
