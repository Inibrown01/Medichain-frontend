import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Download, Plus, Search, User } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { Modal } from '../../components/ui/Modal'
import { adminFetch } from '../../lib/adminApi'

type Row = {
  id: string
  fullName: string
  email: string
  role: string
  department: string
  lastLogin: string
  status: string
}

function roleLabel(role: string) {
  return role.replace(/_/g, ' ')
}

export function AdminUsersPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [q, setQ] = useState('')
  const [status, setStatus] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)
  const [addOpen, setAddOpen] = useState(false)
  const [fullName, setFullName] = useState('')
  const [email, setEmail] = useState('')
  const [role, setRole] = useState('INSPECTOR')
  const [department, setDepartment] = useState('Regulatory Affairs')
  const [busy, setBusy] = useState(false)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const qs = new URLSearchParams()
        if (q.trim()) qs.set('q', q.trim())
        if (status) qs.set('status', status)
        const res = await adminFetch(`/staff-users?${qs.toString()}`)
        const json = (await res.json()) as { ok?: boolean; data?: Row[]; message?: string }
        if (!res.ok || !json.ok || !Array.isArray(json.data)) throw new Error(json.message || 'Failed to load')
        if (!cancelled) setRows(json.data)
      } catch (e) {
        if (!cancelled) {
          setRows([])
          setError(e instanceof Error ? e.message : 'Failed to load')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [q, status])

  const createUser = async () => {
    setBusy(true)
    try {
      const res = await adminFetch('/staff-users', {
        method: 'POST',
        body: JSON.stringify({ fullName, email, role, department }),
      })
      const json = (await res.json()) as { ok?: boolean; data?: { id?: string }; error?: string }
      if (!res.ok || !json.ok) throw new Error(json.error || 'bad')
      setAddOpen(false)
      setFullName('')
      setEmail('')
      setRole('INSPECTOR')
      setDepartment('Regulatory Affairs')
      setRows((prev) => [
        ...prev,
        {
          id: json.data?.id || 'new',
          fullName,
          email,
          role,
          department,
          lastLogin: '—',
          status: 'active',
        },
      ])
    } finally {
      setBusy(false)
    }
  }

  return (
    <>
      <PageHeader
        title="Users management"
        subtitle="Manage administrative access, roles, and permissions for the MediChain NG platform."
        actions={
          <>
            <button
              type="button"
              className="inline-flex h-11 items-center gap-2 rounded-xl border border-brand-primary bg-white px-4 text-sm font-semibold text-brand-primary"
            >
              <Download className="h-4 w-4" />
              Export user list
            </button>
            <button
              type="button"
              onClick={() => setAddOpen(true)}
              className="inline-flex h-11 items-center gap-2 rounded-xl bg-brand-primary px-4 text-sm font-semibold text-white shadow-[0_8px_16px_rgba(29,78,216,0.2)]"
            >
              <Plus className="h-4 w-4" />
              Add new user
            </button>
          </>
        }
      />

      <Card className="p-4 sm:p-6">
        <div className="mb-4 flex flex-col gap-3 sm:flex-row sm:items-center">
          <div className="relative flex-1">
            <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
            <input
              type="search"
              value={q}
              onChange={(e) => setQ(e.target.value)}
              placeholder="Search name, email, department..."
              className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none ring-brand-primary/20 focus:border-brand-primary focus:ring-4"
            />
          </div>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value)}
            className="h-11 rounded-xl border border-slate-200 bg-white px-3 text-sm font-medium text-brand-secondary"
          >
            <option value="">All status</option>
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
          </select>
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[720px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                <th className="pb-3 pr-4">User</th>
                <th className="pb-3 pr-4">Role</th>
                <th className="pb-3 pr-4">Department</th>
                <th className="pb-3 pr-4">Last login</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-brand-muted">
                    Loading…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-red-700">
                    {error}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={6} className="py-12 text-center text-sm text-brand-muted">
                    No staff users.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                <tr key={r.id}>
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-full bg-slate-100 text-slate-500">
                        <User className="h-4 w-4" />
                      </span>
                      <div>
                        <p className="font-semibold text-brand-secondary">{r.fullName}</p>
                        <p className="text-xs text-brand-muted">{r.email}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 pr-4">
                    <Badge variant="outline">{roleLabel(r.role)}</Badge>
                  </td>
                  <td className="py-3 pr-4 text-brand-muted">{r.department}</td>
                  <td className="py-3 pr-4 text-brand-muted">{r.lastLogin}</td>
                  <td className="py-3 pr-4">
                    {r.status === 'active' ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="primary">Inactive</Badge>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to={`/admin/users/${r.id}`}
                      className="text-sm font-semibold text-brand-primary hover:underline"
                    >
                      View
                    </Link>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>

      <Modal
        open={addOpen}
        onClose={() => setAddOpen(false)}
        title="Add new system user"
        size="lg"
        footer={
          <div className="flex flex-wrap justify-end gap-3">
            <button
              type="button"
              onClick={() => setAddOpen(false)}
              className="h-11 rounded-xl border border-brand-primary bg-white px-5 text-sm font-semibold text-brand-primary"
            >
              Cancel
            </button>
            <button
              type="button"
              disabled={busy || !fullName.trim() || !email.trim()}
              onClick={() => void createUser()}
              className="h-11 rounded-xl bg-brand-primary px-5 text-sm font-semibold text-white disabled:opacity-50"
            >
              Create account
            </button>
          </div>
        }
      >
        <div className="space-y-4">
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Full name</span>
            <input
              value={fullName}
              onChange={(e) => setFullName(e.target.value)}
              placeholder="e.g., Dr. Madeleine Nkiru"
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none ring-brand-primary/20 focus:border-brand-primary focus:ring-4"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Email address</span>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder="name@nafdac.gov.ng"
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm outline-none ring-brand-primary/20 focus:border-brand-primary focus:ring-4"
            />
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Role</span>
            <select
              value={role}
              onChange={(e) => setRole(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
            >
              <option value="SUPER_ADMIN">Super admin</option>
              <option value="INSPECTOR">Inspector</option>
              <option value="COMPLIANCE">Compliance</option>
              <option value="ANALYST">Analyst</option>
              <option value="FIELD_AGENT">Field agent</option>
            </select>
          </label>
          <label className="block">
            <span className="text-xs font-semibold uppercase tracking-wide text-brand-muted">Department</span>
            <select
              value={department}
              onChange={(e) => setDepartment(e.target.value)}
              className="mt-2 h-11 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm"
            >
              <option value="Regulatory Affairs">Regulatory affairs</option>
              <option value="Enforcement">Enforcement</option>
              <option value="Legal">Legal</option>
              <option value="ICT">ICT</option>
            </select>
          </label>
        </div>
      </Modal>
    </>
  )
}
