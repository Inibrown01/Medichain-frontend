import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'

export function AboutJoinCta() {
  return (
    <ScrollReveal as="section" className="bg-white py-20 md:py-28" direction="up" scale>
      <Container>
        <div className="mx-auto max-w-3xl text-center">
          <h2 className="font-sans text-3xl font-bold text-brand-secondary md:text-4xl">
            Join the <span className="font-serif italic text-brand-primary">Movement.</span>
          </h2>
          <p className="mt-4 text-lg text-brand-muted">
            Whether you&apos;re verifying a single pack or registering an entire catalog — start here.
          </p>
          <div className="mt-10 flex flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center">
            <Link
              to="/genuine-verification/amx-500"
              className="inline-flex h-12 items-center justify-center gap-2 rounded-xl bg-brand-primary px-8 text-sm font-semibold text-white transition-colors hover:bg-blue-700"
            >
              Verify a product
              <ArrowRight className="h-4 w-4" />
            </Link>
            <Link
              to="/manufacturer/register/1"
              className="inline-flex h-12 items-center justify-center rounded-xl border-2 border-slate-200 bg-white px-8 text-sm font-semibold text-brand-secondary transition-colors hover:bg-slate-50"
            >
              Manufacturer registration
            </Link>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
