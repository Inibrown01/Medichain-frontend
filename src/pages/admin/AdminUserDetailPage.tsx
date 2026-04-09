import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  AlertTriangle,
  CheckCircle2,
  Info,
  KeyRound,
  Shield,
  Trash2,
  User,
} from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import {
  AdminPermissionChecklist,
  DEFAULT_PERMISSIONS,
  type AdminPermissions,
} from '../../components/admin/AdminPermissionChecklist'
import { adminFetch } from '../../lib/adminApi'
import { cn } from '../../lib/cn'

type Activity = { kind: string; title: string; timeLabel: string; target: string }

type UserDetail = {
  id: string
  fullName: string
  email: string
  role: string
  department: string
  status: string
  lastLogin: string
  accountCreated: string
  securityClearance: string
  permissions: Partial<AdminPermissions>
  activity: Activity[]
  twoFactorEnabled: boolean
  lastIp: string
  primaryDevice: string
  supervisor: string
  officeLocation: string
}

function roleLabel(role: string) {
  return role.replace(/_/g, ' ')
}

function mergePerm(p?: Partial<AdminPermissions>): AdminPermissions {
  return { ...DEFAULT_PERMISSIONS, ...p }
}

const activityIcon = (kind: string) => {
  if (kind === 'success') return <CheckCircle2 className="h-5 w-5 text-emerald-500" />
  if (kind === 'danger') return <AlertTriangle className="h-5 w-5 text-red-500" />
  if (kind === 'warning') return <AlertTriangle className="h-5 w-5 text-amber-500" />
  return <Info className="h-5 w-5 text-brand-primary" />
}

