import { useEffect, useState } from 'react'
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
import { fetchVerifyDrug, type VerifyDrugResponse } from '../lib/publicApi'

function parseProductId(raw: string | undefined): number | null {
  if (!raw) return null
  const n = Number(raw)
  if (!Number.isFinite(n) || n <= 0) return null
  return n
}

export function VerifyPage() {
  const { productId: rawId } = useParams()
  const idNum = parseProductId(rawId)
  const [data, setData] = useState<VerifyDrugResponse | null>(null)
  const [loading, setLoading] = useState(Boolean(idNum))
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!idNum) {
      setLoading(false)
      setData(null)
      setError(null)
      return
    }
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const d = await fetchVerifyDrug(idNum)
        if (!cancelled) setData(d)
      } catch (e) {
        if (!cancelled) {
          setData(null)
          setError(e instanceof Error ? e.message : 'Verification failed')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [idNum])

  const result = data?.verificationResult
  const genuine = result === 'GENUINE'
  const notReg = result === 'NOT_REGISTERED'

  if (!idNum) {
    return (
      <Container className="py-20">
        <p className="text-center text-lg font-semibold text-brand-secondary">Verify a product</p>
        <p className="mt-2 text-center text-sm text-brand-muted">
          Open a verification link with a product ID, e.g.{' '}
          <Link className="font-semibold text-brand-primary" to="/verify/1">
            /verify/1
          </Link>
          , or scan a QR code from packaging.
        </p>
      </Container>
    )
  }

  if (loading) {
    return (
      <Container className="py-20">
        <p className="text-center text-sm text-brand-muted">Checking registry…</p>
      </Container>
    )
  }

  if (error && !data) {
    return (
      <Container className="py-20">
        <p className="text-center text-lg font-semibold text-red-700">Verification unavailable</p>
        <p className="mt-2 text-center text-sm text-brand-muted">{error}</p>
        <p className="mt-4 text-center text-xs text-brand-muted">Ensure `VITE_API_URL` points at your MediChain API.</p>
      </Container>
    )
  }

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
            <span
              className={`rounded-full px-3 py-1 font-sans text-[0.75rem] font-bold uppercase tracking-[0.07em] text-white ${
                genuine ? 'bg-emerald-500' : notReg ? 'bg-slate-500' : 'bg-amber-500'
              }`}
            >
              {genuine ? 'Authenticity confirmed' : notReg ? 'Not registered' : 'Flagged / review'}
            </span>
            <span className="hidden h-4 w-px bg-white/20 sm:block" aria-hidden />
            <span className="font-sans text-sm font-medium text-slate-400">
              {data?.batchNumber ? `Batch ${data.batchNumber}` : 'Registry'}
            </span>
          </div>

          <h1 className="mt-6 max-w-4xl font-serif text-4xl font-semibold tracking-tight md:text-5xl">
            {data?.drugName || 'Product'}
          </h1>
          <p className="mt-4 font-serif text-lg italic text-white/90 md:text-xl">
            {data?.manufacturer ? (
              <>
                Registry entry — <strong className="font-sans font-bold not-italic">{data.manufacturer}</strong>
              </>
            ) : (
              'No manufacturer data on record.'
            )}
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
                    { icon: Building2, label: 'Manufacturer', value: data?.manufacturer || '—' },
                    { icon: Hash, label: 'NAFDAC registration', value: data?.nafDacNumber || '—' },
                    { icon: Hash, label: 'Batch number', value: data?.batchNumber || '—' },
                    { icon: Calendar, label: 'On-chain record', value: data?.createdAt ? new Date(data.createdAt * 1000).toLocaleDateString() : '—' },
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
                  {data?.ipfsCid
                    ? `Supporting documents may be referenced on IPFS (CID: ${data.ipfsCid.slice(0, 18)}…).`
                    : 'No IPFS document CID linked for this on-chain record.'}
                </p>
              </div>
            </ScrollReveal>

            <ScrollReveal direction="up" delay={0.2}>
              <div>
                <h2 className="mc-section-label">Safety protocol</h2>
                <p className="mt-3 text-sm text-brand-muted">
                  Always follow prescriber guidance. Report suspected falsified medicines to NAFDAC and through this platform.
                </p>
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
                  {genuine ? '✓' : '!'}
                </span>
                <h3 className="font-sans text-2xl font-bold">
                  {genuine ? 'Verified' : notReg ? 'Not in registry' : 'Needs attention'}
                </h3>
              </div>
              <p className="relative mt-4 font-sans text-sm leading-6 text-slate-300">
                {genuine
                  ? 'This product ID matches a registered on-chain record.'
                  : notReg
                    ? 'This product ID is not in the MediChain registry.'
                    : 'This record is flagged for regulatory review.'}
              </p>
              {data?.ipfsCid ? (
                <div className="relative mt-6">
                  <p className="mc-section-label text-slate-500">IPFS CID</p>
                  <div className="mt-2 rounded-xl bg-black/40 p-3 font-mono text-xs leading-relaxed tracking-tight text-slate-200 ring-1 ring-white/10">
                    {data.ipfsCid}
                  </div>
                </div>
              ) : null}
              <Button className="relative mt-6 h-14 w-full text-base font-semibold" variant="success" disabled>
                Digital certificate (when linked)
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
