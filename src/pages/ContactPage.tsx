import {
  Activity,
  Building2,
  ChevronRight,
  Globe,
  Headphones,
  MapPin,
  MessageSquare,
  Send,
  ShieldAlert,
  Sparkles,
} from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { ContactPageHero } from '../components/contact/ContactPageHero'
import { useState } from 'react'
import { cn } from '../lib/cn'

const departments = [
  {
    id: 'general' as const,
    label: 'General Support',
    Icon: MessageSquare,
    badge: 'General inquiry',
    formTitle: 'Send a Message.',
  },
  {
    id: 'counterfeit' as const,
    label: 'Report Counterfeit',
    Icon: ShieldAlert,
    badge: 'Counterfeit report',
    formTitle: 'Report a suspicious product.',
  },
  {
    id: 'mfg' as const,
    label: 'Manufacturer Inquiry',
    Icon: Building2,
    badge: 'Manufacturer inquiry',
    formTitle: 'Partner with the registry.',
  },
]

type DeptId = (typeof departments)[number]['id']

const fieldClass =
  'h-12 w-full rounded-lg border border-transparent bg-[#F1F5F9] px-4 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-[box-shadow,border-color] focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/20'

const labelClass = 'mb-2 block text-[11px] font-bold uppercase tracking-[0.1em] text-[#64748B]'

const textareaClass =
  'min-h-[160px] w-full resize-y rounded-lg border border-transparent bg-[#F1F5F9] px-4 py-3 text-sm text-[#0F172A] placeholder:text-slate-400 outline-none transition-[box-shadow,border-color] focus:border-[#2563EB]/40 focus:ring-2 focus:ring-[#2563EB]/20'

