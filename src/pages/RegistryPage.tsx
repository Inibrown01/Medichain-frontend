import { useEffect, useMemo, useState } from 'react'
import { Search } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { ProductRow } from '../components/registry/ProductRow'
import type { VerificationStatus } from '../components/registry/StatusBadge'
import { Card } from '../components/ui/Card'
import { Link } from 'react-router-dom'
import { fetchRegistryProducts, type RegistryProductRow } from '../lib/publicApi'

function mapStatus(v: string): VerificationStatus {
  if (v === 'GENUINE') return 'verified'
  if (v === 'FLAGGED') return 'flagged'
  return 'pending'
}

function guessCategory(name: string): string {
  const n = name.toLowerCase()
  if (n.includes('amox') || n.includes('cillin')) return 'Antibiotics'
  if (n.includes('vita')) return 'Supplements'
  if (n.includes('para') || n.includes('acet')) return 'Analgesics'
  return 'Registered'
}

export function RegistryPage() {
  const [q, setQ] = useState('')
  const [submitted, setSubmitted] = useState('')
  const [rows, setRows] = useState<RegistryProductRow[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let cancelled = false
    ;(async () => {
      setLoading(true)
      setError(null)
      try {
        const data = await fetchRegistryProducts(submitted)
        if (!cancelled) setRows(data)
      } catch (e) {
        if (!cancelled) {
          setRows([])
          setError(e instanceof Error ? e.message : 'Could not load registry')
        }
      } finally {
        if (!cancelled) setLoading(false)
      }
    })()
    return () => {
      cancelled = true
    }
  }, [submitted])

  const filtered = useMemo(() => {
    const qq = q.trim().toLowerCase()
    if (!qq) return rows
    return rows.filter(
      (r) =>
        r.drugName.toLowerCase().includes(qq) ||
        r.manufacturer.toLowerCase().includes(qq) ||
        r.nafdacNumber.toLowerCase().includes(qq) ||
        r.batchNumber.toLowerCase().includes(qq) ||
        String(r.productId).includes(qq),
    )
  }, [rows, q])

  return (
    <>
      <ScrollReveal as="section" className="bg-brand-navy text-white" direction="none" scale>
        <Container className="py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            National health registry
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Verified inventory.</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Search registered products from the MediChain API (Mongo mirror of on-chain records).
          </p>
          <form
            className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row"
            onSubmit={(e) => {
              e.preventDefault()
              setSubmitted(q.trim())
            }}
          >
            <div className="relative min-w-0 flex-1">
              <Input
                leftIcon={<Search className="h-4 w-4" />}
                placeholder="Search by name, NAFDAC No, batch, product ID"
                value={q}
                onChange={(e) => setQ(e.target.value)}
                className="h-12 border-slate-600 bg-slate-900/80 text-white placeholder:text-slate-500"
              />
            </div>
            <Button type="submit" variant="primary" className="h-12 shrink-0 px-6">
              Search registry
            </Button>
          </form>
        </Container>
      </ScrollReveal>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ScrollReveal as="aside" className="space-y-6" direction="right">
            <Card padding="md">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-secondary">About this list</h2>
              <p className="mt-3 text-sm text-brand-muted">
                Data comes from your API GET /registry/products. Submit the search to query the server; optional
                client-side filtering applies to the loaded page.
              </p>
            </Card>

            <Card className="border-0 bg-brand-navy p-6 text-white">
              <h3 className="font-semibold">Manufacturer portal</h3>
              <p className="mt-2 text-sm text-slate-300">
                Register entities, upload batches, and manage attestations securely.
              </p>
              <Link
                to="/manufacturer/login"
                className="mt-4 flex h-11 w-full items-center justify-center rounded-xl bg-white text-sm font-semibold text-brand-navy transition-colors hover:bg-slate-100"
              >
                Manufacturer login
              </Link>
            </Card>
          </ScrollReveal>

          <ScrollReveal direction="up" delay={0.14} className="min-w-0">
            <div className="mb-4 hidden gap-4 border-b border-slate-200 pb-2 text-xs font-semibold uppercase tracking-wide text-brand-muted md:grid md:grid-cols-[minmax(0,1.4fr)_minmax(0,1fr)_minmax(0,0.7fr)_minmax(0,0.9fr)_minmax(0,0.7fr)]">
              <span>Product identity</span>
              <span>Manufacturer</span>
              <span>NAFDAC ID</span>
              <span>Classification</span>
              <span className="text-right">Status</span>
            </div>
            {loading ? (
              <p className="py-12 text-center text-sm text-brand-muted">Loading registry</p>
            ) : error ? (
              <p className="rounded-2xl border border-red-100 bg-red-50 px-4 py-6 text-center text-sm text-red-800">
                {error}
              </p>
            ) : filtered.length === 0 ? (
              <p className="py-12 text-center text-sm text-brand-muted">No products match your filters.</p>
            ) : (
              <div className="space-y-3">
                {filtered.map((p, i) => (
                  <ScrollReveal key={`${p.productId}-${p.batchNumber}`} delay={i * 0.04} direction="up">
                    <ProductRow
                      id={String(p.productId)}
                      name={p.drugName}
                      batch={p.batchNumber || '—'}
                      expiry="—"
                      manufacturer={p.manufacturer}
                      nafdacId={p.nafdacNumber || '—'}
                      classification={guessCategory(p.drugName)}
                      status={mapStatus(p.verificationResult)}
                    />
                  </ScrollReveal>
                ))}
              </div>
            )}
            {!loading && !error ? (
              <div className="mt-8 border-t border-slate-200 pt-6 text-sm text-brand-muted">
                Showing {filtered.length} of {rows.length} loaded {rows.length ? 'entries' : ''}
              </div>
            ) : null}
          </ScrollReveal>
        </div>
      </Container>
    </>
  )
}
