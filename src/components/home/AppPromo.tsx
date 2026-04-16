import { motion } from 'framer-motion'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'
import { easeMotion } from '../../lib/motion'
import comingSoonPhone from '../../assets/medichain/coming-soon-phone.png'

export function AppPromo() {
  return (
    <ScrollReveal as="section" className="bg-brand-surface py-12 md:py-16" direction="up" scale>
      <Container>
        <motion.div
          className="overflow-hidden rounded-[2.5rem] bg-[#1e3a8a] px-6 py-12 text-white md:px-12 md:py-16"
          initial={{ opacity: 0, borderRadius: 32 }}
          whileInView={{ opacity: 1, borderRadius: 40 }}
          viewport={{ once: true }}
          transition={{ duration: 1.0, ease: easeMotion }}
        >
          <div className="grid items-center gap-10 lg:grid-cols-2">
            <motion.div
              className="max-w-xl space-y-5"
              initial={{ opacity: 0, x: -24 }}
              whileInView={{ opacity: 1, x: 0 }}
              viewport={{ once: true }}
              transition={{ duration: 0.88, ease: easeMotion }}
            >
              <span className="mc-eyebrow rounded-full border border-white/50 px-3 py-1 text-white">
                Coming soon
              </span>
              <h2 className="flex flex-col gap-1">
                <span className="mc-heading-section-sans text-white">Safety in </span>
                <span className="mc-heading-section-serif mc-heading-section-serif--sky">Your Pocket.</span>
              </h2>
              <p className="font-sans text-lg font-medium leading-7 text-slate-300">
                The MediChain NG mobile app will feature instant scanning, offline verification, and
                personalized health alerts.
              </p>
              <div className="flex flex-wrap gap-3 pt-2">
                <motion.button
                  type="button"
                  className="flex min-w-[140px] flex-col rounded-xl bg-black/30 px-4 py-3 text-left text-white ring-1 ring-white/10 transition-colors hover:bg-black/40"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                    Download on the
                  </span>
                  <span className="text-lg font-semibold">App Store</span>
                </motion.button>
                <motion.button
                  type="button"
                  className="flex min-w-[140px] flex-col rounded-xl bg-black/30 px-4 py-3 text-left text-white ring-1 ring-white/10 transition-colors hover:bg-black/40"
                  whileHover={{ scale: 1.04 }}
                  whileTap={{ scale: 0.98 }}
                >
                  <span className="text-[10px] font-semibold uppercase tracking-wide text-slate-300">
                    Get it on
                  </span>
                  <span className="text-lg font-semibold">Google Play</span>
                </motion.button>
              </div>
            </motion.div>
            <motion.div
              className="relative flex justify-center lg:justify-end"
              initial={{ opacity: 0, x: 40, rotate: 8 }}
              whileInView={{ opacity: 1, x: 0, rotate: 6 }}
              viewport={{ once: true }}
              transition={{ duration: 1.05, ease: easeMotion }}
            >
              <motion.div
                className="relative w-[min(100%,320px)]"
                animate={{ y: [0, -8, 0] }}
                transition={{ duration: 7, repeat: Infinity, ease: 'easeInOut' }}
              >
                <img
                  src={comingSoonPhone}
                  alt="MediChain NG mobile app on a smartphone"
                  className="h-auto w-full drop-shadow-2xl"
                  width={640}
                  height={1200}
                  loading="lazy"
                />
              </motion.div>
            </motion.div>
          </div>
        </motion.div>
      </Container>
    </ScrollReveal>
  )
}