export function ContactPage() {
  const [dept, setDept] = useState<DeptId>('general')
  const active = departments.find((d) => d.id === dept)!

  return (
    <>
      <ContactPageHero />

      <section id="contact-form" className="scroll-mt-24 bg-[#F8F9FB] py-14 md:scroll-mt-28 md:py-20 lg:py-24">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-14 xl:gap-16">
            <ScrollReveal direction="up" className="lg:col-span-4">
              <h2 className="font-sans text-2xl font-bold tracking-tight text-[#0F172A] md:text-[1.75rem]">
                Select <span className="font-serif font-normal italic">Department.</span>
              </h2>
              <p className="mt-3 max-w-sm text-sm leading-relaxed text-[#64748B] md:text-[15px]">
                Choose the relevant department to ensure your inquiry reaches the right experts.
              </p>

              <div className="mt-8 space-y-3">
                {departments.map((d) => {
                  const selected = dept === d.id
                  return (
                    <button
                      key={d.id}
                      type="button"
                      aria-pressed={selected}
                      onClick={() => setDept(d.id)}
                      className={cn(
                        'flex w-full items-center gap-3.5 rounded-[18px] border px-4 py-3.5 text-left transition-all',
                        selected
                          ? 'border-[#0F172A] bg-[#0F172A] text-white shadow-lg shadow-slate-900/15'
                          : 'border-[#E2E8F0] bg-white text-[#64748B] shadow-sm hover:border-slate-300',
                      )}
                    >
                      <span
                        className={cn(
                          'flex h-11 w-11 shrink-0 items-center justify-center rounded-xl',
                          selected ? 'bg-[#2563EB] text-white' : 'bg-sky-50 text-slate-500',
                        )}
                      >
                        <d.Icon className="h-5 w-5" strokeWidth={1.85} aria-hidden />
                      </span>
                      <span className={cn('min-w-0 flex-1 text-[15px] font-semibold', selected && 'text-white')}>
                        {d.label}
                      </span>
                      <ChevronRight
                        className={cn('h-5 w-5 shrink-0', selected ? 'text-white/90' : 'text-slate-300')}
                        aria-hidden
                      />
                    </button>
                  )
                })}
              </div>

              <div className="mt-10 rounded-[20px] border border-sky-200/80 bg-sky-50/90 p-6 shadow-sm">
                <div className="flex h-11 w-11 items-center justify-center rounded-xl border border-sky-200/60 bg-white text-[#2563EB]">
                  <Headphones className="h-5 w-5" strokeWidth={1.75} aria-hidden />
                </div>
                <h3 className="mt-4 text-base font-bold text-[#0F172A]">Need Immediate Help?</h3>
                <p className="mt-2 text-sm leading-relaxed text-[#64748B]">
                  Our live chat agents are available Monday to Friday, 8am - 6pm WAT for real-time verification
                  assistance.
                </p>
                <Button
                  variant="outline"
                  type="button"
                  className="mt-5 h-11 w-full rounded-xl border-[#BFDBFE] bg-white text-sm font-semibold text-[#2563EB] hover:bg-sky-50/80"
                >
                  Launch Live Chat
                </Button>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.08} className="lg:col-span-8">
              <div className="rounded-[24px] border border-[#E2E8F0] bg-white p-6 shadow-[0_24px_60px_-15px_rgba(15,23,42,0.12)] sm:p-8 md:p-10">
                <span className="inline-flex rounded-full bg-[#EFF6FF] px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.12em] text-[#2563EB]">
                  {active.badge}
                </span>
                <h3 className="mt-4 font-sans text-2xl font-bold tracking-tight text-[#0F172A] md:text-[1.75rem]">
                  {active.formTitle}
                </h3>

                <form
                  className="mt-8 space-y-5"
                  onSubmit={(e) => {
                    e.preventDefault()
                  }}
                >
                  <div className="grid gap-5 sm:grid-cols-2">
                    <div>
                      <label htmlFor="contact-name" className={labelClass}>
                        Full name
                      </label>
                      <input
                        id="contact-name"
                        name="name"
                        autoComplete="name"
                        placeholder="Madeleine Nkiru"
                        className={fieldClass}
                      />
                    </div>
                    <div>
                      <label htmlFor="contact-email" className={labelClass}>
                        Email address
                      </label>
                      <input
                        id="contact-email"
                        name="email"
                        type="email"
                        autoComplete="email"
                        placeholder="madeleinenkiru@gmail.com"
                        className={fieldClass}
                      />
                    </div>
                  </div>
                  <div>
                    <label htmlFor="contact-subject" className={labelClass}>
                      Subject
                    </label>
                    <input
                      id="contact-subject"
                      name="subject"
                      placeholder="How can we help?"
                      className={fieldClass}
                    />
                  </div>
                  <div>
                    <label htmlFor="contact-message" className={labelClass}>
                      Detailed message
                    </label>
                    <textarea
                      id="contact-message"
                      name="message"
                      rows={6}
                      placeholder="Provide as much detail as possible..."
                      className={textareaClass}
                    />
                  </div>
                  <Button
                    type="submit"
                    size="lg"
                    leftIcon={<Send className="h-[18px] w-[18px]" strokeWidth={2.25} aria-hidden />}
                    className="mt-2 h-[52px] w-full rounded-xl bg-[#1D4ED8] text-[15px] font-bold hover:bg-[#1e40af] focus-visible:ring-[#2563EB]/40"
                  >
                    Send Message
                  </Button>
                </form>
              </div>
            </ScrollReveal>
          </div>
        </Container>
      </section>

      <section className="bg-white py-14 md:py-20 lg:py-24">
        <Container>
          <ScrollReveal direction="up">
            <div className="relative overflow-hidden rounded-[40px] md:rounded-[48px]">
              <img
                src="https://images.unsplash.com/photo-1486406146926-c627a92ad1ab?w=1920&q=85"
                alt="National Health Registry headquarters building"
                className="aspect-[21/9] min-h-[240px] w-full object-cover sm:min-h-[280px] md:aspect-[2.4/1] md:min-h-[320px]"
                width={1920}
                height={800}
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-slate-900/50 via-slate-900/10 to-transparent md:bg-gradient-to-r md:from-slate-900/35 md:via-transparent md:to-transparent" />

              <div className="absolute bottom-4 left-4 right-4 max-w-md sm:bottom-6 sm:left-6 md:bottom-8 md:left-8 md:right-auto">
                <div className="rounded-[22px] border border-slate-100/80 bg-white p-5 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.2)] sm:p-6">
                  <div className="flex items-center gap-3">
                    <span className="flex h-10 w-10 items-center justify-center rounded-xl bg-sky-100 text-[#2563EB]">
                      <MapPin className="h-5 w-5" strokeWidth={1.85} aria-hidden />
                    </span>
                    <span className="text-lg font-bold text-[#0F172A]">Abuja HQ</span>
                  </div>
                  <p className="mt-3 text-sm leading-relaxed text-[#64748B] md:text-[15px]">
                    Plot 452, National Health Registry Building, Central Business District, Abuja, Nigeria.
                  </p>
                  <a
                    href="https://www.google.com/maps/search/?api=1&query=Plot+452+National+Health+Registry+Abuja+Nigeria"
                    target="_blank"
                    rel="noreferrer"
                    className="mt-4 inline-flex items-center gap-1.5 text-sm font-semibold text-[#2563EB] transition-colors hover:text-[#1d4ed8]"
                  >
                    Get Directions
                    <span aria-hidden>→</span>
                  </a>
                </div>
              </div>
            </div>
          </ScrollReveal>

          <div className="mt-16 grid gap-10 md:mt-20 md:grid-cols-3 md:gap-8 lg:gap-12">
            {[
              {
                icon: Globe,
                title: 'International Liaison',
                body: 'Coordinating with global health bodies for cross-border verification.',
              },
              {
                icon: Sparkles,
                title: 'Innovation Lab',
                body: 'Developing next-gen digital security for pharmaceutical products.',
              },
              {
                icon: Activity,
                title: 'Real-time Monitoring',
                body: '24/7 surveillance of national drug distribution networks.',
              },
            ].map(({ icon: Icon, title, body }, i) => (
              <ScrollReveal key={title} direction="up" delay={i * 0.06}>
                <div className="text-left">
                  <span className="inline-flex h-11 w-11 items-center justify-center rounded-xl bg-sky-100 text-[#2563EB]">
                    <Icon className="h-5 w-5" strokeWidth={1.85} aria-hidden />
                  </span>
                  <h4 className="mt-5 text-lg font-bold text-[#111827]">{title}</h4>
                  <p className="mt-2 text-sm leading-relaxed text-[#6B7280] md:text-[15px]">{body}</p>
                </div>
              </ScrollReveal>
            ))}
          </div>
        </Container>
      </section>
    </>
  )
}
