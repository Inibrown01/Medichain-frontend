import { Link } from 'react-router-dom'
import { AlertTriangle } from 'lucide-react'
import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'

export function PublicSafetyNotice() {
  return (
    <ScrollReveal as="section" className="bg-white py-16 md:py-24">
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center text-center">
          <motion.span
            className="flex h-16 w-16 items-center justify-center rounded-2xl bg-orange-100 text-orange-600"
            initial={{ opacity: 0, rotate: -10, scale: 0.85 }}
            whileInView={{ opacity: 1, rotate: 0, scale: 1 }}
            viewport={{ once: true }}
            transition={{ duration: 0.88, ease: easeMotion }}
          >
            <motion.span
              animate={{ y: [0, -5, 0] }}
              transition={{ duration: 5, repeat: Infinity, ease: 'easeInOut' }}
              className="inline-flex"
            >
              <AlertTriangle className="h-9 w-9" strokeWidth={2} aria-hidden />
            </motion.span>
          </motion.span>
          <h2 className="mt-8 flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center">
            <span className="mc-heading-section-sans">Public Safety </span>
            <span className="mc-heading-section-serif mc-heading-section-serif--red">Notice.</span>
          </h2>
          <p className="mc-safety-desc mt-6 max-w-2xl">
            Counterfeit medicines can be fatal. If a product fails verification, report it immediately.
            Your report could save lives.
          </p>
          <motion.div
            whileHover={{ scale: 1.04, transition: { duration: 0.45, ease: easeMotion } }}
            whileTap={{ scale: 0.98 }}
          >
            <Link
              to="/contact"
              className="mt-8 inline-flex min-h-[52px] items-center justify-center rounded-full bg-red-600 px-10 font-sans text-xl font-semibold leading-7 text-white shadow-lg transition-colors hover:bg-red-700"
            >
              Report Suspicious Product
            </Link>
          </motion.div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
