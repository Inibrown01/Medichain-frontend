import { Container } from '../layout/Container'
import { Shield, Zap } from 'lucide-react'
import { ScrollReveal } from '../motion/ScrollReveal'

const stats = [
  ['1.2M+', 'Verified products'],
  ['500K+', 'Active users'],
  ['45', 'Partner labs'],
  ['99.9%', 'Success rate'],
] as const

export function AboutMission() {
  return (
    <ScrollReveal as="section" className="bg-white py-20 md:py-28" direction="up">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div>
            <span className="mc-eyebrow--blue">Our mission</span>
            <h2 className="mt-4 font-sans text-3xl font-bold leading-tight text-brand-secondary md:text-4xl">
              A Vision for <span className="font-serif italic text-brand-primary">Absolute Certainty.</span>
            </h2>
            <blockquote className="mt-6 border-l-4 border-brand-primary/30 pl-6 font-serif text-lg italic leading-relaxed text-brand-muted">
              Every dose should be traceable, every label truthful, and every patient protected by data they
              can trust.
            </blockquote>
            <div className="mt-10 grid grid-cols-2 gap-6">
              {stats.map(([v, l]) => (
                <div key={l}>
                  <p className="text-2xl font-bold text-brand-secondary">{v}</p>
                  <p className="mt-1 text-xs font-semibold uppercase tracking-wider text-brand-muted">{l}</p>
                </div>
              ))}
            </div>
          </div>
          <div className="grid grid-cols-2 gap-3 md:gap-4">
            <div className="row-span-1 overflow-hidden rounded-3xl bg-slate-200">
              <div className="flex aspect-[4/5] w-full items-center justify-center bg-slate-100 text-xs text-brand-muted">
                Image
              </div>
            </div>
            <div className="flex flex-col justify-between gap-3">
              <div className="rounded-3xl bg-brand-secondary p-5 text-white">
                <Shield className="h-8 w-8 text-sky-300" />
                <p className="mt-3 font-semibold">Verified supply chain</p>
                <p className="mt-1 text-sm text-slate-400">End-to-end traceability.</p>
              </div>
              <div className="rounded-3xl bg-sky-100 p-5 text-brand-secondary">
                <Zap className="h-8 w-8 text-brand-primary" />
                <p className="mt-3 font-semibold">Real-time monitoring</p>
                <p className="mt-1 text-sm text-brand-muted">Alerts when risk changes.</p>
              </div>
            </div>
            <div className="col-span-2 overflow-hidden rounded-3xl bg-slate-200">
              <div className="flex aspect-[21/9] w-full items-center justify-center bg-slate-100 text-xs text-brand-muted md:aspect-auto md:min-h-[160px]">
                Image
              </div>
            </div>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
