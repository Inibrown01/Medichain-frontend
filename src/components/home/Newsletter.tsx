import { motion } from 'framer-motion'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'

export function Newsletter() {
  return (
    <ScrollReveal as="section" className="bg-brand-surface px-4 py-12 md:py-16" direction="up" scale>
      <motion.div
        className="mx-auto max-w-5xl overflow-hidden rounded-[2.5rem] bg-[#16a34a] px-6 py-12 text-center text-white shadow-xl md:px-12 md:py-16"
        initial={{ opacity: 0, scale: 0.96 }}
        whileInView={{ opacity: 1, scale: 1 }}
        viewport={{ once: true, amount: 0.2 }}
        transition={{ duration: 1.05, ease: easeMotion }}
      >
        <span className="mc-eyebrow inline-flex rounded-full border border-white/70 px-3 py-1 text-white">
          Stay informed
        </span>
        <h2 className="mt-6 flex flex-col items-center gap-1 sm:flex-row sm:flex-wrap sm:justify-center">
          <span className="mc-heading-section-sans text-white">Stay Alert, </span>
          <span className="mc-newsletter-heading-serif">Stay Safe.</span>
        </h2>
        <p className="mx-auto mt-4 max-w-2xl font-sans text-lg font-medium leading-7 text-slate-100">
          Subscribe to receive real-time safety alerts and health product recall information directly in
          your inbox.
        </p>
        <form
          className="mx-auto mt-8 flex max-w-xl flex-col gap-3 sm:flex-row sm:items-stretch"
          onSubmit={(e) => e.preventDefault()}
        >
          <motion.input
            type="email"
            required
            placeholder="Your email address"
            className="h-14 flex-1 rounded-xl border border-white/80 bg-white/10 px-4 font-sans text-lg font-semibold text-white placeholder:text-white/80 outline-none ring-brand-surface transition-[box-shadow] focus:ring-2"
            aria-label="Email address"
            whileFocus={{ scale: 1.01, transition: { duration: 0.35, ease: easeMotion } }}
          />
          <motion.button
            type="submit"
            className="h-14 shrink-0 rounded-xl bg-white px-8 font-sans text-lg font-semibold text-[#16a34a]"
            whileHover={{ scale: 1.04, transition: { duration: 0.4, ease: easeMotion } }}
            whileTap={{ scale: 0.97 }}
          >
            Join Now
          </motion.button>
        </form>
      </motion.div>
    </ScrollReveal>
  )
}
