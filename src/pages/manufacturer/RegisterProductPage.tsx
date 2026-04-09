import { useRef, useState } from 'react'
import { MapPin, Upload } from 'lucide-react'
import { PageHeader } from '../../components/dashboard'
import { Button } from '../../components/ui/Button'
import { Card } from '../../components/ui/Card'
import { Input } from '../../components/ui/Input'
import { TextArea } from '../../components/ui/TextArea'
import { getManufacturerProfile, submitProductApplication } from '../../lib/manufacturerApi'
import { uploadPublicImage, uploadSensitiveToIpfs } from '../../lib/uploadApi'

type SlotKey = 'productImage' | 'packagingImage' | 'certificate' | 'regulatory'

type SlotState = {
  url: string
  label: string
  mimeType: string
  fileName: string
  loading: boolean
  error: string | null
}

const SLOT_LABELS: Record<SlotKey, string> = {
  productImage: 'Product Image',
  packagingImage: 'Packaging Image',
  certificate: 'Product Certificate',
  regulatory: 'Regulatory Approval',
}

export function RegisterProductPage() {
  const profile = getManufacturerProfile()
  const [productName, setProductName] = useState('')
  const [category, setCategory] = useState('Analgesics')
  const [productType, setProductType] = useState('Medicine')
  const [description, setDescription] = useState('')
  const [nafdac, setNafdac] = useState('')
  const [approval, setApproval] = useState('')
  const [expiry, setExpiry] = useState('')
  const [location, setLocation] = useState('Lagos, Nigeria')
  const [mfgName, setMfgName] = useState(profile?.companyName ?? '')

  const [slots, setSlots] = useState<Record<SlotKey, SlotState>>({
    productImage: { url: '', label: SLOT_LABELS.productImage, mimeType: '', fileName: '', loading: false, error: null },
    packagingImage: { url: '', label: SLOT_LABELS.packagingImage, mimeType: '', fileName: '', loading: false, error: null },
    certificate: { url: '', label: SLOT_LABELS.certificate, mimeType: '', fileName: '', loading: false, error: null },
    regulatory: { url: '', label: SLOT_LABELS.regulatory, mimeType: '', fileName: '', loading: false, error: null },
  })

  const [submitError, setSubmitError] = useState<string | null>(null)
  const [submitting, setSubmitting] = useState(false)
  const [savedDraft, setSavedDraft] = useState(false)

  const inputRefs = useRef<Record<SlotKey, HTMLInputElement | null>>({
    productImage: null,
    packagingImage: null,
    certificate: null,
    regulatory: null,
  })

  function setSlot(key: SlotKey, patch: Partial<SlotState>) {
    setSlots((prev) => ({ ...prev, [key]: { ...prev[key], ...patch } }))
  }

  async function handleFile(key: SlotKey, file: File) {
    setSlot(key, { loading: true, error: null })
    try {
      if (key === 'productImage' || key === 'packagingImage') {
        const data = await uploadPublicImage(file, 'medichain/products')
        setSlot(key, {
          url: data.url,
          mimeType: file.type || 'image/jpeg',
          fileName: file.name,
          loading: false,
        })
      } else {
        const data = await uploadSensitiveToIpfs(file)
        setSlot(key, {
          url: data.gatewayUrl,
          mimeType: file.type || 'application/pdf',
          fileName: file.name,
          loading: false,
        })
      }
    } catch (e) {
      setSlot(key, {
        loading: false,
        error: e instanceof Error ? e.message : 'Upload failed',
      })
    }
  }

  function buildDocuments() {
    const out: { name: string; previewUrl: string; mimeType: string; fileName: string }[] = []
    ;(Object.keys(slots) as SlotKey[]).forEach((key) => {
      const s = slots[key]
      if (s.url) {
        out.push({
          name: s.label,
          previewUrl: s.url,
          mimeType: s.mimeType,
          fileName: s.fileName,
        })
      }
    })
    return out
  }

  async function onSubmit(e: React.FormEvent) {
    e.preventDefault()
    setSubmitError(null)
    setSubmitting(true)
    try {
      const docs = buildDocuments()
      const thumb = slots.productImage.url || slots.packagingImage.url || ''
      await submitProductApplication({
        productName: productName.trim(),
        category,
        productType: productType.toUpperCase(),
        description: description.trim(),
        nafdacNumber: nafdac.trim(),
        approvalDate: approval || undefined,
        expiryDate: expiry || undefined,
        location: location.trim(),
        manufacturerName: mfgName.trim() || profile?.companyName,
        thumbnailUrl: thumb,
        documents: docs,
      })
      setSavedDraft(false)
      setSubmitError(null)
      alert('Application submitted. Your regulator will review it shortly.')
    } catch (err) {
      setSubmitError(err instanceof Error ? err.message : 'Submission failed')
    } finally {
      setSubmitting(false)
    }
  }

  function onSaveDraft() {
    try {
      const payload = {
        productName,
        category,
        productType,
        description,
        nafdac,
        approval,
        expiry,
        location,
        mfgName,
        slots,
      }
      localStorage.setItem('medichain_product_draft', JSON.stringify(payload))
      setSavedDraft(true)
    } catch {
      setSubmitError('Could not save draft locally')
    }
  }

  return (
    <>
      <PageHeader
        title="Register New Product"
        subtitle="Submit your product for regulatory approval and integrity tracking. Marketing images use Cloudinary; certificates go to IPFS."
      />

      <form onSubmit={onSubmit}>
        <Card className="rounded-3xl p-6 md:p-8">
          <div className="grid gap-8 lg:grid-cols-2">
            <div>
              <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-brand-muted">
                Company information
              </h2>
              <div className="mt-6 space-y-4">
                <Input
                  name="productName"
                  label="Product Name"
                  placeholder="e.g., Paracetamol 500mg"
                  value={productName}
                  onChange={(e) => setProductName(e.target.value)}
                  required
                />
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brand-secondary">Product Category</label>
                  <select
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-brand-secondary outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100"
                    value={category}
                    onChange={(e) => setCategory(e.target.value)}
                  >
                    <option>Analgesics</option>
                    <option>Antibiotics</option>
                    <option>Supplements</option>
                  </select>
                </div>
                <div>
                  <label className="mb-1.5 block text-sm font-semibold text-brand-secondary">Product Type</label>
                  <select
                    className="h-12 w-full rounded-xl border border-slate-200 bg-slate-50 px-3 text-sm font-medium text-brand-secondary outline-none focus:border-brand-primary focus:ring-2 focus:ring-blue-100"
                    value={productType}
                    onChange={(e) => setProductType(e.target.value)}
                  >
                    <option>Medicine</option>
                    <option>Device</option>
                  </select>
                </div>
                <TextArea
                  name="description"
                  label="Product Description"
                  placeholder="Detailed description of the product and its use cases..."
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                />
              </div>
            </div>

            <div>
              <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-brand-muted">
                Regulatory details
              </h2>
              <div className="mt-6 space-y-4">
                <Input
                  name="nafdac"
                  label="NAFDAC Registration Number"
                  placeholder="e.g., 05-1234"
                  value={nafdac}
                  onChange={(e) => setNafdac(e.target.value)}
                  required
                />
                <div className="grid gap-4 sm:grid-cols-2">
                  <Input
                    name="approval"
                    type="date"
                    label="Approval Date"
                    value={approval}
                    onChange={(e) => setApproval(e.target.value)}
                  />
                  <Input name="expiry" type="date" label="Expiry Date" value={expiry} onChange={(e) => setExpiry(e.target.value)} />
                </div>
                <Input
                  name="location"
                  label="Manufacturing Location"
                  value={location}
                  onChange={(e) => setLocation(e.target.value)}
                  leftIcon={<MapPin className="h-4 w-4" />}
                />
                <Input
                  name="mfgName"
                  label="Manufacturer Name"
                  placeholder="Enter manufacturer name"
                  value={mfgName}
                  onChange={(e) => setMfgName(e.target.value)}
                  required
                />
              </div>
            </div>
          </div>

          <div className="mt-10">
            <h2 className="border-b border-slate-200 pb-2 text-sm font-bold uppercase tracking-wide text-brand-muted">
              Document uploads
            </h2>
            <p className="mt-2 text-sm text-brand-muted">
              Product and packaging previews → Cloudinary. Certificates and regulatory files → IPFS (Pinata).
            </p>
            <div className="mt-6 grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
              {(Object.keys(SLOT_LABELS) as SlotKey[]).map((key) => {
                const s = slots[key]
                return (
                  <div key={key} className="flex flex-col">
                    <input
                      ref={(el) => {
                        inputRefs.current[key] = el
                      }}
                      type="file"
                      className="hidden"
                      accept={key === 'productImage' || key === 'packagingImage' ? 'image/*' : 'application/pdf,image/*'}
                      onChange={(ev) => {
                        const f = ev.target.files?.[0]
                        if (f) void handleFile(key, f)
                        ev.target.value = ''
                      }}
                    />
                    <button
                      type="button"
                      disabled={s.loading}
                      onClick={() => inputRefs.current[key]?.click()}
                      className="flex min-h-[120px] flex-col items-center justify-center gap-2 rounded-2xl border-2 border-dashed border-slate-200 bg-slate-50 px-3 py-4 text-center transition-colors hover:border-brand-primary/40 disabled:opacity-60"
                    >
                      <Upload className="h-6 w-6 text-brand-primary" />
                      <span className="text-xs font-semibold text-brand-secondary">{SLOT_LABELS[key]}</span>
                      <span className="text-[11px] font-medium text-brand-muted">
                        {s.loading ? 'Uploading…' : s.url ? 'Uploaded ✓' : 'Click to upload'}
                      </span>
                    </button>
                    {s.error ? <p className="mt-1 text-[11px] text-red-600">{s.error}</p> : null}
                  </div>
                )
              })}
            </div>
          </div>

          {submitError ? (
            <p className="mt-6 rounded-xl border border-red-200 bg-red-50 px-3 py-2 text-sm text-red-800">{submitError}</p>
          ) : null}
          {savedDraft ? (
            <p className="mt-4 text-sm text-green-700">Draft saved in this browser.</p>
          ) : null}

          <div className="mt-10 flex flex-wrap justify-end gap-3">
            <Button type="button" variant="secondary" size="lg" className="rounded-xl" onClick={onSaveDraft}>
              Save as Draft
            </Button>
            <Button type="submit" size="lg" className="rounded-xl" disabled={submitting}>
              {submitting ? 'Submitting…' : 'Submit Product Approval'}
            </Button>
          </div>
        </Card>
      </form>
    </>
  )
}
