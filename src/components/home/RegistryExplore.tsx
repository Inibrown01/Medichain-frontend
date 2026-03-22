import { Link } from 'react-router-dom'
import { ChevronRight, HeartPulse, Microscope, Pill, Sparkles, Stethoscope } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import type { LucideIcon } from 'lucide-react'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'

const categories: { name: string; count: string; icon: LucideIcon }[] = [
  { name: 'Antibiotics', count: '1240 products', icon: Pill },
  { name: 'Pain Relief', count: '850 products', icon: HeartPulse },
  { name: 'Vitamins', count: '2100 products', icon: Sparkles },
  { name: 'Diagnostics', count: '420 products', icon: Microscope },
  { name: 'Surgical', count: '150 products', icon: Stethoscope },
]

export function RegistryExplore() {
  return (
    <ScrollReveal as="section" className="bg-white py-16 md:py-24">
      <Container>
        <div className="flex flex-col gap-6 lg:flex-row lg:items-end lg:justify-between">
          <div className="max-w-2xl space-y-4">
            <span className="mc-eyebrow--blue">Registry</span>
            <h2 className="flex flex-col gap-1 sm:flex-row sm:flex-wrap sm:items-baseline sm:gap-x-2">
              <span className="mc-heading-section-sans">Explore the </span>
              <span className="mc-heading-section-serif mc-heading-section-serif--blue">Database.</span>
            </h2>
            <p className="mc-body-lead">
              Browse through thousands of verified health products across multiple categories.
            </p>
          </div>
          <motion.div
            whileHover={{ scale: 1.03 }}
            whileTap={{ scale: 0.98 }}
            transition={{ type: 'spring', stiffness: 320, damping: 26 }}
          >
            <Link
              to="/registry"
              className="inline-flex items-center justify-center gap-2 self-start rounded-2xl border-2 border-brand-secondary px-5 py-3 text-lg font-semibold text-brand-secondary transition-colors hover:bg-slate-50 lg:self-auto"
            >
              View all categories
              <ChevronRight className="h-5 w-5" aria-hidden />
            </Link>
          </motion.div>
        </div>

        <div className="mt-12 grid gap-4 sm:grid-cols-2 xl:grid-cols-5">
          {categories.map((c, i) => (
            <motion.div
              key={c.name}
              className="rounded-3xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-brand-md)]"
              initial={{ opacity: 0, y: 28 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12, margin: '0px 0px 15% 0px' }}
              transition={{ duration: 0.82, delay: i * 0.11, ease: easeMotion }}
              whileHover={{
                y: -8,
                boxShadow: '0 20px 40px rgba(15, 23, 42, 0.12)',
                transition: { duration: 0.45, ease: easeMotion },
              }}
            >
              <span className="mx-auto flex h-12 w-12 items-center justify-center rounded-xl bg-blue-50 text-brand-primary">
                <c.icon className="h-6 w-6" aria-hidden />
              </span>
              <p className="mc-card-title-registry mt-4">{c.name}</p>
              <p className="mc-card-meta-registry mt-2">{c.count}</p>
            </motion.div>
          ))}
        </div>
      </Container>
    </ScrollReveal>
  )
}
