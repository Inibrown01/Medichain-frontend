import { Bell } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { RecallCard } from '../components/recalls/RecallCard'
import { Card } from '../components/ui/Card'

const recalls = [
  {
    title: 'Batch EMZ-441 — packaging mislabel',
    risk: 'high' as const,
    description:
      'Incorrect strength printed on secondary cartons. Quarantine affected batches and follow distributor instructions.',
    date: '12 Mar 2026',
    reference: 'MCN-RC-2026-014',
  },
  {
    title: 'Vitamin D3 — precautionary distribution hold',
    risk: 'low' as const,
    description:
      'Voluntary hold while stability data is reviewed. No adverse events reported to date.',
    date: '02 Mar 2026',
    reference: 'MCN-RC-2026-009',
  },
] as const

export function RecallsPage() {
  return (
    <>
      <ScrollReveal as="section" className="bg-brand-navy text-white" direction="none" scale>
        <Container className="grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="text-xs font-semibold uppercase tracking-widest text-red-400">
              Urgent safety bulletin
            </p>
            <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Safety recalls.</h1>
            <p className="mt-4 max-w-xl text-slate-300">
              Official notices for batches under review, quarantine, or withdrawal. Always confirm with
              your clinician before changing treatment.
            </p>
            <div className="mt-8 max-w-xl">
              <Input
                className="h-12 rounded-full border-slate-600 bg-slate-900/80 text-white placeholder:text-slate-500"
                placeholder="Filter by product name, batch, or reason..."
              />
            </div>
          </div>
          <Card className="border-white/10 bg-white/5 p-6 text-white backdrop-blur-md">
            <Bell className="h-8 w-8 text-blue-300" />
            <h2 className="mt-4 text-lg font-semibold">Stay informed</h2>
            <p className="mt-2 text-sm text-slate-300">
              Receive instant alerts when new bulletins affect your inventory or region.
            </p>
            <Button className="mt-6 w-full" variant="primary">
              Subscribe to alerts
            </Button>
          </Card>
        </Container>
      </ScrollReveal>

      <Container className="py-12">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-4 lg:col-span-2">
            {recalls.map((r, i) => (
              <ScrollReveal key={r.reference} delay={i * 0.13} direction="up">
                <RecallCard {...r} />
              </ScrollReveal>
            ))}
          </div>
          <ScrollReveal as="aside" className="space-y-6" direction="up" delay={0.12}>
            <Card className="border-0 bg-slate-900 p-6 text-white">
              <h3 className="font-semibold">Emergency protocol</h3>
              <ol className="mt-4 space-y-4 text-sm">
                {['Cease usage', 'Secure sample', 'Medical consultation'].map((step, i) => (
                  <li key={step} className="flex gap-3">
                    <span className="flex h-7 w-7 shrink-0 items-center justify-center rounded-full bg-white/10 text-xs font-bold">
                      {i + 1}
                    </span>
                    <div>
                      <p className="font-semibold">{step}</p>
                      <p className="text-slate-400">Follow national guidance and report exposures.</p>
                    </div>
                  </li>
                ))}
              </ol>
              <Button className="mt-6 w-full" variant="danger">
                Report adverse effect
              </Button>
            </Card>
            <Card padding="md">
              <p className="text-xs font-bold uppercase tracking-wide text-brand-muted">
                Safety intelligence
              </p>
              <ul className="mt-3 divide-y divide-slate-100 text-sm">
                {['Identifying counterfeit signatures', 'Cold chain breaks', 'Batch genealogy'].map(
                  (x) => (
                    <li key={x} className="py-2 font-medium text-brand-primary">
                      {x}
                    </li>
                  ),
                )}
              </ul>
            </Card>
            <Card className="bg-emerald-50 p-6">
              <h3 className="font-semibold text-emerald-900">Q1 safety report</h3>
              <p className="mt-2 text-sm text-emerald-800">
                Aggregated signals and enforcement actions for the quarter.
              </p>
              <Button className="mt-4 w-full" variant="success">
                Download intelligence (PDF)
              </Button>
            </Card>
          </ScrollReveal>
        </div>
      </Container>
    </>
  )
}
