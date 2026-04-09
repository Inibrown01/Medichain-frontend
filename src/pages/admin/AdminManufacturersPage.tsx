import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { Building2, Search } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'
import { adminFetch } from '../../lib/adminApi'

type Row = {
  id: string
  companyName: string
  email: string
  productCount: number
  isActive: boolean
  licenseSuspended: boolean
}

export function AdminManufacturersPage() {
  const [rows, setRows] = useState<Row[]>([])
  const [q, setQ] = useState('')
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const qs = new URLSearchParams()
        if (q.trim()) qs.set('q', q.trim())
        const res = await adminFetch(`/manufacturers?${qs.toString()}`)
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
  }, [q])

  return (
    <>
      <PageHeader
        title="Manufacturers"
        subtitle="Registered manufacturers, licenses, and product footprint."
      />

      <Card className="p-4 sm:p-6">
        <div className="relative mb-4">
          <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
          <input
            type="search"
            value={q}
            onChange={(e) => setQ(e.target.value)}
            placeholder="Search company or email..."
            className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-10 pr-4 text-sm outline-none ring-brand-primary/20 focus:border-brand-primary focus:ring-4"
          />
        </div>

        <div className="overflow-x-auto">
          <table className="w-full min-w-[640px] text-left text-sm">
            <thead>
              <tr className="border-b border-slate-200 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                <th className="pb-3 pr-4">Manufacturer</th>
                <th className="pb-3 pr-4">Email</th>
                <th className="pb-3 pr-4">Products</th>
                <th className="pb-3 pr-4">Status</th>
                <th className="pb-3 text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-slate-100">
              {loading ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-brand-muted">
                    Loading…
                  </td>
                </tr>
              ) : error ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-red-700">
                    {error}
                  </td>
                </tr>
              ) : rows.length === 0 ? (
                <tr>
                  <td colSpan={5} className="py-12 text-center text-sm text-brand-muted">
                    No manufacturers yet.
                  </td>
                </tr>
              ) : (
                rows.map((r) => (
                <tr key={r.id} className="text-brand-secondary">
                  <td className="py-3 pr-4">
                    <div className="flex items-center gap-2">
                      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-blue-50 text-brand-primary">
                        <Building2 className="h-4 w-4" />
                      </span>
                      <span className="font-semibold">{r.companyName}</span>
                    </div>
                  </td>
                  <td className="py-3 pr-4 text-brand-muted">{r.email}</td>
                  <td className="py-3 pr-4 font-medium">{r.productCount.toLocaleString()}</td>
                  <td className="py-3 pr-4">
                    {r.licenseSuspended ? (
                      <Badge variant="danger">Suspended</Badge>
                    ) : r.isActive ? (
                      <Badge variant="success">Active</Badge>
                    ) : (
                      <Badge variant="outline">Inactive</Badge>
                    )}
                  </td>
                  <td className="py-3 text-right">
                    <Link
                      to={`/admin/manufacturers/${r.id}`}
                      className="text-sm font-semibold text-brand-primary hover:underline"
                    >
                      View details
                    </Link>
                  </td>
                </tr>
                ))
              )}
            </tbody>
          </table>
        </div>
      </Card>
    </>
  )
}