export function AdminUserDetailPage() {
  const { id } = useParams<{ id: string }>()
  const [data, setData] = useState<UserDetail | null>(null)
  const [notFound, setNotFound] = useState(false)
  const [permOpen, setPermOpen] = useState(false)
  const [permDraft, setPermDraft] = useState<AdminPermissions>(DEFAULT_PERMISSIONS)
  const [deactOpen, setDeactOpen] = useState(false)
  const [deactReason, setDeactReason] = useState('')
  const [resetOpen, setResetOpen] = useState(false)
  const [busy, setBusy] = useState(false)

  const load = async () => {
    if (!id) return
    setNotFound(false)
    const res = await adminFetch(`/staff-users/${id}`)
    const json = (await res.json()) as { ok?: boolean; data?: UserDetail }
    if (res.status === 404) {
      setData(null)
      setNotFound(true)
      return
    }
    if (res.ok && json.ok && json.data) {
      setData(json.data)
      setPermDraft(mergePerm(json.data.permissions))
      setNotFound(false)
    } else {
      setData(null)
      setNotFound(true)
    }
  }

  useEffect(() => {
    void load()
    // eslint-disable-next-line react-hooks/exhaustive-deps -- reload when route id changes only
  }, [id])

  const savePermissions = async () => {
    if (!id) return
    setBusy(true)
    try {
      await adminFetch(`/staff-users/${id}/permissions`, {
        method: 'PATCH',
        body: JSON.stringify({ permissions: permDraft }),
      })
      setPermOpen(false)
      await load()
    } finally {
      setBusy(false)
    }
  }

  const deactivate = async () => {
    if (!id) return
    setBusy(true)
    try {
      await adminFetch(`/staff-users/${id}/deactivate`, {
        method: 'POST',
        body: JSON.stringify({ reason: deactReason }),
      })
      setDeactOpen(false)
      setDeactReason('')
      await load()
    } finally {
      setBusy(false)
    }
  }

  const resetPassword = async () => {
    if (!id) return
    setBusy(true)
    try {
      await adminFetch(`/staff-users/${id}/reset-password`, { method: 'POST' })
      setResetOpen(false)
    } finally {
      setBusy(false)
    }
  }

  if (!data) {
    return (
      <p className="text-sm text-brand-muted">
        {notFound ? 'User not found.' : 'Loading user…'}{' '}
        <Link to="/admin/users" className="text-brand-primary">
          Back to list
        </Link>
      </p>
    )
  }

  return (
    <>
      <PageHeader
        title="User details"
        subtitle={data.fullName}
        actions={
          <div className="flex flex-wrap gap-2">
            <button
              type="button"
              onClick={() => setResetOpen(true)}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-slate-200 bg-white px-3 text-sm font-semibold text-brand-secondary"
            >
              <KeyRound className="h-4 w-4" />
              Reset password
            </button>
            <button
              type="button"
              onClick={() => setDeactOpen(true)}
              disabled={data.status !== 'active'}
              className="inline-flex h-10 items-center gap-2 rounded-xl border border-red-100 bg-red-50 px-3 text-sm font-semibold text-red-700 disabled:opacity-50"
            >
              <Trash2 className="h-4 w-4" />
              Deactivate account
            </button>
            <button
              type="button"
              onClick={() => {
                setPermDraft(mergePerm(data.permissions))
                setPermOpen(true)
              }}
              className="inline-flex h-10 items-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white"
            >
              <Shield className="h-4 w-4" />
              Edit permissions
            </button>
          </div>
        }
      />

      <div className="grid gap-6 lg:grid-cols-[1fr_300px]">
        <div className="space-y-6">
          <Card className="p-6">
            <div className="flex flex-wrap items-start gap-4">
              <div className="flex h-16 w-16 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                <User className="h-8 w-8" />
              </div>
              <div className="min-w-0 flex-1">
                <h2 className="text-xl font-bold text-brand-secondary">{data.fullName}</h2>
                <p className="mt-1 text-sm text-brand-muted">{data.email}</p>
                <div className="mt-3 flex flex-wrap gap-2">
                  <Badge variant="primary">{roleLabel(data.role)}</Badge>
                  {data.status === 'active' ? (
                    <Badge variant="success">Active account</Badge>
                  ) : (
                    <Badge variant="outline">Inactive</Badge>
                  )}
                </div>
                <div className="mt-6 grid gap-4 sm:grid-cols-3">
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-muted">Last login</p>
                    <p className="mt-1 text-sm font-medium text-brand-secondary">{data.lastLogin}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-muted">Account created</p>
                    <p className="mt-1 text-sm font-medium text-brand-secondary">{data.accountCreated}</p>
                  </div>
                  <div>
                    <p className="text-xs font-semibold uppercase text-brand-muted">Security clearance</p>
                    <p className="mt-1 text-sm font-medium text-emerald-700">{data.securityClearance}</p>
                  </div>
                </div>
              </div>
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-brand-secondary">Assigned permissions</h3>
            <p className="mt-1 text-sm text-brand-muted">Toggle access in the edit permissions dialog.</p>
            <div className="mt-4 grid gap-2 sm:grid-cols-2">
              {(
                [
                  ['productApproval', 'Product approval'],
                  ['recallIssuance', 'Recall issuance'],
                  ['userManagement', 'User management'],
                  ['systemSettings', 'System settings'],
                  ['auditLogAccess', 'Audit log access'],
                  ['reportsInvestigation', 'Reports investigation'],
                ] as const
              ).map(([key, label]) => (
                <div
                  key={key}
                  className={cn(
                    'rounded-xl border px-3 py-2 text-sm font-medium',
                    mergePerm(data.permissions)[key]
                      ? 'border-brand-primary bg-blue-50 text-brand-primary'
                      : 'border-slate-200 bg-slate-50 text-brand-muted',
                  )}
                >
                  {label}
                </div>
              ))}
            </div>
          </Card>

          <Card className="p-6">
            <h3 className="text-lg font-bold text-brand-secondary">Recent user activity</h3>
            <ul className="mt-4 space-y-4">
              {(data.activity?.length ? data.activity : []).map((a, i) => (
                <li key={i} className="flex gap-3">
                  <div className="mt-0.5">{activityIcon(a.kind)}</div>
                  <div>
                    <p className="font-semibold text-brand-secondary">{a.title}</p>
                    <p className="text-xs text-brand-muted">
                      {a.timeLabel}
                      {a.target ? ` · ${a.target}` : ''}
                    </p>
                  </div>
                </li>
              ))}
            </ul>
            <button
              type="button"
              className="mt-6 text-sm font-semibold text-brand-primary hover:underline"
            >
              View full audit trail
            </button>
          </Card>
        </div>

        <div className="space-y-6">
          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Account security</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li className="flex justify-between gap-2">
                <span className="text-brand-muted">2FA</span>
                <span className="font-medium text-emerald-700">
                  {data.twoFactorEnabled ? 'Enabled' : 'Off'}
                </span>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-brand-muted">Last IP</span>
                <span className="font-mono text-xs text-brand-secondary">{data.lastIp}</span>
              </li>
              <li className="flex justify-between gap-2">
                <span className="text-brand-muted">Primary device</span>
                <span className="text-right text-brand-secondary">{data.primaryDevice}</span>
              </li>
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Departmental context</h3>
            <ul className="mt-3 space-y-2 text-sm">
              <li>
                <p className="text-xs font-semibold uppercase text-brand-muted">Department</p>
                <p className="font-medium text-brand-secondary">{data.department}</p>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase text-brand-muted">Supervisor</p>
                <p className="font-medium text-brand-secondary">{data.supervisor}</p>
              </li>
              <li>
                <p className="text-xs font-semibold uppercase text-brand-muted">Office location</p>
                <p className="font-medium text-brand-secondary">{data.officeLocation}</p>
              </li>
            </ul>
          </Card>

          <Card className="p-5">
            <h3 className="font-bold text-brand-secondary">Account notifications</h3>
            <div className="mt-3 space-y-2 text-sm">
              <div className="rounded-xl border border-amber-100 bg-amber-50 px-3 py-2">
                <p className="font-semibold text-amber-900">Password expiry</p>
                <p className="text-xs text-amber-800">Expires in 12 days</p>
              </div>
              <div className="rounded-xl border border-red-100 bg-red-50 px-3 py-2">
                <p className="font-semibold text-red-900">Security alert</p>
                <p className="text-xs text-red-800">Review sign-in activity in your identity provider.</p>
              </div>
            </div>
          </Card>
        </div>
      </div>

      <Modal
        open={permOpen}
        onClose={() => setPermOpen(false)}
        title="Edit user permissions"
        size="lg"
        wide
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setPermOpen(false)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-brand-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void savePermissions()}
              className="h-11 rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Save permissions
            </button>
          </div>
        }
      >
        <AdminPermissionChecklist value={permDraft} onChange={setPermDraft} />
      </Modal>

      <Modal
        open={deactOpen}
        onClose={() => setDeactOpen(false)}
        title="Deactivate account"
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setDeactOpen(false)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-brand-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void deactivate()}
              className="h-11 rounded-xl bg-red-600 px-5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Deactivate now
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-2xl border border-red-100 bg-red-50 p-4">
          <AlertTriangle className="h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm text-red-900">
            The user will no longer be able to log in to the system. This action can be reversed by an administrator
            later.
          </p>
        </div>
        <label className="mt-4 block">
          <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">
            Reason for deactivation
          </span>
          <textarea
            value={deactReason}
            onChange={(e) => setDeactReason(e.target.value)}
            rows={3}
            placeholder="e.g., Employee resignation, security breach investigation..."
            className="mt-2 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 py-2 text-sm outline-none ring-brand-primary/20 focus:border-brand-primary focus:ring-4"
          />
        </label>
      </Modal>

      <Modal
        open={resetOpen}
        onClose={() => setResetOpen(false)}
        title="Reset user password"
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setResetOpen(false)}
              className="h-11 rounded-xl border border-slate-200 bg-white px-5 text-sm font-semibold text-brand-secondary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy}
              onClick={() => void resetPassword()}
              className="h-11 rounded-xl bg-amber-500 px-5 text-sm font-semibold text-white disabled:opacity-60"
            >
              Confirm reset
            </button>
          </div>
        }
      >
        <div className="flex gap-3 rounded-2xl border border-amber-100 bg-amber-50 p-4">
          <AlertTriangle className="h-5 w-5 shrink-0 text-amber-600" />
          <p className="text-sm text-amber-950">
            A temporary password will be generated and sent to {data.email}. The user will be required to change it on
            their next login.
          </p>
        </div>
      </Modal>
    </>
  )
}
