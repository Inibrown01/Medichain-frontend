import { apiBaseUrl } from './chainConfig'

function base() {
  const b = apiBaseUrl || ''
  if (!b) throw new Error('VITE_API_URL is not set')
  return b
}

export type RegistryProductRow = {
  productId: number
  drugName: string
  manufacturer: string
  nafdacNumber: string
  batchNumber: string
  verificationResult: string
  ipfsCid: string
}

export async function fetchRegistryProducts(q?: string): Promise<RegistryProductRow[]> {
  const qs = q?.trim() ? `?q=${encodeURIComponent(q.trim())}` : ''
  const res = await fetch(`${base()}/registry/products${qs}`)
  const json = (await res.json()) as { ok?: boolean; data?: RegistryProductRow[]; message?: string }
  if (!res.ok || !json.ok || !Array.isArray(json.data)) throw new Error(json.message || 'Failed to load registry')
  return json.data
}

export type RegistryManufacturerRow = {
  slug: string
  name: string
  productCount: number
}

export async function fetchRegistryManufacturers(): Promise<RegistryManufacturerRow[]> {
  const res = await fetch(`${base()}/registry/manufacturers`)
  const json = (await res.json()) as { ok?: boolean; data?: RegistryManufacturerRow[]; message?: string }
  if (!res.ok || !json.ok || !Array.isArray(json.data)) throw new Error(json.message || 'Failed to load manufacturers')
  return json.data
}

export type VerifyDrugResponse = {
  productId: number
  verificationResult: string
  drugName?: string
  manufacturer?: string
  nafDacNumber?: string
  batchNumber?: string
  ipfsCid?: string
  createdAt?: number
  statusNumber?: number
  duplicateCount?: number
}

export async function fetchVerifyDrug(productId: number): Promise<VerifyDrugResponse> {
  const res = await fetch(`${base()}/verify-drug/${productId}`)
  const json = (await res.json()) as { ok?: boolean; data?: VerifyDrugResponse; message?: string }
  if (json?.ok && json.data) return json.data
  throw new Error(json.message || 'Verification failed')
}
