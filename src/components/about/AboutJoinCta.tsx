import { Link } from 'react-router-dom'
import { ArrowRight } from 'lucide-react'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'

export function AboutJoinCta() {
  return (
    <ScrollReveal as="section" className="bg-[#F8FAFC] py-20 md:py-28" direction="up" scale>
      <Container>
        <div className="mx-auto flex max-w-3xl flex-col items-center px-2 text-center sm:px-4">
          <h2 className="font-sans text-[clamp(2.25rem,4vw+1rem,3.5rem)] font-bold leading-[1.12] tracking-tight text-[#0F172A]">
            Join the
            <br />
            <span className="font-serif italic text-[#2563EB]">Movement.</span>
          </h2>
          <p className="mt-8 max-w-xl text-base leading-relaxed text-[#64748B] md:text-lg">
            Whether you are a citizen seeking safety or a manufacturer seeking integrity, MediChain NG is your
            partner.
          </p>
          <div className="mt-10 flex w-full max-w-lg flex-col items-stretch justify-center gap-4 sm:flex-row sm:items-center sm:justify-center">
            <Link
              to="/genuine-verification/amx-500"
              className="inline-flex h-12 min-w-[180px] items-center justify-center gap-2 rounded-lg bg-[#2563EB] px-7 text-sm font-semibold text-white transition-colors hover:bg-[#1d4edd] focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-[#2563EB]"
            >
              Verify a product
              <ArrowRight className="h-4 w-4" strokeWidth={2.25} />
            </Link>
            <Link
              to="/manufacturer/register/1"
              className="inline-flex h-12 min-w-[180px] items-center justify-center rounded-lg border border-[#E2E8F0] bg-white px-7 text-sm font-semibold text-[#0F172A] transition-colors hover:bg-slate-50 focus-visible:outline focus-visible:outline-2 focus-visible:outline-offset-2 focus-visible:outline-slate-300"
            >
              Manufacturer registration
            </Link>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
