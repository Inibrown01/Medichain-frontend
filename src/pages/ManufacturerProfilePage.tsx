import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Share2, ShieldCheck } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { AnimatedCounter } from '../components/motion/AnimatedCounter'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'

export function ManufacturerProfilePage() {
  const { slug } = useParams()
  const name =
    slug === 'emzor-pharmaceuticals'
      ? 'Emzor Pharmaceuticals'
      : slug?.replace(/-/g, ' ').replace(/\b\w/g, (c) => c.toUpperCase()) ?? 'Manufacturer'

  return (
    <>
      <ScrollReveal as="section" className="bg-brand-navy pb-24 pt-10 text-white" direction="none" scale>
        <Container>
          <Link
            to="/manufacturers"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to manufacturers
          </Link>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white text-2xl font-bold text-brand-primary">
                EMZ
              </div>
              <span className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                <ShieldCheck className="h-5 w-5" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <Badge variant="success" className="mb-3">
                Platinum certified
              </Badge>
              <h1 className="font-serif text-4xl font-semibold">{name}</h1>
              <p className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
                <span>Lagos, Nigeria</span>
                <span>Est. 1984</span>
                <span>1,500+ staff</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="primary" leftIcon={<Download className="h-4 w-4" />}>
                  Quality certificate
                </Button>
                <Button variant="outline" className="border-white/30 bg-transparent text-white hover:bg-white/10" leftIcon={<Share2 className="h-4 w-4" />}>
                  Share profile
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </ScrollReveal>

      <Container className="-mt-12 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          {[
            { k: 124, l: 'Registered products' },
            { k: 12, l: 'Active recalls monitored' },
            { k: 15, l: 'Countries served' },
          ].map((s, i) => (
            <ScrollReveal key={s.l} delay={i * 0.12} direction="up" scale>
              <Card padding="md" className="h-full">
                <p className="text-3xl font-bold text-brand-secondary">
                  <AnimatedCounter
                    value={s.k}
                    formatThousands={false}
                    className="text-3xl font-bold text-brand-secondary"
                  />
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">{s.l}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <ScrollReveal direction="up" className="space-y-8 lg:col-span-2">
            <Card padding="lg">
              <h2 className="font-serif text-2xl font-semibold">Institutional heritage</h2>
              <p className="mt-4 italic text-brand-muted">
                A legacy of quality manufacturing spanning decades, with continuous investment in GMP
                infrastructure and pharmacovigilance partnerships.
              </p>
            </Card>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.14}>
          <Card className="border-0 bg-brand-navy p-6 text-white">
            <h3 className="font-semibold">Trust verification</h3>
            <ul className="mt-4 space-y-3 text-sm text-slate-300">
              {['Legal entity status', 'Facility GMP audit', 'Batch traceability'].map((x) => (
                <li key={x} className="flex justify-between gap-2">
                  <span>{x}</span>
                  <span className="text-emerald-400">✓</span>
                </li>
              ))}
            </ul>
            <Button className="mt-6 w-full" variant="primary">
              Download audit report
            </Button>
          </Card>
          </ScrollReveal>
        </div>
      </Container>
    </>
  )
}
