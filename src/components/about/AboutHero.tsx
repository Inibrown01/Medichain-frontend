import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'

export function AboutHero() {
  return (
    <ScrollReveal
      as="section"
      className="relative overflow-hidden bg-brand-secondary text-white"
      direction="none"
      scale
    >
      <div
        className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=80')] bg-cover bg-center opacity-40"
        aria-hidden
      />
      <div className="absolute inset-0 bg-gradient-to-r from-brand-secondary via-brand-secondary/95 to-brand-secondary/80" />
      <Container className="relative grid gap-12 py-20 md:grid-cols-2 md:items-center md:py-28">
        <div className="max-w-xl">
          <h1 className="font-sans text-4xl font-bold leading-tight tracking-tight md:text-5xl lg:text-6xl">
            The Standard of{' '}
            <span className="font-serif italic text-sky-300">Health Integrity.</span>
          </h1>
          <p className="mt-6 text-lg leading-relaxed text-slate-300">
            MediChain NG is Nigeria&apos;s definitive digital shield — connecting citizens, regulators, and
            manufacturers to verified product truth.
          </p>
          <Link
            to="/genuine-verification/amx-500"
            className="mt-8 inline-flex items-center gap-2 rounded-xl bg-brand-primary px-6 py-3.5 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
          >
            Verify now
            <ArrowRight className="h-4 w-4" />
          </Link>
          <div className="mt-10 flex items-center gap-3">
            <div className="flex -space-x-2">
              {[1, 2, 3].map((i) => (
                <span
                  key={i}
                  className="h-10 w-10 rounded-full border-2 border-brand-secondary bg-slate-400"
                />
              ))}
            </div>
            <p className="text-sm font-medium text-slate-300">105,000+ verified users</p>
          </div>
        </div>
        <div className="relative mx-auto w-full max-w-md">
          <div className="absolute -bottom-4 -left-4 z-10 rounded-full bg-brand-primary px-4 py-2 text-[10px] font-bold uppercase tracking-widest text-white shadow-lg">
            National safety standard
          </div>
          <div className="aspect-[4/5] overflow-hidden rounded-3xl border-4 border-white/20 shadow-2xl">
            <div className="flex h-full w-full items-center justify-center bg-gradient-to-br from-slate-600 to-slate-900 text-sm text-slate-400">
              Hero image — replace
            </div>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
