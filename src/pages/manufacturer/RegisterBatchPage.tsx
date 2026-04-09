import { ShieldCheck } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

export function RegisterBatchPage() {
  return (
    <>
      <PageHeader
        title="Register New Batch"
        subtitle="Create a new production batch for an approved product."
      />

      <Card className="rounded-3xl p-6 md:p-8">
        <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-brand-muted">
          Company information
        </h2>
        <div className="mt-6 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brand-secondary">Product Name</label>
            <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-brand-secondary outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100">
              <option>Paracetamol 500mg</option>
              <option>Amoxicillin 250mg</option>
            </select>
          </div>
          <Input name="batch" label="Batch Number" placeholder="e.g., BATCH 123-000-2026" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="mfg" type="date" label="Manufacturing Date" />
            <Input name="exp" type="date" label="Expiry Date" />
          </div>
          <Input name="qty" type="number" label="Production Quantity" placeholder="e.g., 10,000" min={0} />
        </div>

        <div className="mt-10">
          <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-brand-muted">
            Document uploads
          </h2>
          <div className="mt-4 rounded-2xl border border-blue-100 bg-blue-50/80 p-4">
            <div className="flex gap-3">
              <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-white text-emerald-600 ring-1 ring-blue-100">
                <ShieldCheck className="h-5 w-5" />
              </span>
              <div>
                <p className="font-bold text-brand-secondary">Automated QR Code Generation Enabled</p>
                <p className="mt-1 text-sm font-medium text-brand-muted">
                  The system will generate unique verification hashes for each unit upon registration.
                </p>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-10 flex flex-wrap justify-end gap-3">
          <Button variant="secondary" size="lg" className="rounded-xl">
            Cancel
          </Button>
          <Button size="lg" className="rounded-xl">
            Register Batch
          </Button>
        </div>
      </Card>
    </>
  )
}
