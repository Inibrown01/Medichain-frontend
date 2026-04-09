import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'

export function SettingsPage() {
  return (
    <>
      <PageHeader title="Settings" subtitle="Manage your account preferences." />
      <Card className="max-w-xl rounded-3xl p-6">
        <Input name="email" type="email" label="Notification email" defaultValue="contact@pharmacorp.ng" />
        <div className="mt-4">
          <label className="mb-1.5 block text-sm font-semibold text-brand-secondary">Default QR format</label>
          <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-brand-secondary outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100">
            <option>PNG (High Quality)</option>
            <option>SVG</option>
          </select>
        </div>
        <Button className="mt-6 rounded-xl" size="lg">
          Save changes
        </Button>
      </Card>
    </>
  )
}
