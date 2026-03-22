import { Fragment } from 'react'
import { QrCode, ScanLine, ShieldCheck } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import type { LucideIcon } from 'lucide-react'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'

const steps: {
  n: string
  title: string
  body: string
  icon: LucideIcon
}[] = [
  {
    n: '01',
    title: 'Locate the Code',
    body: 'Find the NAFDAC number or scan the QR code on the packaging.',
    icon: ScanLine,
  },
  {
    n: '02',
    title: 'Enter Details',
    body: 'Input the code into our tool or scan directly with your camera.',
    icon: QrCode,
  },
  {
    n: '03',
    title: 'Instant Result',
    body: 'Get immediate confirmation of authenticity and safety status.',
    icon: ShieldCheck,
  },
]

export function ProcessSteps() {
  return (
    <ScrollReveal as="section" className="bg-brand-secondary py-16 text-white md:py-24" direction="up">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mc-eyebrow--white mb-4 inline-flex">Simple process</span>
          <h2 className="mt-4 flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center">
            <span className="mc-heading-section-sans text-white">Three Steps to </span>
            <span className="mc-heading-section-serif mc-heading-section-serif--sky">Certainty.</span>
          </h2>
          <p className="mc-body-lead mx-auto mt-4 max-w-2xl text-slate-400">
            We&apos;ve made verification fast, easy, and accessible for everyone.
          </p>
        </div>

        <div className="mt-14 flex flex-col items-stretch gap-6 md:flex-row md:items-stretch md:justify-center">
          {steps.map((s, i) => (
            <Fragment key={s.n}>
              <motion.article
                className="relative flex-1 overflow-hidden rounded-3xl border border-white/10 bg-slate-900/80 p-6 shadow-lg md:max-w-sm md:p-8"
                initial={{ opacity: 0, y: 32 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.25 }}
                transition={{ duration: 0.88, delay: i * 0.18, ease: easeMotion }}
                whileHover={{ y: -6, borderColor: 'rgba(255,255,255,0.2)', transition: { duration: 0.38, ease: easeMotion } }}
              >
                <span className="mc-step-num absolute right-4 top-2 select-none">{s.n}</span>
                <motion.span
                  className="inline-flex h-12 w-12 items-center justify-center rounded-xl bg-brand-primary text-white"
                  whileHover={{ rotate: [0, -8, 8, 0], transition: { duration: 0.72, ease: easeMotion } }}
                >
                  <s.icon className="h-6 w-6" aria-hidden />
                </motion.span>
                <h3 className="mt-6 font-sans text-2xl font-bold leading-10 text-white md:text-[2rem]">
                  {s.title}
                </h3>
                <p className="mt-3 font-sans text-lg font-medium leading-7 text-slate-400">{s.body}</p>
              </motion.article>
              {i < steps.length - 1 ? (
                <motion.div
                  className="hidden items-center justify-center text-3xl font-light text-slate-500 md:flex md:w-10 md:shrink-0"
                  aria-hidden
                  initial={{ opacity: 0 }}
                  whileInView={{ opacity: 1 }}
                  viewport={{ once: true }}
                  transition={{ delay: 0.32 + i * 0.14, duration: 0.55, ease: easeMotion }}
                >
                  →
                </motion.div>
              ) : null}
            </Fragment>
          ))}
        </div>
      </Container>
    </ScrollReveal>
  )
}
