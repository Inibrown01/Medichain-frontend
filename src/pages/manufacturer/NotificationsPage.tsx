import { PageHeader } from '../../components/dashboard'
import { Card } from '../../components/ui/Card'

const items = [
  { title: 'Recall request approved', body: 'Paracetamol 500mg — BTH-2022-001', time: '2h ago' },
  { title: 'New verification spike', body: 'Lagos region +18% vs last week', time: 'Yesterday' },
  { title: 'Document expiring soon', body: 'NAFDAC Approval — expires 2026-12-31', time: '3 days ago' },
]

export function NotificationsPage() {
  return (
    <>
      <PageHeader title="Notifications" subtitle="Alerts and updates for your account." />
      <div className="space-y-3">
        {items.map((n) => (
          <Card key={n.title} className="rounded-2xl p-4">
            <div className="flex items-start justify-between gap-4">
              <div>
                <p className="font-bold text-brand-secondary">{n.title}</p>
                <p className="mt-1 text-sm font-medium text-brand-muted">{n.body}</p>
              </div>
              <span className="shrink-0 text-xs font-semibold text-brand-muted">{n.time}</span>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
