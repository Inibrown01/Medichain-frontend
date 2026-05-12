import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { TextArea } from '../components/ui/TextArea'
import { useState } from 'react'
import { AboutMission } from '../components/about/AboutMission'
import { AboutCoreValues } from '../components/about/AboutCoreValues'
import { AboutJoinCta } from '../components/about/AboutJoinCta'
import { ContactPageHero } from '../components/contact/ContactPageHero'

const cards = [
  {
    icon: Mail,
    label: 'Email support',
    value: 'support@pharmverifyng.gov.ng',
    hint: 'We respond within one business day.',
    ring: 'border-sky-100 bg-sky-50/80 text-[#2563EB]',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+234 817 2723 665',
    hint: 'Mon–Fri, 8:00–18:00 WAT.',
    ring: 'border-emerald-100 bg-emerald-50/80 text-emerald-700',
  },
  {
    icon: MapPin,
    label: 'Head office',
    value: 'Abuja, Nigeria',
    hint: 'National registry coordination.',
    ring: 'border-violet-100 bg-violet-50/80 text-violet-700',
  },
  {
    icon: Clock,
    label: 'SLA',
    value: 'Critical: 4h',
    hint: 'Counterfeit reports prioritized.',
    ring: 'border-amber-100 bg-amber-50/80 text-amber-800',
  },
] as const

const departments = [
  { id: 'general', label: 'General support' },
  { id: 'counterfeit', label: 'Report counterfeit' },
  { id: 'mfg', label: 'Manufacturer inquiry' },
] as const

export function ContactPage() {
  const [dept, setDept] = useState<(typeof departments)[number]['id']>('general')

  return (
    <>
      <ContactPageHero />
      <AboutMission />
      <AboutCoreValues />

      <section id="contact-form" className="scroll-mt-24 bg-white py-16 md:scroll-mt-28 md:py-24">
        <Container>
          <div className="mx-auto mb-12 max-w-2xl text-center">
            <span className="inline-flex rounded-full border border-[#E2E8F0] bg-white px-3 py-1 font-sans text-xs font-bold uppercase tracking-[0.12em] text-[#0F172A]">
              Get in touch
            </span>
            <h2 className="mt-4 font-sans text-3xl font-bold tracking-tight text-[#0F172A] md:text-4xl">
              Direct line to{' '}
              <span className="font-serif italic text-[#2563EB]">our analysts.</span>
            </h2>
            <p className="mt-4 text-base leading-relaxed text-[#64748B] md:text-lg">
              Route your enquiry to the right desk. Encrypted transit for sensitive counterfeit intelligence.
            </p>
          </div>

          <div className="grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
            {cards.map(({ icon: Icon, ...c }, i) => (
              <ScrollReveal key={c.label} delay={i * 0.08} direction="up" scale>
                <Card padding="md" className="h-full border border-[#E5E7EB] bg-white shadow-sm">
                  <span
                    className={`inline-flex h-10 w-10 items-center justify-center rounded-xl border ${c.ring}`}
                  >
                    <Icon className="h-5 w-5" strokeWidth={1.75} />
                  </span>
                  <p className="mt-4 text-xs font-bold uppercase tracking-wide text-[#64748B]">{c.label}</p>
                  <p className="mt-1 font-semibold text-[#111827]">{c.value}</p>
                  <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{c.hint}</p>
                </Card>
              </ScrollReveal>
            ))}
          </div>

          <div className="mt-14 grid gap-10 lg:grid-cols-3 lg:gap-12">
            <ScrollReveal direction="up" className="space-y-4">
              <h3 className="font-sans text-xl font-bold text-[#0F172A] md:text-2xl">
                Select <span className="font-serif italic text-[#2563EB]">department.</span>
              </h3>
              <div className="space-y-2">
                {departments.map((d) => (
                  <button
                    key={d.id}
                    type="button"
                    onClick={() => setDept(d.id)}
                    className={`flex w-full items-center justify-between rounded-xl border px-4 py-3.5 text-left text-sm font-semibold transition-colors ${
                      dept === d.id
                        ? 'border-[#0F172A] bg-[#0F172A] text-white shadow-md'
                        : 'border-[#E2E8F0] bg-white text-[#0F172A] hover:bg-[#F8FAFC]'
                    }`}
                  >
                    {d.label}
                    <span aria-hidden className="text-lg opacity-80">
                      →
                    </span>
                  </button>
                ))}
              </div>
              <Card className="border border-[#BFDBFE] bg-[#EFF6FF] p-5 shadow-sm">
                <h4 className="font-semibold text-[#0F172A]">Need immediate help?</h4>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  For urgent safety issues, use live chat to reach the duty officer.
                </p>
                <Button variant="outline" className="mt-4 w-full border-[#E2E8F0] bg-white" type="button">
                  Launch live chat
                </Button>
              </Card>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.12} className="lg:col-span-2">
              <Card padding="lg" className="h-full border border-[#E5E7EB] shadow-sm">
                <form
                  className="space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}
                >
                  <div className="grid gap-4 sm:grid-cols-2">
                    <Input name="name" label="Full name" placeholder="Amina Bello" />
                    <Input name="email" type="email" label="Email address" placeholder="you@example.com" />
                  </div>
                  <Input name="subject" label="Subject" placeholder="How can we help?" />
                  <TextArea name="message" label="Detailed message" placeholder="Describe your request..." />
                  <Button
                    type="submit"
                    className="w-full bg-[#2563EB] hover:bg-[#1d4edd] sm:w-auto"
                    rightIcon={<Send className="h-4 w-4" />}
                  >
                    Send message
                  </Button>
                </form>
              </Card>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <AboutJoinCta />
    </>
  )
}
