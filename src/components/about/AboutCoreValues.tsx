import { Globe, ShieldCheck, Zap, Users } from 'lucide-react'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'
import type { LucideIcon } from 'lucide-react'

const values: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: 'Absolute transparency',
    body: 'Open records for regulators and partners without compromising privacy.',
    icon: Globe,
  },
  {
    title: 'Uncompromising safety',
    body: 'Verification gates before any product reaches the public registry.',
    icon: ShieldCheck,
  },
  {
    title: 'Technological excellence',
    body: 'Modern APIs and audit trails built for national scale.',
    icon: Zap,
  },
  {
    title: 'National unity',
    body: 'One standard for states, hospitals, pharmacies, and citizens.',
    icon: Users,
  },
]

export function AboutCoreValues() {
  return (
    <ScrollReveal as="section" className="bg-brand-secondary py-20 text-white md:py-28" direction="up">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:gap-20">
          <div className="max-w-lg">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-sky-300">Core values</span>
            <h2 className="mt-4 font-sans text-3xl font-bold leading-tight md:text-4xl">
              The Pillars of <span className="font-serif italic text-sky-300">Our Platform.</span>
            </h2>
            <p className="mt-6 leading-relaxed text-slate-400">
              MediChain NG is engineered for trust — from cryptographic attestations to human-readable
              dashboards for every stakeholder.
            </p>
          </div>
          <div className="grid gap-6 sm:grid-cols-2">
            {values.map((v) => (
              <div
                key={v.title}
                className="rounded-2xl border border-white/10 bg-white/5 p-6 transition-colors hover:bg-white/10"
              >
                <v.icon className="h-8 w-8 text-sky-300" strokeWidth={1.5} />
                <h3 className="mt-4 font-semibold">{v.title}</h3>
                <p className="mt-2 text-sm leading-relaxed text-slate-400">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
