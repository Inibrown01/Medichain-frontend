import { useEffect, useMemo, useState } from 'react'
import { MapPin } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { AnimatedCounter } from '../components/motion/AnimatedCounter'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Input } from '../components/ui/Input'
import { ManufacturerCard } from '../components/manufacturers/ManufacturerCard'
import { Link } from 'react-router-dom'
import { fetchRegistryManufacturers, type RegistryManufacturerRow } from '../lib/publicApi'

export function ManufacturersPage() {
  const [q, setQ] = useState('')
  const [rows, setRows] = useState<RegistryManufacturerRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchRegistryManufacturers()
        if (!cancelled) setRows(data)
      } catch (e) {
        if (!cancelled) {
          setRows([])
          setError(e instanceof Error ? e.message : 'Could not load manufacturers')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    if (!qq) return rows
    return rows.filter((m) => m.name.toLowerCase().includes(qq))
  }, [rows, q])

  const totalProducts = rows.reduce((s, m) => s + (m.productCount || 0), 0)

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
              Manufacturers are derived from registered products in the MediChain registry (live API data).
            </p>
          </div>
          <div className="rounded-3xl border border-white/20 bg-white/5 p-8 backdrop-blur-sm">
            <div className="grid grid-cols-2 gap-6">
              <div>
                <p className="font-serif text-4xl font-semibold">
                  {loading ?
                    <span className="text-slate-400">—</span>
                  : <AnimatedCounter
                      value={rows.length}
                      suffix=""
                      formatThousands={false}
                      className="font-serif text-4xl font-semibold"
                    />
                  }
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Manufacturers listed
                </p>
              </div>
              <div>
                <p className="font-serif text-4xl font-semibold">
                  {loading ?
                    <span className="text-slate-400">—</span>
                  : <AnimatedCounter
                      value={totalProducts}
                      suffix=""
                      formatThousands
                      className="font-serif text-4xl font-semibold"
                    />
                  }
                </p>
                <p className="mt-1 text-xs font-semibold uppercase tracking-wide text-slate-400">
                  Registered product rows
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
              placeholder="Filter by manufacturer name…"
              value={q}
              onChange={(e) => setQ(e.target.value)}
            />
            <button
              type="button"
              className="flex h-14 shrink-0 items-center justify-center gap-2 rounded-2xl border border-slate-200 bg-white px-4 text-sm font-semibold text-brand-secondary hover:bg-slate-50"
            >
              <MapPin className="h-4 w-4 text-brand-primary" />
              Registry
              <span className="text-slate-400">▾</span>
            </button>
          </div>
        </ScrollReveal>

        {error ?
          <p className="mt-8 rounded-2xl border border-red-100 bg-red-50 px-4 py-6 text-center text-sm text-red-800">
            {error}
          </p>
        : loading ?
          <p className="mt-12 text-center text-sm text-brand-muted">Loading manufacturers…</p>
        : filtered.length === 0 ?
          <p className="mt-12 text-center text-sm text-brand-muted">No manufacturers in the registry yet.</p>
        : <div className="mt-12 grid gap-6 sm:grid-cols-2 xl:grid-cols-4">
            {filtered.map((m, i) => (
              <ScrollReveal key={m.slug} delay={i * 0.06} direction="up" scale>
                <ManufacturerCard
                  slug={m.slug}
                  name={m.name}
                  location="—"
                  products={m.productCount}
                  certifiedYear={null}
                />
              </ScrollReveal>
            ))}
          </div>
        }

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
              className="inline-flex h-12 items-center justify-center rounded-2xl bg-white px-8 text-sm font-bold text-brand-navy"
            >
              Contact us
            </Link>
            <Link
              to="/manufacturer/login"
              className="inline-flex h-12 items-center justify-center rounded-2xl border border-white/30 px-8 text-sm font-bold text-white hover:bg-white/10"
            >
              Manufacturer login
            </Link>
          </div>
        </ScrollReveal>
      </Container>
    </>
  )
}
