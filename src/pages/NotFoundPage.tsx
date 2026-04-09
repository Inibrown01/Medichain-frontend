import { Link, useLocation } from 'react-router-dom'
import { motion } from 'framer-motion'
import { ArrowLeft, Home, Search, Sparkles } from 'lucide-react'
import { cn } from '../lib/cn'

const btnPrimary =
  'inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-2xl bg-brand-primary px-6 text-base font-semibold text-white shadow-[0_12px_32px_rgba(29,78,216,0.25)] transition-colors hover:bg-blue-700 focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/40'

const btnSecondary =
  'inline-flex h-12 min-w-[200px] items-center justify-center gap-2 rounded-2xl border-2 border-brand-primary bg-white px-6 text-base font-semibold text-brand-primary transition-colors hover:bg-brand-primary hover:text-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary/30'

export function NotFoundPage() {
  const { pathname } = useLocation()

  return (
    <div className="relative flex min-h-[calc(100vh-10rem)] flex-col items-center justify-center overflow-hidden px-4 py-16 sm:min-h-[calc(100vh-12rem)] sm:py-24">
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_100%_80%_at_50%_-30%,rgba(29,78,216,0.45),transparent_55%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_70%_60%_at_100%_20%,rgba(147,197,253,0.2),transparent_50%)]"
        aria-hidden
      />
      <div
        className="pointer-events-none absolute inset-0 bg-gradient-to-b from-transparent via-[#f8fafc]/80 to-[#f8fafc]"
        aria-hidden
      />

      <div
        className="pointer-events-none absolute inset-0 opacity-[0.35] [mask-image:radial-gradient(ellipse_70%_70%_at_50%_50%,black,transparent)]"
        style={{
          backgroundImage:
            'linear-gradient(rgba(15,23,42,0.06) 1px, transparent 1px), linear-gradient(90deg, rgba(15,23,42,0.06) 1px, transparent 1px)',
          backgroundSize: '48px 48px',
        }}
        aria-hidden
      />

      <motion.div
        className="pointer-events-none absolute -left-20 top-1/4 h-72 w-72 rounded-full bg-brand-primary/10 blur-3xl"
        animate={{ x: [0, 12, 0], opacity: [0.4, 0.55, 0.4] }}
        transition={{ duration: 8, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />
      <motion.div
        className="pointer-events-none absolute -right-16 bottom-1/4 h-64 w-64 rounded-full bg-sky-300/20 blur-3xl"
        animate={{ x: [0, -10, 0], opacity: [0.3, 0.45, 0.3] }}
        transition={{ duration: 10, repeat: Infinity, ease: 'easeInOut' }}
        aria-hidden
      />

      <div className="relative z-10 mx-auto w-full max-w-xl text-center">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5, ease: [0.22, 1, 0.36, 1] }}
        >
          <div className="mb-8 inline-flex items-center gap-2 rounded-full border border-white/60 bg-white/70 px-4 py-2 text-xs font-bold uppercase tracking-[0.2em] text-brand-muted shadow-[0_4px_24px_rgba(15,23,42,0.06)] backdrop-blur-md">
            <Sparkles className="h-3.5 w-3.5 text-brand-primary" aria-hidden />
            Lost in the chain
          </div>

          <div className="relative mx-auto flex justify-center">
            <span
              className="pointer-events-none absolute -inset-x-4 -inset-y-6 rounded-[2rem] bg-gradient-to-b from-white/40 to-transparent blur-sm"
              aria-hidden
            />
            <motion.h1
              className="relative bg-gradient-to-br from-brand-secondary via-slate-800 to-brand-primary bg-clip-text font-serif text-[clamp(4.5rem,16vw,8.5rem)] font-bold leading-none tracking-tight text-transparent"
              style={{
                textShadow: '0 4px 60px rgba(29, 78, 216, 0.12)',
              }}
              initial={{ scale: 0.92, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              transition={{ type: 'spring', stiffness: 120, damping: 18, delay: 0.05 }}
            >
              404
            </motion.h1>
          </div>

          <motion.div
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.15, duration: 0.45 }}
          >
            <h2 className="mt-6 font-serif text-2xl font-semibold tracking-tight text-brand-secondary sm:text-3xl">
              This page does not exist
            </h2>
            <p className="mx-auto mt-4 max-w-md text-sm leading-relaxed text-brand-muted sm:text-base">
              The link may be outdated, or the address was mistyped. Head back home to keep exploring verified medicines
              and safe supply chains.
            </p>
          </motion.div>

          {pathname && pathname !== '/' ? (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.25 }}
              className="mx-auto mt-8 inline-flex max-w-full items-center gap-2 rounded-2xl border border-slate-200/90 bg-white/70 px-4 py-3 font-mono text-xs text-slate-600 shadow-sm backdrop-blur-sm sm:text-sm"
            >
              <Search className="h-4 w-4 shrink-0 text-brand-primary/70" aria-hidden />
              <span className="min-w-0 break-all text-left">
                <span className="text-brand-muted">Requested: </span>
                <span className="font-medium text-brand-secondary">{pathname}</span>
              </span>
            </motion.p>
          ) : null}

          <motion.div
            className="mt-10 flex flex-col items-stretch justify-center gap-3 sm:flex-row sm:items-center sm:justify-center"
            initial={{ opacity: 0, y: 12 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.3, duration: 0.4 }}
          >
            <Link to="/" className={cn(btnPrimary)}>
              Back to home
              <Home className="h-4 w-4" aria-hidden />
            </Link>
            <Link to="/registry" className={cn(btnSecondary)}>
              <ArrowLeft className="h-4 w-4" aria-hidden />
              Browse registry
            </Link>
          </motion.div>
        </motion.div>
      </div>
    </div>
  )
}
