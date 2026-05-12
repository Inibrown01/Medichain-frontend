import { Activity, Shield } from 'lucide-react'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'

const stats = [
  ['1.2M+', 'Verified products'],
  ['500K+', 'Active users'],
  ['45', 'Partner labs'],
  ['99.9%', 'Success rate'],
] as const

export function AboutMission() {
  return (
    <ScrollReveal as="section" className="bg-[#F9FAFB] py-20 md:py-28" direction="up">
      <Container>
        <div className="grid gap-14 lg:grid-cols-2 lg:items-start lg:gap-20 xl:gap-24">
          <div className="max-w-xl">
            <span className="inline-flex rounded-full bg-[#EEF2FF] px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#4338CA]">
              Our mission
            </span>
            <h2 className="mt-5 font-sans text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.1] tracking-tight text-[#111827]">
              A Vision for{' '}
              <span className="font-serif italic text-[#111827]">Absolute Certainty.</span>
            </h2>
            <p className="mt-6 font-serif text-lg italic leading-relaxed text-[#6B7280] md:text-xl">
              We believe that every citizen deserves absolute certainty when it comes to their health. Our
              mission is to provide that certainty through a transparent, accessible, and unshakeable digital
              registry.
            </p>
            <div className="mt-10 h-px w-full max-w-md bg-[#E5E7EB]" aria-hidden />
            <div className="mt-10 grid grid-cols-2 gap-x-8 gap-y-10 sm:gap-x-12">
              {stats.map(([v, l]) => (
                <div key={l}>
                  <p className="font-serif text-[clamp(1.75rem,2vw+1rem,2.25rem)] font-bold italic leading-none text-[#111827]">
                    {v}
                  </p>
                  <p className="mt-2 font-sans text-xs font-semibold uppercase tracking-[0.14em] text-[#6B7280]">
                    {l}
                  </p>
                </div>
              ))}
            </div>
          </div>

          <div className="grid grid-cols-2 gap-4 md:gap-5">
            <div className="overflow-hidden rounded-[28px] bg-slate-200 shadow-sm md:rounded-[32px]">
              <img
                src="https://images.unsplash.com/photo-1587854692152-cbe660dbde88?w=600&q=85"
                alt="Pharmacist pouring tablets from a bottle"
                className="aspect-[4/5] h-full w-full object-cover"
                width={400}
                height={500}
                loading="lazy"
              />
            </div>
            <div className="flex min-h-[240px] flex-col justify-between rounded-[28px] bg-[#0F172A] p-6 shadow-sm md:min-h-[280px] md:rounded-[32px] md:p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl border border-sky-500/35 bg-transparent">
                <Shield className="h-5 w-5 text-sky-300" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-sans text-lg font-semibold leading-snug text-white">Verified Supply Chain</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-slate-400">
                  End-to-end tracking from manufacturer to consumer.
                </p>
              </div>
            </div>
            <div className="flex min-h-[240px] flex-col justify-between rounded-[28px] bg-[#F3F4F6] p-6 shadow-sm md:min-h-[280px] md:rounded-[32px] md:p-7">
              <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100">
                <Activity className="h-5 w-5 text-[#2563EB]" strokeWidth={1.5} />
              </span>
              <div>
                <p className="font-sans text-lg font-semibold leading-snug text-[#111827]">Real-time Monitoring</p>
                <p className="mt-2 font-sans text-sm leading-relaxed text-[#6B7280]">
                  Continuous sync with national labs and regulatory bodies.
                </p>
              </div>
            </div>
            <div className="overflow-hidden rounded-[28px] bg-slate-200 shadow-sm md:rounded-[32px]">
              <img
                src="https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=600&q=85"
                alt="Pharmacist reviewing medicine in a pharmacy"
                className="aspect-[4/5] h-full w-full object-cover"
                width={400}
                height={500}
                loading="lazy"
              />
            </div>
          </div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
