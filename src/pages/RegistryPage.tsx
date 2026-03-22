import { Search } from 'lucide-react'
import { Container } from '../components/layout/Container'
import { ScrollReveal } from '../components/motion/ScrollReveal'
import { Button } from '../components/ui/Button'
import { Input } from '../components/ui/Input'
import { ProductRow } from '../components/registry/ProductRow'
import { Card } from '../components/ui/Card'
import { Link } from 'react-router-dom'

const sampleProducts = [
  {
    id: 'amx-500',
    name: 'Amoxicillin 500mg',
    batch: 'EMZ-001',
    expiry: '2026-12-31',
    manufacturer: 'Emzor Pharmaceuticals',
    nafdacId: 'A4-1234',
    classification: 'Antibiotics',
    status: 'verified' as const,
  },
  {
    id: 'para-500',
    name: 'Paracetamol 500mg',
    batch: 'EMZ-882',
    expiry: '2027-03-01',
    manufacturer: 'Emzor Pharmaceuticals',
    nafdacId: 'A4-2231',
    classification: 'Pain relief',
    status: 'verified' as const,
  },
  {
    id: 'vit-d',
    name: 'Vitamin D3 1000IU',
    batch: 'UNK-009',
    expiry: '2025-08-15',
    manufacturer: 'Unknown Labs',
    nafdacId: 'XX-0001',
    classification: 'Supplements',
    status: 'flagged' as const,
  },
]

const categories = [
  { id: 'all', label: 'All categories', count: 128 },
  { id: 'ab', label: 'Antibiotics', count: 42 },
  { id: 'pain', label: 'Pain relief', count: 31 },
  { id: 'vit', label: 'Vitamins', count: 18 },
] as const

const statuses = [
  { id: 'all', label: 'All status', count: 128 },
  { id: 'ok', label: 'Verified authentic', count: 120 },
  { id: 'bad', label: 'Flagged / recalled', count: 8 },
] as const

export function RegistryPage() {
  return (
    <>
      <ScrollReveal as="section" className="bg-brand-navy text-white" direction="none" scale>
        <Container className="py-14 md:py-20">
          <p className="text-xs font-semibold uppercase tracking-widest text-slate-400">
            National health registry · <span className="text-emerald-400">Updated 2h ago</span>
          </p>
          <h1 className="mt-4 font-serif text-4xl font-semibold md:text-5xl">Verified inventory.</h1>
          <p className="mt-4 max-w-2xl text-slate-300">
            Search registered products, manufacturers, and batch intelligence backed by NAFDAC-aligned
            records.
          </p>
          <div className="mt-8 flex max-w-3xl flex-col gap-3 sm:flex-row">
            <div className="relative min-w-0 flex-1">
              <Input
                leftIcon={<Search className="h-4 w-4" />}
                placeholder="Search by name, NAFDAC No, ID..."
                className="h-12 border-slate-600 bg-slate-900/80 text-white placeholder:text-slate-500"
              />
            </div>
            <Button variant="primary" className="h-12 shrink-0 px-6">
              Report discrepancy
            </Button>
          </div>
        </Container>
      </ScrollReveal>

      <Container className="py-10">
        <div className="grid gap-8 lg:grid-cols-[280px_minmax(0,1fr)]">
          <ScrollReveal as="aside" className="space-y-6" direction="right">
            <Card padding="md">
              <h2 className="text-sm font-bold uppercase tracking-wide text-brand-secondary">
                Filter results
              </h2>
              <div className="mt-4 space-y-2">
                {categories.map((c) => (
                  <button
                    key={c.id}
                    type="button"
                    className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                      c.id === 'all'
                        ? 'bg-brand-navy font-semibold text-white'
                        : 'text-brand-muted hover:bg-slate-50'
                    }`}
                  >
                    <span>{c.label}</span>
                    <span className="text-xs opacity-80">{c.count}</span>
                  </button>
                ))}
              </div>
              <div className="mt-6 border-t border-slate-100 pt-4">
                <p className="text-xs font-bold uppercase tracking-wide text-brand-secondary">
                  Verification status
                </p>
                <div className="mt-3 space-y-2">
                  {statuses.map((s) => (
                    <button
                      key={s.id}
                      type="button"
                      className={`flex w-full items-center justify-between rounded-xl px-3 py-2 text-left text-sm ${
                        s.id === 'all'
                          ? 'bg-brand-navy font-semibold text-white'
                          : 'text-brand-muted hover:bg-slate-50'
                      }`}
                    >
                      <span>{s.label}</span>
                      <span className="text-xs opacity-80">{s.count}</span>
                    </button>
                  ))}
                </div>
              </div>
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
                Register entity
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
            <div className="space-y-3">
              {sampleProducts.map((p, i) => (
                <ScrollReveal key={p.id} delay={i * 0.11} direction="up">
                  <ProductRow {...p} />
                </ScrollReveal>
              ))}
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-slate-200 pt-6 text-sm text-brand-muted sm:flex-row sm:items-center sm:justify-between">
              <p>Showing {sampleProducts.length} of {sampleProducts.length} entries</p>
              <div className="flex gap-1">
                {[1, 2, 3, '…', 12].map((p, i) => (
                  <button
                    key={i}
                    type="button"
                    className={`h-9 min-w-9 rounded-lg px-2 text-sm font-medium ${
                      p === 1 ? 'bg-brand-navy text-white' : 'bg-slate-100 text-brand-secondary hover:bg-slate-200'
                    }`}
                  >
                    {p}
                  </button>
                ))}
              </div>
            </div>
          </ScrollReveal>
        </div>
      </Container>
    </>
  )
}
