import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { ShieldCheck } from 'lucide-react'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'
import testimonial1 from '../../assets/medichain/testimonial-1.png'
import testimonial2 from '../../assets/medichain/testimonial-2.png'
import testimonial3 from '../../assets/medichain/testimonial-3.png'

const items = [
  {
    quote:
      'MediChain NG has revolutionized how we verify our supplies. It gives us and our patients absolute peace of mind.',
    name: 'Dr. Madeleine Nkiru',
    role: 'Chief pharmacist, LGH',
    avatar: testimonial1,
    avatarAlt: 'Dr. Madeleine Nkiru',
  },
  {
    quote:
      'The QR scanning feature is incredibly fast. I use it for every new batch. A vital tool for all health workers.',
    name: 'Pharm. Mathew Kemsguy',
    role: 'Community pharmacist',
    avatar: testimonial2,
    avatarAlt: 'Pharm. Mathew Kemsguy',
  },
  {
    quote:
      "I never buy my medication without checking it here first. It's simple, fast, and makes me feel safe.",
    name: 'Mrs. Elumelu',
    role: 'Patient',
    avatar: testimonial3,
    avatarAlt: 'Mrs. Elumelu',
  },
] as const

export function Testimonials() {
  return (
    <ScrollReveal as="section" className="bg-brand-surface py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mc-eyebrow--blue">Testimonials</span>
          <h2 className="mt-4 flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center">
            <span className="mc-heading-section-sans">Trusted by </span>
            <span className="mc-heading-section-serif mc-heading-section-serif--blue">Experts.</span>
          </h2>
          <p className="mc-body-lead mx-auto mt-4 max-w-2xl">
            Hear from the healthcare professionals who rely on MediChain NG daily.
          </p>
        </div>

        <div className="mt-14 grid gap-6 md:grid-cols-3">
          {items.map((t, i) => (
            <motion.figure
              key={t.name}
              className="flex flex-col rounded-3xl border border-slate-100 bg-white p-6 shadow-[var(--shadow-brand-md)]"
              initial={{ opacity: 0, y: 36 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true, amount: 0.12, margin: '0px 0px 15% 0px' }}
              transition={{ duration: 0.9, delay: i * 0.15, ease: easeMotion }}
              whileHover={{ y: -6, transition: { duration: 0.42, ease: easeMotion } }}
            >
              <ShieldCheck className="h-8 w-8 text-brand-primary" aria-hidden />
              <blockquote className="mc-quote mt-4 flex-1">&ldquo;{t.quote}&rdquo;</blockquote>
              <div className="mt-6 border-t border-slate-100 pt-6">
                <div className="flex items-center gap-3">
                  <img
                    src={t.avatar}
                    alt={t.avatarAlt}
                    className="h-11 w-11 shrink-0 rounded-full object-cover ring-2 ring-slate-100"
                    width={44}
                    height={44}
                    loading="lazy"
                  />
                  <div className="text-left">
                    <figcaption className="font-semibold text-brand-secondary">{t.name}</figcaption>
                    <p className="text-xs font-semibold uppercase tracking-wide text-brand-muted">{t.role}</p>
                  </div>
                </div>
              </div>
            </motion.figure>
          ))}
        </div>
      </Container>
    </ScrollReveal>
  )
}
