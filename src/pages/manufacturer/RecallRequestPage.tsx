import { AlertTriangle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { TextArea } from '../../components/ui/TextArea'

export function RecallRequestPage() {
  return (
    <>
      <PageHeader
        title="Request Product Recall"
        subtitle="Submit a request to regulatory bodies for a product recall."
      />

      <Card className="rounded-3xl p-6 md:p-8">
        <div className="flex gap-3 rounded-2xl border border-red-100 bg-red-50/90 p-4">
          <AlertTriangle className="mt-0.5 h-5 w-5 shrink-0 text-red-600" />
          <p className="text-sm font-semibold text-red-900">
            Recalls must be approved by NAFDAC. This request will be reviewed immediately.
          </p>
        </div>

        <div className="mt-8 space-y-4">
          <div>
            <label className="mb-1.5 block text-sm font-semibold text-brand-secondary">Product Name</label>
            <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-brand-secondary outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100">
              <option>Paracetamol 500mg</option>
              <option>Amoxicillin 250mg</option>
            </select>
          </div>
          <Input name="batch" label="Batch Number" placeholder="e.g., BATCH 123-000-2026" />
          <div className="grid gap-4 sm:grid-cols-2">
            <Input name="recallDate" type="date" label="Recall Date" />
            <div>
              <label className="mb-1.5 block text-sm font-semibold text-brand-secondary">Severity Level</label>
              <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-brand-secondary outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100">
                <option>High (Immediate Danger)</option>
                <option>Medium</option>
                <option>Low</option>
              </select>
            </div>
          </div>
          <TextArea
            name="reason"
            label="Reason for Recall"
            placeholder="Detailed explanation of the safety concern..."
          />
        </div>

        <div className="mt-10 flex flex-wrap justify-between gap-3">
          <Link to="/manufacturer/recalls">
            <Button variant="secondary" size="lg" className="rounded-xl">
              View History
            </Button>
          </Link>
          <Button variant="danger" size="lg" className="rounded-xl">
            Submit Recall Request
          </Button>
        </div>
      </Card>
    </>
  )
}
