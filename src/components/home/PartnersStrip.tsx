import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'

const partners = ['NAFDAC', 'WHO', 'Ministry of Health', 'UNICEF', 'Red Cross'] as const

export function PartnersStrip() {
  return (
    <ScrollReveal as="section" className="border-y border-slate-200/80 bg-brand-surface py-14 md:py-20">
      <Container>
        <motion.p
          className="text-center mc-eyebrow text-brand-muted"
          initial={{ opacity: 0, y: 12 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          transition={{ duration: 0.88, ease: easeMotion }}
        >
          Authorized partners & regulatory bodies
        </motion.p>
        <div className="mt-10 flex flex-wrap items-center justify-center gap-x-10 gap-y-6 md:gap-x-16">
          {partners.map((name, i) => (
            <motion.span
              key={name}
              className="text-center font-sans text-2xl font-bold text-slate-400 md:text-3xl"
              initial={{ opacity: 0, y: 16 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.5 }}
              transition={{ duration: 0.78, delay: i * 0.12, ease: easeMotion }}
              whileHover={{ scale: 1.05, color: '#64748b', transition: { duration: 0.45, ease: easeMotion } }}
            >
              {name}
            </motion.span>
          ))}
        </div>
      </Container>
    </ScrollReveal>
  )
}
