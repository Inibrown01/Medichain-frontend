import { MapPin } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { AnimatedCounter } from '../components/motion/AnimatedCounter'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Input } from '../components/ui/Input'
import { ManufacturerCard } from '../components/manufacturers/ManufacturerCard'
import { Link } from 'react-router-dom'

const manufacturers = [
  {
    slug: 'emzor-pharmaceuticals',
    name: 'Emzor Pharmaceuticals',
    location: 'Lagos, Nigeria',
    products: 142,
    certifiedYear: 2018,
  },
  {
    slug: 'swipha',
    name: 'Swipha Nigeria',
    location: 'Lagos, Nigeria',
    products: 98,
    certifiedYear: 2019,
  },
  {
    slug: 'fidson',
    name: 'Fidson Healthcare',
    location: 'Lagos, Nigeria',
    products: 76,
    certifiedYear: 2017,
  },
  {
    slug: 'may-baker',
    name: 'May & Baker',
    location: 'Ogun, Nigeria',
    products: 54,
    certifiedYear: 2016,
  },
] as const

export function ManufacturersPage() {
  return (
    <>
      <ScrollReveal as="section" className="bg-brand-navy text-white" direction="none" scale>
        <Container className="grid gap-10 py-14 md:grid-cols-2 md:items-center md:py-20">
          <div>
            <p className="inline-flex rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-semibold uppercase tracking-wide text-emerald-300">
              Certified network
            </p>
            <h1 className="mt-6 font-serif text-4xl font-semibold md:text-5xl">
              Verified <em className="not-italic text-slate-200">manufacturers.</em>
            </h1>
            <p className="mt-4 max-w-xl text-slate-300">
              Explore companies with active certifications, registered products, and transparent
              facility intelligence.
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-serif text-4xl font-semibold">
                  <AnimatedCounter
                    value={250}
                    suffix="+"
                    formatThousands={false}
                    className="font-serif text-4xl font-semibold"
                  />
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Active manufacturers
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl font-semibold">
                  <AnimatedCounter
                    value={15000}
                    suffix="+"
                    formatThousands
                    className="font-serif text-4xl font-semibold"
                  />
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Registered products
                </p>
              </div>
            </div>
          </div>
        </Container>
      </ScrollReveal>

      <Container className="-mt-8 pb-16">
        <ScrollReveal direction="up" className="rounded-3xl border border-slate-100 bg-white p-2 shadow-lg">
          <div className="flex flex-col gap-2 p-2 sm:flex-row sm:items-center">
            <Input
              className="h-14 flex-1 border-0 bg-slate-50"
              placeholder="Search by manufacturer name, state, or certification..."
            />
            <button
              type="button"
              className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-brand-secondary hover:bg-slate-50"
            >
              <MapPin className="h-4 w-4 text-brand-primary" />
              Region
              <span className="text-slate-400">▾</span>
            </button>
          </div>
        </ScrollReveal>

        <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
          {manufacturers.map((m, i) => (
            <ScrollReveal key={m.slug} delay={i * 0.12} direction="up" scale>
              <ManufacturerCard {...m} />
            </ScrollReveal>
          ))}
        </div>

        <ScrollReveal
          as="section"
          className="mt-20 rounded-[2rem] bg-brand-navy px-8 py-14 text-center text-white"
          direction="up"
          scale
        >
          <h2 className="font-serif text-3xl md:text-4xl">
            Are you a <em className="not-italic text-slate-200">manufacturer?</em>
          </h2>
          <p className="mx-auto mt-4 max-w-2xl text-slate-300">
            Join the verified network to publish product intelligence and build citizen trust.
          </p>
          <div className="mt-8 flex flex-col items-center justify-center gap-3 sm:flex-row">
            <Link
              to="/contact"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl bg-brand-primary px-6 text-sm font-semibold text-white hover:bg-blue-700"
            >
              Apply for certification
            </Link>
            <Link
              to="/contact"
              className="inline-flex h-12 min-w-[200px] items-center justify-center rounded-xl border border-white/40 px-6 text-sm font-semibold text-white hover:bg-white/10"
            >
              Inquiry support
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </>
  )
}
