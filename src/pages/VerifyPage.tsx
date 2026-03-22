import { Link, useParams } from 'react-router-dom'
import {
  ArrowLeft,
  Building2,
  Calendar,
  Download,
  Hash,
  Share2,
  AlertTriangle,
} from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Card } from '../components/ui/Card'

const HASH =
  'e3b0c44298fc1c149afbf4c8996fb92427ae41e4649b934ca495991b7852b855'

export function VerifyPage() {
  const { productId } = useParams()
  const isSample = !productId || productId === 'amx-500'

  return (
    <>
      <ScrollReveal
        as="section"
        className="relative overflow-hidden bg-gradient-to-b from-[#0f172a] via-[#0b1221] to-[#0f172a] pb-12 pt-8 text-white md:pb-16 md:pt-10"
        direction="none"
        scale
      >
        <div
          className="pointer-events-none absolute inset-0 bg-[radial-gradient(ellipse_at_80%_0%,rgb(29,78,216,0.15),transparent_50%)]"
          aria-hidden
        />
        <Container className="relative">
          <div className="flex flex-wrap items-start justify-between gap-4">
            <Link
              to="/registry"
              className="inline-flex items-center gap-2 font-sans text-xs font-bold uppercase tracking-[0.2em] text-slate-400 transition-colors hover:text-white"
            >
              <ArrowLeft className="h-4 w-4" />
              Back
            </Link>
            <div className="flex gap-2">
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 transition-colors hover:bg-white/10"
                aria-label="Share"
              >
                <Share2 className="h-4 w-4" />
              </button>
              <button
                type="button"
                className="flex h-11 w-11 items-center justify-center rounded-xl border border-white/20 bg-white/5 transition-colors hover:bg-white/10"
                aria-label="Download"
              >
                <Download className="h-4 w-4" />
              </button>
            </div>
          </div>

          <div className="mt-8 flex flex-wrap items-center gap-3">
            <span className="rounded-full bg-emerald-500 px-3 py-1 font-sans text-[0.75rem] font-bold uppercase tracking-[0.07em] text-white">
              Authenticity confirmed
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <span className="font-sans text-sm font-medium text-slate-400">Batch verified</span>
          </div>

          <h1 className="mt-6 max-w-4xl">
            <span className="mc-product-title-sans block sm:inline">Amoxicillin </span>
            <span className="mc-product-title-serif">500mg</span>
          </h1>
          <p className="mt-4 font-serif text-lg italic text-white/90 md:text-xl">
            Antibiotics — Distributed by <strong className="font-sans font-bold not-italic">Emzor Pharmaceuticals</strong>
          </p>
        </Container>
      </ScrollReveal>

      <Container className="relative z-10 -mt-6 pb-16 md:pb-20">
        <div className="grid gap-8 lg:grid-cols-3">
          <div className="space-y-8 lg:col-span-2">
            <ScrollReveal direction="up">
            <Card padding="md" className="border-slate-100 shadow-lg">
              <div className="grid gap-4 sm:grid-cols-2">
                {[
                  { icon: Building2, label: 'Manufacturer', value: 'Emzor Pharmaceuticals' },
                  { icon: Hash, label: 'NAFDAC registration', value: 'A4-1234' },
                  { icon: Hash, label: 'Batch number', value: 'EMZ-001' },
                  { icon: Calendar, label: 'Expiry date', value: '2026-12-31' },
                ].map((item) => (
                  <div
                    key={item.label}
                    className="flex gap-3 rounded-2xl border border-slate-100 bg-slate-50/90 p-4"
                  >
                    <item.icon className="mt-0.5 h-5 w-5 shrink-0 text-brand-primary" />
                    <div>
                      <p className="mc-section-label">{item.label}</p>
                      <p className="mt-1 font-sans text-lg font-semibold text-brand-secondary">{item.value}</p>
                    </div>
                  </div>
                ))}
              </div>
            </Card>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.12}>
            <div>
              <h2 className="mc-section-label">Product intelligence</h2>
              <p className="mt-3 font-sans text-lg font-medium leading-7 text-brand-muted">
                {isSample
                  ? 'Broad-spectrum antibiotic used to treat various bacterial infections.'
                  : 'Verified metadata for this product will appear here when available.'}
              </p>
            </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
            <div>
              <h2 className="mc-section-label">Safety protocol</h2>
              <ul className="mt-4 space-y-3">
                {Array.from({ length: 4 }).map((_, i) => (
                  <li
                    key={i}
                    className="flex items-start gap-3 rounded-2xl border border-slate-100 bg-white px-4 py-3 shadow-sm"
                  >
                    <span className="mt-2 h-1.5 w-1.5 shrink-0 rounded-full bg-slate-300" aria-hidden />
                    <span className="font-sans text-sm font-medium text-brand-secondary">
                      Keep out of reach of children
                    </span>
                  </li>
                ))}
              </ul>
            </div>
            </ScrollReveal>
          </div>

          <ScrollReveal direction="up" delay={0.1} className="lg:col-span-1">
            <Card
              padding="md"
              className="mc-verify-card-glow relative border-0 bg-gradient-to-b from-[#0f172a] to-[#0b1221] text-white"
            >
              <div
                className="pointer-events-none absolute inset-x-0 top-0 h-24 rounded-t-[inherit] bg-gradient-to-b from-emerald-500/25 to-transparent"
                aria-hidden
              />
              <div className="relative flex items-center gap-3">
                <span className="flex h-12 w-12 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg shadow-emerald-500/30">
                  ✓
                </span>
                <h3 className="font-sans text-2xl font-bold">Verified Safe</h3>
              </div>
              <p className="relative mt-4 font-sans text-sm leading-6 text-slate-300">
                This product has been cross-referenced with the National Health Product Database and is
                confirmed to be authentic.
              </p>
              <div className="relative mt-6">
                <p className="mc-section-label text-slate-500">Verification hash</p>
                <div className="mt-2 rounded-xl bg-black/40 p-3 font-mono text-xs leading-relaxed tracking-tight text-slate-200 ring-1 ring-white/10">
                  {HASH}
                </div>
              </div>
              <Button className="relative mt-6 h-14 w-full text-base font-semibold" variant="success">
                Digital certificate (PDF)
              </Button>
              <button
                type="button"
                className="relative mt-5 flex w-full items-center justify-center gap-2 font-sans text-xs font-bold uppercase tracking-wider text-amber-200/90 transition-colors hover:text-amber-100"
              >
                <AlertTriangle className="h-4 w-4" aria-hidden />
                Report discrepancy
              </button>
            </Card>
          </ScrollReveal>
        </div>
      </Container>
    </>
  )
}
