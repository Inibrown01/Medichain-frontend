import { useEffect, useState } from 'react'
import { HardDrive, RefreshCw, Save, Server, Cpu } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type General = {
  platformName: string
  regulatoryAuthority: string
  primaryLanguage: string
  timezone: string
  maintenanceMode: boolean
}

type Security = {
  twoFactorRequired: boolean
  ipWhitelisting: boolean
  sessionTimeout: boolean
  passwordComplexity: boolean
}

const SUBNAV = [
  { id: 'general', label: 'General' },
  { id: 'security', label: 'Security' },
  { id: 'notifications', label: 'Notifications' },
  { id: 'database', label: 'Database' },
  { id: 'api', label: 'API & integrations' },
] as const

function Toggle({
  checked,
  onChange,
  label,
  description,
}: {
  checked: boolean
  onChange: (v: boolean) => void
  label: string
  description: string
}) {
  return (
    <div className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/60 px-4 py-3">
      <div>
        <p className="font-semibold text-brand-secondary">{label}</p>
        <p className="mt-0.5 text-sm text-brand-muted">{description}</p>
      </div>
      <button
        type="button"
        role="switch"
        aria-checked={checked}
        onClick={() => onChange(!checked)}
        className={cn(
          'relative mt-1 h-7 w-12 shrink-0 rounded-full transition-colors',
          checked ? 'bg-brand-primary' : 'bg-slate-300',
        )}
      >
        <span
          className={cn(
            'absolute top-0.5 h-6 w-6 rounded-full bg-white shadow transition-transform',
            checked ? 'left-5' : 'left-0.5',
          )}
        />
      </button>
    </div>
  )
}

