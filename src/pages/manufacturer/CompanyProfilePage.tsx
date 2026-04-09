import { Building2, Download, Pencil } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

const docs = [
  { name: 'Business License', expiry: 'Exp: 2026-12-31' },
  { name: 'NAFDAC Approval', expiry: 'Exp: 2026-12-31' },
  { name: 'Manufacturing Permit', expiry: 'Exp: 2026-12-31' },
  { name: 'ISO 9001 Certificate', expiry: 'Exp: 2026-12-31' },
]

export function CompanyProfilePage() {
  return (
    <>
      <PageHeader
        title="Company Profile"
        subtitle="Manage your company information and regulatory documents."
        actions={
          <Button variant="secondary" size="lg" className="rounded-xl" leftIcon={<Pencil className="h-4 w-4" />}>
            Edit Profile
          </Button>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,1.8fr)_minmax(0,1fr)]">
        <Card className="rounded-3xl p-6 md:p-8">
          <div className="grid gap-6 sm:grid-cols-2">
            {[
              ['Company Name', 'PharmaCorp Nigeria Ltd'],
              ['Registration Number', 'RN-123456789'],
              ['Official Email', 'contact@pharmacorp.ng'],
              ['Phone Number', '+234 800 123 45678'],
              ['Website', 'www.pharmacorp.ng'],
              ['Headquarters', 'Lagos, Nigeria'],
            ].map(([k, v]) => (
              <div key={k} className="flex gap-3">
                <span className="mt-0.5 inline-flex h-9 w-9 items-center justify-center rounded-lg bg-slate-100 text-slate-500">
                  <Building2 className="h-4 w-4" />
                </span>
                <div>
                  <p className="text-xs font-bold uppercase tracking-wide text-brand-muted">{k}</p>
                  <p className="mt-1 text-sm font-semibold text-brand-secondary">{v}</p>
                </div>
              </div>
            ))}
          </div>
          <div className="mt-8 border-t border-slate-100 pt-6">
            <p className="text-xs font-bold uppercase tracking-wide text-brand-muted">Company address</p>
            <p className="mt-2 text-sm font-semibold text-brand-secondary">
              54 Pharmaceutical Way, Industrial Estate, Ikeja, Lagos, Nigeria.
            </p>
          </div>

          <div className="mt-10">
            <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-brand-muted">
              Regulatory documents
            </h2>
            <div className="mt-6 grid gap-4 sm:grid-cols-2">
              {docs.map((d) => (
                <div
                  key={d.name}
                  className="flex items-center justify-between gap-3 rounded-2xl border border-slate-100 bg-slate-50/80 p-4"
                >
                  <div className="flex items-center gap-3">
                    <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white text-brand-primary ring-1 ring-slate-200">
                      <Building2 className="h-5 w-5" />
                    </span>
                    <div>
                      <p className="text-sm font-bold text-brand-secondary">{d.name}</p>
                      <p className="text-xs font-semibold text-brand-muted">{d.expiry}</p>
                    </div>
                  </div>
                  <button type="button" className="text-slate-300 hover:text-brand-primary">
                    <Download className="h-5 w-5" />
                  </button>
                </div>
              ))}
            </div>
          </div>
        </Card>

        <div className="space-y-4">
          <Card className="rounded-3xl p-6">
            <span className="inline-flex h-12 w-12 items-center justify-center rounded-full bg-slate-100 text-slate-500">
              <Building2 className="h-6 w-6" />
            </span>
            <p className="mt-4 text-xs font-bold uppercase tracking-wide text-brand-muted">Company</p>
            <p className="mt-1 text-xl font-bold text-brand-secondary">PharmaCorp NG</p>
            <p className="mt-1 text-sm font-medium text-brand-muted">Member since March 2024</p>
            <div className="mt-4">
              <Badge variant="success" className="text-[10px]">
                FULLY VERIFIED
              </Badge>
            </div>
            <div className="mt-6 grid grid-cols-2 gap-3">
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Products</p>
                <p className="mt-1 text-lg font-bold text-brand-secondary">24</p>
              </div>
              <div className="rounded-xl bg-slate-50 p-3 text-center">
                <p className="text-[10px] font-bold uppercase tracking-wide text-brand-muted">Batches</p>
                <p className="mt-1 text-lg font-bold text-brand-secondary">124</p>
              </div>
            </div>
          </Card>

          <Card className="rounded-3xl border-0 bg-brand-secondary p-6 text-white shadow-md">
            <span className="inline-flex h-10 w-10 items-center justify-center rounded-xl bg-white/10">
              <Building2 className="h-5 w-5" />
            </span>
            <p className="mt-4 text-lg font-bold">Integrity Score: 98%</p>
            <p className="mt-2 text-sm font-medium text-slate-300">
              Based on verification success rates and regulatory compliance signals.
            </p>
            <Button className="mt-6 w-full rounded-xl bg-white text-brand-secondary hover:bg-slate-100">
              View Detailed Report
            </Button>
          </Card>
        </div>
      </div>
    </>
  )
}
