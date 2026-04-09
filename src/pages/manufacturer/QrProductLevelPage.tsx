import { useState } from 'react'
import { Clock3, Download, ExternalLink } from 'lucide-react'
import { Link } from 'react-router-dom'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'

export function QrProductLevelPage() {
  const [url, setUrl] = useState(true)
  const [meta, setMeta] = useState(true)
  const [hash, setHash] = useState(true)

  return (
    <>
      <PageHeader
        title="QR Code Generation"
        subtitle="Generate and download secure QR codes for your packaging."
        actions={
          <div className="flex flex-wrap items-center gap-3">
            <Link to="/manufacturer/qr-codes/library">
              <Button variant="secondary" size="md" className="rounded-xl" leftIcon={<Clock3 className="h-4 w-4" />}>
                QR Library
              </Button>
            </Link>
            <div className="inline-flex rounded-xl border border-slate-200 bg-slate-100 p-1">
              <Link
                to="/manufacturer/qr-codes/product-level"
                className="rounded-lg bg-white px-4 py-2 text-sm font-semibold text-brand-secondary shadow-sm"
              >
                Product Level
              </Link>
              <Link
                to="/manufacturer/qr-codes/batch-level"
                className="rounded-lg px-4 py-2 text-sm font-semibold text-brand-muted hover:text-brand-secondary"
              >
                Batch Level
              </Link>
            </div>
          </div>
        }
      />

      <div className="grid gap-4 xl:grid-cols-[minmax(0,2fr)_minmax(0,1fr)]">
        <Card className="rounded-3xl p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div className="space-y-4">
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-secondary">Select Product</label>
                <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-brand-secondary outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100">
                  <option>Paracetamol 500mg</option>
                </select>
              </div>
              <div>
                <label className="mb-1.5 block text-sm font-semibold text-brand-secondary">QR Code Format</label>
                <select className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-brand-secondary outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100">
                  <option>PNG (High Quality)</option>
                </select>
              </div>
              <div>
                <p className="mb-2 text-sm font-semibold text-brand-secondary">Include in QR</p>
                <label className="flex items-center gap-2 py-1 text-sm font-medium text-brand-secondary">
                  <input
                    type="checkbox"
                    checked={url}
                    onChange={() => setUrl(!url)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-primary"
                  />
                  Verification URL
                </label>
                <label className="flex items-center gap-2 py-1 text-sm font-medium text-brand-secondary">
                  <input
                    type="checkbox"
                    checked={meta}
                    onChange={() => setMeta(!meta)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-primary"
                  />
                  Product Metadata
                </label>
                <label className="flex items-center gap-2 py-1 text-sm font-medium text-brand-secondary">
                  <input
                    type="checkbox"
                    checked={hash}
                    onChange={() => setHash(!hash)}
                    className="h-4 w-4 rounded border-slate-300 text-brand-primary"
                  />
                  Batch Integrity Hash
                </label>
              </div>
              <Button size="lg" className="w-full rounded-xl">
                Generate QR Code
              </Button>
            </div>

            <div className="flex flex-col items-center justify-center rounded-2xl border-2 border-dashed border-blue-200 bg-slate-50/80 p-6">
              <div className="grid h-40 w-40 place-items-center rounded-xl bg-white ring-1 ring-slate-200">
                <div className="h-32 w-32 bg-[repeating-linear-gradient(0deg,#000_0,#000_2px,transparent_2px,transparent_4px),repeating-linear-gradient(90deg,#000_0,#000_2px,transparent_2px,transparent_4px)] opacity-80" />
              </div>
              <p className="mt-4 text-sm font-bold text-brand-secondary">Preview QR Code</p>
              <p className="mt-1 text-center text-xs font-medium text-brand-muted">
                This is a sample of how your codes will look.
              </p>
              <Button variant="secondary" size="md" className="mt-6 rounded-xl" leftIcon={<Download className="h-4 w-4" />}>
                Download
              </Button>
            </div>
          </div>
        </Card>

        <Card className="h-fit rounded-3xl p-6">
          <h3 className="text-lg font-bold text-brand-secondary">Packaging Guidelines</h3>
          <ul className="mt-4 space-y-4 text-sm font-medium text-brand-muted">
            <li>
              <span className="font-bold text-brand-secondary">Minimum Size:</span> 1.5cm x 1.5cm.
            </li>
            <li>
              <span className="font-bold text-brand-secondary">High Contrast:</span> Black codes on white backgrounds.
            </li>
            <li>
              <span className="font-bold text-brand-secondary">Quiet Zone:</span> 4mm margin.
            </li>
            <li>
              <span className="font-bold text-brand-secondary">Placement:</span> Avoid curved surfaces or folds.
            </li>
          </ul>
          <button type="button" className="mt-6 inline-flex items-center gap-2 text-sm font-bold text-brand-primary">
            View Full Guide
            <ExternalLink className="h-4 w-4" />
          </button>
        </Card>
      </div>
    </>
  )
}
