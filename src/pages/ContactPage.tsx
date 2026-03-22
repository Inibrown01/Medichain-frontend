import { Mail, MapPin, Phone, Clock, Send } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'
import { Input } from '../components/ui/Input'
import { TextArea } from '../components/ui/TextArea'
import { useState } from 'react'

const cards = [
  {
    icon: Mail,
    label: 'Email support',
    value: 'support@medichainng.gov.ng',
    hint: 'We respond within one business day.',
    color: 'bg-blue-50 text-brand-primary',
  },
  {
    icon: Phone,
    label: 'Phone',
    value: '+234 800 000 0000',
    hint: 'Mon–Fri, 8:00–18:00 WAT.',
    color: 'bg-emerald-50 text-emerald-700',
  },
  {
    icon: MapPin,
    label: 'Head office',
    value: 'Abuja, Nigeria',
    hint: 'National Health Registry campus.',
    color: 'bg-violet-50 text-violet-700',
  },
  {
    icon: Clock,
    label: 'SLA',
    value: 'Critical: 4h',
    hint: 'Counterfeit reports prioritized.',
    color: 'bg-amber-50 text-amber-800',
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
      <ScrollReveal as="section" className="bg-brand-navy text-white" direction="none" scale>
        <Container className="py-16 md:py-24">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            Direct channel
          </p>
          <h1 className="mt-4 max-w-3xl text-4xl font-bold md:text-5xl">
            Connect <em className="not-italic text-blue-200">directly.</em>
          </h1>
          <div className="mt-8 grid gap-8 md:grid-cols-2">
            <p className="text-slate-300">
              Specialized response teams route manufacturer, citizen, and enforcement enquiries to the
              right analysts.
            </p>
            <div className="rounded-2xl border border-white/10 bg-white/5 p-4">
              <p className="text-sm font-semibold text-emerald-300">Encrypted channel</p>
              <p className="mt-2 text-sm text-slate-300">
                Sensitive submissions are protected in transit and at rest.
              </p>
            </div>
          </div>
        </Container>
      </ScrollReveal>

      <Container className="-mt-16 pb-16">
        <div className="grid gap-4 md:grid-cols-2 xl:grid-cols-4">
          {cards.map(({ icon: Icon, ...c }, i) => (
            <ScrollReveal key={c.label} delay={i * 0.12} direction="up" scale>
              <Card padding="md" className="h-full border-slate-100">
                <span className={`inline-flex h-10 w-10 items-center justify-center rounded-xl ${c.color}`}>
                  <Icon className="h-5 w-5" />
                </span>
                <p className="mt-4 text-xs font-bold uppercase tracking-wide text-brand-muted">{c.label}</p>
                <p className="mt-1 font-semibold text-brand-secondary">{c.value}</p>
                <p className="mt-2 text-sm text-brand-muted">{c.hint}</p>
              </Card>
            </ScrollReveal>
          ))}
        </div>

        <div className="mt-16 grid gap-8 lg:grid-cols-3">
          <ScrollReveal direction="up" className="space-y-4">
            <h2 className="font-serif text-2xl font-semibold text-brand-secondary">Select department.</h2>
            <div className="space-y-2">
              {departments.map((d) => (
                <button
                  key={d.id}
                  type="button"
                  onClick={() => setDept(d.id)}
                  className={`flex w-full items-center justify-between rounded-xl border px-4 py-3 text-left text-sm font-semibold transition-colors ${
                    dept === d.id
                      ? 'border-brand-navy bg-brand-navy text-white'
                      : 'border-slate-200 bg-white text-brand-secondary hover:bg-slate-50'
                  }`}
                >
                  {d.label}
                  <span aria-hidden>→</span>
                </button>
              ))}
            </div>
            <Card className="border-blue-100 bg-blue-50/60 p-4">
              <h3 className="font-semibold text-brand-secondary">Need immediate help?</h3>
              <p className="mt-2 text-sm text-brand-muted">
                For urgent safety issues, use live chat to reach the duty officer.
              </p>
              <Button variant="secondary" className="mt-4 w-full bg-white" type="button">
                Launch live chat
              </Button>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.18} className="lg:col-span-2">
          <Card padding="lg" className="h-full">
            <form
              className="space-y-4"
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
              <Button type="submit" className="w-full sm:w-auto" rightIcon={<Send className="h-4 w-4" />}>
                Send message
              </Button>
            </form>
          </Card>
          </ScrollReveal>
        </div>
      </Container>
    </>
  )
}
