import { Activity, Globe, ShieldCheck, Users } from 'lucide-react'
import type { LucideIcon } from 'lucide-react'
import { Container } from '../layout/Container'
import { ScrollReveal } from '../motion/ScrollReveal'

const values: { title: string; body: string; icon: LucideIcon }[] = [
  {
    title: 'Absolute Transparency',
    body: 'Open access to verification data for every citizen, ensuring no product goes unchecked.',
    icon: Globe,
  },
  {
    title: 'Uncompromising Safety',
    body: 'Rigorous validation protocols that meet and exceed international healthcare standards.',
    icon: ShieldCheck,
  },
  {
    title: 'Technological Excellence',
    body: 'Leveraging AI and blockchain to stay ahead of counterfeiters and protect the public.',
    icon: Activity,
  },
  {
    title: 'National Unity',
    body: 'A single, unified platform serving all 36 states and the FCT with equal precision.',
    icon: Users,
  },
]

function ValueIcon({ icon: Icon }: { icon: LucideIcon }) {
  return (
    <span className="inline-flex h-11 w-11 shrink-0 items-center justify-center rounded-lg border border-[#4A5568] bg-transparent">
      <Icon className="h-5 w-5 text-white" strokeWidth={1.35} />
    </span>
  )
}

export function AboutCoreValues() {
  return (
    <ScrollReveal as="section" className="bg-[#0a1120] py-20 text-white md:py-28" direction="up">
      <Container>
        <div className="grid gap-16 lg:grid-cols-[minmax(0,1fr)_minmax(0,2fr)] lg:gap-20 xl:gap-24">
          <div className="max-w-md">
            <span className="inline-flex rounded-full border border-white px-3 py-1.5 font-sans text-[0.6875rem] font-bold uppercase tracking-[0.14em] text-white">
              Core values
            </span>
            <h2 className="mt-6 font-sans text-[clamp(2rem,3vw+1rem,3.25rem)] font-bold leading-[1.1] tracking-tight text-white">
              The Pillars of{' '}
              <span className="font-serif italic text-[#90cdf4]">Our Platform.</span>
            </h2>
            <p className="mt-6 text-base leading-relaxed text-[#718096] md:text-lg">
              Our foundation is built on trust, safety, and technological innovation to serve the Nigerian
              people.
            </p>
          </div>
          <div className="grid gap-x-16 gap-y-14 sm:grid-cols-2 sm:gap-x-12 md:gap-x-16 lg:gap-x-20">
            {values.map((v) => (
              <div key={v.title} className="flex max-w-md flex-col items-start text-left">
                <ValueIcon icon={v.icon} />
                <h3 className="mt-5 font-sans text-lg font-bold text-white md:text-xl">{v.title}</h3>
                <p className="mt-3 font-sans text-sm leading-relaxed text-[#718096] md:text-base">{v.body}</p>
              </div>
            ))}
          </div>
        </div>
      </Container>
    </ScrollReveal>
  )
}
