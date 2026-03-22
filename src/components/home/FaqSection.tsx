import { useState } from 'react'
import { ChevronDown } from 'lucide-react'
import { motion, AnimatePresence } from 'framer-motion'
import { Container } from '../layout/Container'
import { cn } from '../../lib/cn'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'

const faqs = [
  {
    q: 'How do I find the NAFDAC number?',
    a: 'The NAFDAC registration number is usually printed on the side or back of the product packaging, often preceded by "NAFDAC Reg No:".',
  },
  {
    q: 'What if a product fails verification?',
    a: 'Stop using the product, retain packaging and batch details, and report through the contact form or your healthcare provider.',
  },
  {
    q: 'Is the verification service free?',
    a: 'Yes — citizens can verify registered products at no cost through MediChain NG.',
  },
  {
    q: 'Can I verify herbal products?',
    a: 'Yes, when they are registered and listed in the national inventory.',
  },
] as const

export function FaqSection() {
  const [open, setOpen] = useState(0)

  return (
    <ScrollReveal as="section" className="bg-brand-surface py-16 md:py-24">
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <span className="mc-eyebrow--support">Support</span>
          <h2 className="mc-heading-section-sans mt-4">Common Questions</h2>
          <p className="mc-body-lead mx-auto mt-4 max-w-2xl">
            Everything you need to know about product verification.
          </p>
        </div>

        <div className="mx-auto mt-12 max-w-3xl space-y-4">
          {faqs.map((item, i) => {
            const isOpen = open === i
            return (
              <motion.div
                key={item.q}
                className="overflow-hidden rounded-2xl border border-slate-100 bg-white shadow-sm"
                initial={{ opacity: 0, y: 16 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.12, margin: '0px 0px 15% 0px' }}
                transition={{ duration: 0.78, delay: i * 0.11, ease: easeMotion }}
              >
                <button
                  type="button"
                  onClick={() => setOpen(isOpen ? -1 : i)}
                  className={cn(
                    'flex w-full items-center justify-between gap-4 px-5 py-5 text-left transition-colors md:px-6',
                    isOpen ? 'bg-[#1e3a8a]' : 'bg-white hover:bg-slate-50',
                  )}
                >
                  <span className={cn(isOpen ? 'mc-faq-q' : 'mc-faq-q-collapsed')}>{item.q}</span>
                  <span
                    className={cn(
                      'flex h-10 w-10 shrink-0 items-center justify-center rounded-full transition-colors',
                      isOpen ? 'bg-white/15 text-white' : 'bg-slate-100 text-brand-secondary',
                    )}
                  >
                    <ChevronDown
                      className={cn('h-5 w-5 transition-transform duration-500 ease-out', isOpen && '-rotate-180')}
                    />
                  </span>
                </button>
                <AnimatePresence initial={false}>
                  {isOpen ? (
                    <motion.div
                      initial={{ height: 0, opacity: 0 }}
                      animate={{ height: 'auto', opacity: 1 }}
                      exit={{ height: 0, opacity: 0 }}
                      transition={{ duration: 0.42, ease: easeMotion }}
                      className="border-t border-slate-100 bg-white"
                    >
                      <p className="mc-faq-a px-5 py-5 md:px-6 md:py-6">{item.a}</p>
                    </motion.div>
                  ) : null}
                </AnimatePresence>
              </motion.div>
            )
          })}
        </div>
      </Container>
    </ScrollReveal>
  )
}