export function AdminSettingsPage() {
  const [section, setSection] = useState<(typeof SUBNAV)[number]['id']>('general')
  const [general, setGeneral] = useState<General | null>(null)
  const [security, setSecurity] = useState<Security | null>(null)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    try {
      const res = await adminFetch('/settings')
      const json = (await res.json()) as { ok?: boolean; data?: { general?: General; security?: Security } }
      if (res.ok && json.ok && json.data) {
        if (json.data.general) setGeneral(json.data.general)
        if (json.data.security) setSecurity(json.data.security)
      }
    } catch {
      /* demo defaults below */
    }
  }

  useEffect(() => {
    void load()
  }, [])

  const g = general || {
    platformName: 'MediChain NG',
    regulatoryAuthority: 'NAFDAC Nigeria',
    primaryLanguage: 'English (Nigeria)',
    timezone: 'WAT (UTC+1) - Lagos',
    maintenanceMode: false,
  }

  const s = security || {
    twoFactorRequired: true,
    ipWhitelisting: false,
    sessionTimeout: true,
    passwordComplexity: true,
  }

  const save = async () => {
    setBusy(true)
    try {
      await adminFetch('/settings', {
        method: 'PATCH',
        body: JSON.stringify({ general: g, security: s }),
      })
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader
        title="System settings"
        subtitle="Configure global platform parameters, security policies, and system integrations."
        actions={
          <>
            <button
              type="button"
              onClick={() => void load()}
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-brand-primary bg-white px-4 text-sm font-semibold text-brand-primary"
            >
              <RefreshCw className="h-4 w-4" />
              Reset to defaults
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void save()}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white disabled:opacity-60"
            >
              <Save className="h-4 w-4" />
              Save all changes
            </button>
          </>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[220px_1fr]">
        <Card className="h-fit p-3">
          <nav className="flex flex-col gap-1">
            {SUBNAV.map((item) => (
              <button
                key={item.id}
                type="button"
                onClick={() => setSection(item.id)}
                className={cn(
                  'rounded-xl px-3 py-2 text-left text-sm font-semibold',
                  section === item.id ? 'bg-brand-primary text-white' : 'text-brand-muted hover:bg-slate-50',
                )}
              >
                {item.label}
              </button>
            ))}
          </nav>
        </Card>

        <div className="space-y-6">
          {section === 'general' ? (
            <Card className="p-6">
              <h2 className="text-lg font-bold text-brand-secondary">General configuration</h2>
              <p className="text-sm text-brand-muted">Basic platform identity and regional settings.</p>
              <div className="mt-6 space-y-4">
                <label className="block">
                  <span className="text-xs font-semibold uppercase text-brand-muted">Platform name</span>
                  <input
                    value={g.platformName}
                    onChange={(e) => setGeneral({ ...g, platformName: e.target.value })}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase text-brand-muted">Regulatory authority</span>
                  <input
                    value={g.regulatoryAuthority}
                    onChange={(e) => setGeneral({ ...g, regulatoryAuthority: e.target.value })}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  />
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase text-brand-muted">Primary language</span>
                  <select
                    value={g.primaryLanguage}
                    onChange={(e) => setGeneral({ ...g, primaryLanguage: e.target.value })}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  >
                    <option>English (Nigeria)</option>
                    <option>English (UK)</option>
                  </select>
                </label>
                <label className="block">
                  <span className="text-xs font-semibold uppercase text-brand-muted">Timezone</span>
                  <select
                    value={g.timezone}
                    onChange={(e) => setGeneral({ ...g, timezone: e.target.value })}
                    className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
                  >
                    <option>WAT (UTC+1) - Lagos</option>
                    <option>UTC</option>
                  </select>
                </label>
                <Toggle
                  checked={g.maintenanceMode}
                  onChange={(v) => setGeneral({ ...g, maintenanceMode: v })}
                  label="Enable maintenance mode"
                  description="When enabled, only administrators can access the platform."
                />
              </div>
            </Card>
          ) : null}

          {section === 'security' ? (
            <Card className="p-6">
              <h2 className="text-lg font-bold text-brand-secondary">Security policies</h2>
              <p className="text-sm text-brand-muted">Manage authentication, encryption, and access control.</p>
              <div className="mt-6 space-y-3">
                <Toggle
                  checked={s.twoFactorRequired}
                  onChange={(v) => setSecurity({ ...s, twoFactorRequired: v })}
                  label="Two-factor authentication (2FA)"
                  description="Require 2FA for all administrative accounts."
                />
                <Toggle
                  checked={s.ipWhitelisting}
                  onChange={(v) => setSecurity({ ...s, ipWhitelisting: v })}
                  label="IP whitelisting"
                  description="Restrict admin access to specific IP ranges."
                />
                <Toggle
                  checked={s.sessionTimeout}
                  onChange={(v) => setSecurity({ ...s, sessionTimeout: v })}
                  label="Session timeout"
                  description="Automatically log out inactive users after 15 minutes."
                />
                <Toggle
                  checked={s.passwordComplexity}
                  onChange={(v) => setSecurity({ ...s, passwordComplexity: v })}
                  label="Password complexity"
                  description="Enforce strong password requirements for all users."
                />
              </div>
            </Card>
          ) : null}

          {section !== 'general' && section !== 'security' ? (
            <Card className="p-8 text-center text-sm text-brand-muted">
              This section is not wired yet. Use General and Security for settings backed by the API.
            </Card>
          ) : null}

          <div className="grid gap-4 sm:grid-cols-3">
            <Card className="flex items-center gap-3 p-4">
              <Server className="h-9 w-9 text-emerald-600" />
              <div>
                <p className="text-xs font-semibold uppercase text-brand-muted">Server status</p>
                <p className="font-bold text-brand-secondary">—</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 p-4">
              <Cpu className="h-9 w-9 text-brand-primary" />
              <div>
                <p className="text-xs font-semibold uppercase text-brand-muted">CPU load</p>
                <p className="font-bold text-brand-secondary">—</p>
              </div>
            </Card>
            <Card className="flex items-center gap-3 p-4">
              <HardDrive className="h-9 w-9 text-amber-600" />
              <div>
                <p className="text-xs font-semibold uppercase text-brand-muted">Storage</p>
                <p className="font-bold text-brand-secondary">—</p>
              </div>
            </Card>
          </div>
        </div>
      </div>
    </>
  )
}
