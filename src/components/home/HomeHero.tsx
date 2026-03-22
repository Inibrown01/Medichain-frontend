import { Link } from 'react-router-dom'
import { QrCode, Search } from 'lucide-react'
import { motion, useReducedMotion } from 'framer-motion'
import { Container } from '../layout/Container'
import { easeMotion } from '../../lib/motion'

const stagger = {
  hidden: { opacity: 0 },
  show: {
    opacity: 1,
    transition: { staggerChildren: 0.17, delayChildren: 0.14 },
  },
}

const fadeUp = {
  hidden: { opacity: 0, y: 32 },
  show: {
    opacity: 1,
    y: 0,
    transition: { duration: 0.88, ease: easeMotion },
  },
}

export function HomeHero() {
  const reduce = useReducedMotion()
  const leftColProps = reduce
    ? {}
    : {
        variants: stagger,
        initial: 'hidden' as const,
        animate: 'show' as const,
      }

  return (
    <section className="relative overflow-hidden bg-gradient-to-br from-sky-50 via-violet-50/40 to-slate-50 pb-16 pt-24 sm:pt-28 md:pb-24 lg:pb-28">
      {!reduce ? (
        <motion.div
          className="pointer-events-none absolute -right-20 top-20 h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-sky-200/35 blur-3xl"
          aria-hidden
          animate={{ scale: [1, 1.06, 1], opacity: [0.55, 0.75, 0.55] }}
          transition={{ duration: 14, repeat: Infinity, ease: 'easeInOut' }}
        />
      ) : (
        <div
          className="pointer-events-none absolute -right-20 top-20 h-[min(90vw,520px)] w-[min(90vw,520px)] rounded-full bg-sky-200/35 blur-3xl"
          aria-hidden
        />
      )}
      <Container>
        <div className="grid items-center gap-12 lg:grid-cols-[minmax(0,1.05fr)_minmax(0,0.95fr)] lg:gap-16">
          <motion.div className="max-w-xl space-y-6 md:space-y-8" {...leftColProps}>
            <motion.span variants={reduce ? undefined : fadeUp} className="mc-eyebrow--green inline-flex">
              National safety standard
            </motion.span>
            <motion.h1 className="space-y-1" variants={reduce ? undefined : fadeUp}>
              <span className="mc-display-hero-sans block">Trust Your</span>
              <span className="mc-display-hero-serif block">Medicine.</span>
            </motion.h1>
            <motion.p variants={reduce ? undefined : fadeUp} className="mc-body-lead max-w-lg">
              The national digital platform to verify the authenticity of health products instantly.
              Protect your family from counterfeit drugs.
            </motion.p>

            <motion.div variants={reduce ? undefined : fadeUp} className="flex flex-col gap-3">
              <div className="flex flex-col gap-2 rounded-3xl border border-slate-200/80 bg-white p-2 shadow-sm sm:flex-row sm:items-stretch">
                <div className="relative flex min-h-14 flex-1 items-center gap-2 rounded-2xl bg-slate-50 px-4">
                  <Search className="h-5 w-5 shrink-0 text-slate-400" aria-hidden />
                  <input
                    type="search"
                    placeholder="Enter NAFDAC No or Batch No"
                    className="min-w-0 flex-1 bg-transparent text-sm font-medium text-brand-secondary placeholder:text-slate-400 focus:outline-none"
                    aria-label="NAFDAC or batch number"
                  />
                  <button
                    type="button"
                    className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 bg-white text-brand-secondary transition-colors hover:bg-slate-50"
                    aria-label="Scan QR code"
                  >
                    <QrCode className="h-5 w-5" />
                  </button>
                </div>
                <motion.div
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  transition={{ type: 'spring', stiffness: 380, damping: 28 }}
                >
                  <Link
                    to="/genuine-verification/amx-500"
                    className="inline-flex h-14 min-h-14 w-full shrink-0 items-center justify-center rounded-2xl bg-brand-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-blue-700 sm:w-auto"
                  >
                    Verify Now
                  </Link>
                </motion.div>
              </div>
              <div className="flex flex-wrap gap-x-6 gap-y-2 text-sm font-medium">
                <Link to="/registry" className="text-brand-primary transition-colors hover:underline">
                  → Browse Registry
                </Link>
                <Link to="/about" className="text-brand-primary transition-colors hover:underline">
                  → QR Guide
                </Link>
              </div>
            </motion.div>
          </motion.div>

          <motion.div
            className="relative mx-auto w-full max-w-md lg:max-w-none"
            initial={reduce ? false : { opacity: 0, x: 40, scale: 0.96 }}
            animate={reduce ? undefined : { opacity: 1, x: 0, scale: 1 }}
            transition={{ duration: 1.05, delay: 0.18, ease: easeMotion }}
          >
            <motion.div
              className="absolute -bottom-6 -left-6 right-12 top-12 rounded-[2.5rem] bg-sky-100/80 blur-sm"
              aria-hidden
              animate={reduce ? undefined : { opacity: [0.6, 1, 0.6] }}
              transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
            />
            <div className="relative aspect-[4/5] w-full overflow-hidden rounded-[2rem] bg-slate-200 shadow-xl ring-1 ring-slate-200/60">
              <div className="flex h-full w-full flex-col items-center justify-center bg-gradient-to-b from-slate-100 to-slate-200 p-8 text-center text-slate-500">
                <p className="text-sm font-semibold">Hero image</p>
                <p className="mt-2 text-xs">Replace with your asset</p>
              </div>
              <motion.div
                className="absolute bottom-4 right-4 max-w-[220px] rounded-2xl border border-white/60 bg-white/95 p-3 shadow-lg backdrop-blur-sm"
                initial={reduce ? false : { opacity: 0, y: 16 }}
                animate={reduce ? undefined : { opacity: 1, y: 0 }}
                transition={{ delay: 0.72, duration: 0.78, ease: easeMotion }}
              >
                <div className="flex items-start gap-3">
                  <span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-emerald-500 text-white">
                    ✓
                  </span>
                  <div className="text-left">
                    <p className="text-sm font-bold text-brand-secondary">Verified Authentic</p>
                    <p className="text-xs text-brand-muted">Batch #EMZ-2024-01</p>
                  </div>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </Container>
    </section>
  )
}
