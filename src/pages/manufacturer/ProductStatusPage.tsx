import { CheckCircle2, Clock3, XCircle } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Badge } from '../../components/ui/Badge'

const items = [
  {
    title: 'Paracetamol 500mg',
    id: 'MCN-PRD-1024',
    date: 'Submitted 12 Mar 2026',
    status: 'Approved' as const,
  },
  {
    title: 'Amoxicillin 250mg',
    id: 'MCN-PRD-1025',
    date: 'Submitted 10 Mar 2026',
    status: 'Pending' as const,
  },
  {
    title: 'Vitamin D3 1000IU',
    id: 'MCN-PRD-1026',
    date: 'Submitted 02 Mar 2026',
    status: 'Rejected' as const,
    reason: 'Incomplete regulatory documentation.',
  },
]

function StatusIcon({ status }: { status: (typeof items)[number]['status'] }) {
  if (status === 'Approved')
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
        <CheckCircle2 className="h-6 w-6" />
      </span>
    )
  if (status === 'Pending')
    return (
      <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-amber-50 text-amber-600">
        <Clock3 className="h-6 w-6" />
      </span>
    )
  return (
    <span className="inline-flex h-11 w-11 items-center justify-center rounded-full bg-red-50 text-red-600">
      <XCircle className="h-6 w-6" />
    </span>
  )
}

function StatusPill({ status }: { status: (typeof items)[number]['status'] }) {
  if (status === 'Approved') return <Badge variant="success">Approved</Badge>
  if (status === 'Pending') return <Badge variant="warning">Pending</Badge>
  return <Badge variant="danger">Rejected</Badge>
}

export function ProductStatusPage() {
  return (
    <>
      <PageHeader
        title="Product Status"
        subtitle="Track the approval status of your submitted products."
      />

      <div className="space-y-4">
        {items.map((p) => (
          <Card key={p.id} className="rounded-3xl p-5">
            <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
              <div className="flex gap-4">
                <StatusIcon status={p.status} />
                <div>
                  <p className="text-lg font-bold text-brand-secondary">{p.title}</p>
                  <p className="mt-1 text-sm font-medium text-brand-muted">
                    {p.id} · {p.date}
                  </p>
                  {p.status === 'Rejected' && p.reason ? (
                    <p className="mt-2 text-sm font-semibold text-red-600">{p.reason}</p>
                  ) : null}
                </div>
              </div>
              <div className="flex flex-col items-start gap-3 md:items-end">
                <StatusPill status={p.status} />
                <div className="flex flex-wrap gap-2">
                  {p.status === 'Approved' ? (
                    <Link to="/manufacturer/batches/new">
                      <Button size="md" className="rounded-xl">
                        Register Batch
                      </Button>
                    </Link>
                  ) : null}
                  {p.status === 'Rejected' ? (
                    <Button variant="secondary" size="md" className="rounded-xl">
                      Resubmit
                    </Button>
                  ) : null}
                  <button type="button" className="text-sm font-semibold text-brand-primary">
                    View
                  </button>
                </div>
              </div>
            </div>
          </Card>
        ))}
      </div>
    </>
  )
}
