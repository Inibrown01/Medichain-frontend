import { Building2, CheckCircle2, Shield } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { Card } from '../ui/Card'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'

const points = [
  {
    title: 'Prevent severe harm',
    body: 'Avoid toxic ingredients and incorrect chemical compositions.',
    icon: Shield,
    color: 'text-red-600',
    bg: 'bg-red-50',
  },
  {
    title: 'Guaranteed efficacy',
    body: 'Ensure dosage and formulation match approved filings.',
    icon: CheckCircle2,
    color: 'text-emerald-600',
    bg: 'bg-emerald-50',
  },
  {
    title: 'Support quality care',
    body: 'Give clinicians confidence in every prescription they write.',
    icon: Building2,
    color: 'text-blue-600',
    bg: 'bg-blue-50',
  },
] as const

export function CriticalSafety() {
  return (
    <ScrollReveal as="section" className="bg-white py-16 md:py-24" direction="up">
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          <div className="space-y-6">
            <span className="mc-eyebrow--red">Critical safety</span>
            <h2 className="max-w-xl">
              <span className="mc-heading-section-sans">The Risk of </span>
              <span className="mc-heading-section-serif mc-heading-section-serif--red">Counterfeits </span>
              <span className="mc-heading-section-sans">is Real.</span>
            </h2>
            <p className="mc-body-lead max-w-xl">
              Counterfeit medicines are a global threat, often containing harmful substances or incorrect
              dosages. MediChain NG ensures every product you use meets national safety standard.
            </p>
            <ul className="space-y-5 pt-2">
              {points.map((p, i) => (
                <motion.li
                  key={p.title}
                  className="flex gap-4"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true, amount: 0.4 }}
                  transition={{ duration: 0.72, delay: i * 0.16, ease: easeMotion }}
                >
                  <span
                    className={`flex h-11 w-11 shrink-0 items-center justify-center rounded-xl ${p.bg} ${p.color}`}
                  >
                    <p.icon className="h-5 w-5" aria-hidden />
                  </span>
                  <div>
                    <p className="font-sans text-lg font-semibold leading-6 text-brand-secondary">{p.title}</p>
                    <p className="mt-1 font-sans text-sm leading-5 text-brand-muted">{p.body}</p>
                  </div>
                </motion.li>
              ))}
            </ul>
          </div>

          <motion.div
            className="relative"
            initial={{ opacity: 0, scale: 0.94, x: 24 }}
            whileInView={{ opacity: 1, scale: 1, x: 0 }}
            viewport={{ once: true, amount: 0.25 }}
            transition={{ duration: 1.05, ease: easeMotion }}
          >
            <div
              className="absolute -inset-4 rounded-[2rem] bg-sky-100/90 blur-[2px]"
              aria-hidden
            />
            <div className="relative overflow-hidden rounded-[2rem] bg-slate-200 shadow-lg ring-1 ring-slate-200/80">
              <div className="aspect-[5/4] w-full bg-gradient-to-br from-slate-100 to-slate-300" />
              <Card className="absolute bottom-5 left-5 max-w-[260px] border-0 p-4 shadow-xl" padding="none">
                <motion.div
                  className="flex items-start gap-3"
                  initial={{ opacity: 0, y: 12 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.42, duration: 0.68, ease: easeMotion }}
                >
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-50 text-emerald-600">
                    <Shield className="h-5 w-5" />
                  </span>
                  <div>
                    <p className="font-semibold text-brand-secondary">Verified Safe</p>
                    <p className="mt-1 text-xs text-brand-muted">
                      Over 45,000 products verified this month alone.
                    </p>
                  </div>
                </motion.div>
              </Card>
            </div>
          </motion.div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
