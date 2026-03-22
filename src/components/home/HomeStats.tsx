import { Activity, AlertTriangle, Building2, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'
import { AnimatedCounter } from '../motion/AnimatedCounter'
import type { LucideIcon } from 'lucide-react'
import { easeMotion } from '../../lib/motion'

const stats: {
  icon: LucideIcon
  value: number
  suffix: string
  label: string
  desc: string
  iconWrap: string
}[] = [
  {
    icon: ShieldCheck,
    value: 12482,
    suffix: '+',
    label: 'Verified products',
    desc: 'Authentic medicines in our database',
    iconWrap: 'bg-emerald-50 text-emerald-600',
  },
  {
    icon: Building2,
    value: 450,
    suffix: '+',
    label: 'Manufacturers',
    desc: 'Registered and vetted producers',
    iconWrap: 'bg-slate-100 text-slate-600',
  },
  {
    icon: Activity,
    value: 8200,
    suffix: '+',
    label: 'Daily checks',
    desc: 'Verifications performed today',
    iconWrap: 'bg-blue-50 text-blue-600',
  },
  {
    icon: AlertTriangle,
    value: 14,
    suffix: '',
    label: 'Active calls',
    desc: 'Products flagged for safety',
    iconWrap: 'bg-orange-50 text-orange-600',
  },
]

export function HomeStats() {
  return (
    <ScrollReveal as="section" className="bg-brand-surface py-12 md:py-16">
      <Container>
        <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {stats.map((s, i) => (
            <motion.div
              key={s.label}
              className="relative overflow-hidden rounded-3xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-brand-md)]"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12, margin: '0px 0px 18% 0px' }}
              transition={{ duration: 0.88, delay: i * 0.14, ease: easeMotion }}
              whileHover={{ y: -4, transition: { duration: 0.38, ease: easeMotion } }}
            >
              <div className="mc-stat-card-deco" aria-hidden />
              <span
                className={`relative inline-flex h-12 w-12 items-center justify-center rounded-xl ${s.iconWrap}`}
              >
                <s.icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="relative mt-5 mc-stat-value">
                <AnimatedCounter value={s.value} suffix={s.suffix} />
              </p>
              <p className="relative mt-2 mc-stat-label">{s.label}</p>
              <p className="relative mt-2 mc-stat-desc">{s.desc}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </ScrollReveal>
  )
}
