import { Mail, MapPin, Phone, Clock, ShieldCheck } from 'lucide-react'
import { Container } from '../layout/Container'

const contactCards = [
  {
    icon: Mail,
    label: 'Email support',
    value: 'support@mdchainng.gov.ng',
    hint: 'For general inquiries and technical help.',
    iconWrap: 'bg-sky-100 text-[#2563EB]',
  },
  {
    icon: Phone,
    label: 'National hotline',
    value: '0800-MDCHAIN-VERIFY',
    hint: 'Available 24/7 for urgent verification issues.',
    iconWrap: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: MapPin,
    label: 'Headquarters',
    value: 'National Health Registry, Abuja',
    hint: 'Federal Capital Territory, Nigeria.',
    iconWrap: 'bg-emerald-100 text-emerald-600',
  },
  {
    icon: Clock,
    label: 'Response time',
    value: 'Under 24 Hours',
    hint: 'Our team monitors channels around the clock.',
    iconWrap: 'bg-amber-100 text-amber-500',
  },
] as const

export function ContactPageHero() {
  return (
    <div className="relative bg-[#0A1120] text-white">
      <div className="relative pt-24 pb-16 sm:pt-28 sm:pb-20 md:pt-32 md:pb-24 lg:pb-28">
        <Container>
          <div className="grid gap-10 lg:grid-cols-12 lg:gap-12 lg:items-start">
            <div className="max-w-2xl lg:col-span-7">
              <span className="inline-flex rounded-full border border-sky-400/35 bg-sky-500/10 px-3 py-1 font-sans text-[11px] font-bold uppercase tracking-[0.14em] text-sky-200">
                Direct channel
              </span>
              <h1 className="mt-6 font-sans text-[clamp(2.25rem,4.5vw+1rem,3.75rem)] font-bold leading-[1.08] tracking-tight text-white">
                Connect{' '}
                <span className="font-serif text-[1.05em] font-normal italic text-[#B8C5D6]">Directly.</span>
              </h1>
              <p className="mt-6 max-w-xl text-base leading-relaxed text-slate-400 md:text-lg">
                Our specialized response teams are standing by to assist with verification, compliance, and public
                safety reports.
              </p>
            </div>

            <div className="flex flex-col gap-5 border-t border-white/10 pt-10 lg:col-span-5 lg:border-l lg:border-t-0 lg:pl-10 lg:pt-2">
              <div className="flex items-center gap-2 text-emerald-400">
                <span className="inline-flex h-9 w-9 items-center justify-center rounded-full bg-emerald-500/15">
                  <ShieldCheck className="h-5 w-5" strokeWidth={2} aria-hidden />
                </span>
                <span className="font-sans text-[11px] font-bold uppercase tracking-[0.14em]">
                  Encrypted channel
                </span>
              </div>
              <p className="text-sm leading-relaxed text-slate-400 md:text-[15px]">
                All communications are secured via national healthcare protocols and end-to-end encryption.
              </p>
            </div>
          </div>
        </Container>
      </div>

      <div className="relative z-10 mx-auto w-full max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="-mt-14 grid gap-4 sm:grid-cols-2 sm:-mt-16 xl:grid-cols-4 xl:-mt-20 xl:gap-5">
          {contactCards.map(({ icon: Icon, label, value, hint, iconWrap }) => (
            <div
              key={label}
              className="rounded-[22px] border border-slate-100/90 bg-white p-6 shadow-[0_20px_50px_-12px_rgba(15,23,42,0.18)] sm:p-7"
            >
              <span className={`inline-flex h-12 w-12 items-center justify-center rounded-full ${iconWrap}`}>
                <Icon className="h-6 w-6" strokeWidth={1.75} aria-hidden />
              </span>
              <p className="mt-5 text-[11px] font-bold uppercase tracking-[0.12em] text-[#64748B]">{label}</p>
              <p className="mt-2 text-[15px] font-bold leading-snug text-[#0F172A] md:text-base">{value}</p>
              <p className="mt-2 text-sm leading-relaxed text-[#64748B]">{hint}</p>
            </div>
          ))}
        </div>
      </div>

      <div className="h-10 sm:h-14 xl:h-16" aria-hidden />
    </div>
  )
}
