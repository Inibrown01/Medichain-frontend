import { useEffect, useState } from 'react'
import { useParams, Link } from 'react-router-dom'
import { ArrowLeft, Download, Share2, ShieldCheck } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { AnimatedCounter } from '../components/motion/AnimatedCounter'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Badge } from '../components/ui/Badge'
import { Card } from '../components/ui/Card'
import { fetchRegistryManufacturers, fetchRegistryProducts } from '../lib/publicApi'

function initials(name: string) {
  const parts = name.trim().split(/\s+/).slice(0, 2)
  return parts.map((p) => p[0]?.toUpperCase() ?? '').join('') || 'M'
}

export function ManufacturerProfilePage() {
  const { slug } = useParams()
  const [name, setName] = useState<string | null>(null)
  const [productCount, setProductCount] = useState(0)
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    if (!slug) return
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const list = await fetchRegistryManufacturers()
        const m = list.find((x) => x.slug === slug)
        if (!m) {
          if (!cancelled) {
            setName(null)
            setProductCount(0)
            setError('Manufacturer not found in registry.')
          }
          return
        }
        const products = await fetchRegistryProducts(m.name)
        const count =
          products.filter((p) => p.manufacturer.toLowerCase() === m.name.toLowerCase()).length || m.productCount
        if (!cancelled) {
          setName(m.name)
          setProductCount(count)
        }
      } catch (e) {
        if (!cancelled) {
          setError(e instanceof Error ? e.message : 'Failed to load')
          setName(null)
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [slug])

  if (loading) {
    return (
      <Container className="py-20">
        <p className="text-center text-sm text-brand-muted">Loading manufacturer…</p>
      </Container>
    )
  }

  if (error || !name) {
    return (
      <Container className="py-20">
        <Link to="/manufacturers" className="text-sm font-semibold text-brand-primary">
          ← Back to manufacturers
        </Link>
        <p className="mt-6 text-center text-sm text-red-700">{error || 'Not found.'}</p>
      </Container>
    )
  }

  return (
    <>
      <ScrollReveal as="section" className="bg-brand-navy pb-24 pt-10 text-white" direction="none" scale>
        <Container>
          <Link
            to="/manufacturers"
            className="inline-flex items-center gap-2 text-sm text-slate-300 hover:text-white"
          >
            <ArrowLeft className="h-4 w-4" />
            Back to manufacturers
          </Link>
          <div className="mt-8 flex flex-col gap-8 md:flex-row md:items-start">
            <div className="relative">
              <div className="flex h-32 w-32 items-center justify-center rounded-3xl bg-white text-2xl font-bold text-brand-primary">
                {initials(name)}
              </div>
              <span className="absolute -bottom-2 -right-2 flex h-10 w-10 items-center justify-center rounded-full bg-emerald-500 text-white shadow-lg">
                <ShieldCheck className="h-5 w-5" />
              </span>
            </div>
            <div className="min-w-0 flex-1">
              <Badge variant="success" className="mb-3">
                Registry listing
              </Badge>
              <h1 className="font-serif text-4xl font-semibold">{name}</h1>
              <p className="mt-3 flex flex-wrap gap-4 text-sm text-slate-300">
                <span>Listed from on-chain registry mirror</span>
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <Button variant="primary" leftIcon={<Download className="h-4 w-4" />} disabled>
                  Certificate (when linked)
                </Button>
                <Button
                  variant="outline"
                  className="border-white/30 bg-transparent text-white hover:bg-white/10"
                  leftIcon={<Share2 className="h-4 w-4" />}
                  disabled
                >
                  Share profile
                </Button>
              </div>
            </div>
          </div>
        </Container>
      </ScrollReveal>

      <Container className="-mt-12 pb-16">
        <div className="grid gap-4 md:grid-cols-3">
          <ScrollReveal direction="up" scale>
            <Card padding="md" className="h-full">
              <p className="text-3xl font-bold text-brand-secondary">
                <AnimatedCounter
                  value={productCount}
                  formatThousands={false}
                  className="text-3xl font-bold text-brand-secondary"
                />
              </p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">
                Registered product rows
              </p>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.06} direction="up" scale>
            <Card padding="md" className="h-full">
              <p className="text-3xl font-bold text-brand-secondary">—</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">Active recalls</p>
            </Card>
          </ScrollReveal>
          <ScrollReveal delay={0.12} direction="up" scale>
            <Card padding="md" className="h-full">
              <p className="text-3xl font-bold text-brand-secondary">—</p>
              <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-brand-muted">Extra metrics</p>
            </Card>
          </ScrollReveal>
        </div>

        <div className="mt-12 grid gap-8 lg:grid-cols-3">
          <ScrollReveal direction="up" className="space-y-8 lg:col-span-2">
            <Card padding="lg">
              <h2 className="font-serif text-2xl font-semibold">Registry presence</h2>
              <p className="mt-4 text-brand-muted">
                This profile is built from public registry data. Operational details and audit packs are managed in the
                manufacturer and admin consoles.
              </p>
            </Card>
          </ScrollReveal>
          <ScrollReveal direction="up" delay={0.14}>
            <Card className="border-0 bg-brand-navy p-6 text-white">
              <h3 className="font-semibold">Trust verification</h3>
              <ul className="mt-4 space-y-3 text-sm text-slate-300">
                {['Listed in product registry', 'Traceable product IDs', 'Admin oversight'].map((x) => (
                  <li key={x} className="flex justify-between gap-2">
                    <span>{x}</span>
                    <span className="text-emerald-400">✓</span>
                  </li>
                ))}
              </ul>
              <Link
                to="/registry"
                className="mt-6 flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-brand-navy hover:bg-slate-100"
              >
                Browse registry
              </Link>
            </Card>
          </ScrollReveal>
        </div>
      </Container>
    </>
  )
}
