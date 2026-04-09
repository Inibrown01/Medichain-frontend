import { apiBaseUrl } from './chainConfig'

export const MANUFACTURER_JWT_KEY = 'medichain_manufacturer_jwt'
export const MANUFACTURER_PROFILE_KEY = 'medichain_manufacturer_profile'

export type ManufacturerProfile = { companyName: string; email: string }

export function getManufacturerToken(): string | null {
  if (typeof localStorage === 'undefined') return null
  return localStorage.getItem(MANUFACTURER_JWT_KEY)
}

export function setManufacturerSession(data: { token: string; companyName: string; email: string }) {
  localStorage.setItem(MANUFACTURER_JWT_KEY, data.token)
  localStorage.setItem(MANUFACTURER_PROFILE_KEY, JSON.stringify({ companyName: data.companyName, email: data.email }))
}

export function clearManufacturerSession() {
  localStorage.removeItem(MANUFACTURER_JWT_KEY)
  localStorage.removeItem(MANUFACTURER_PROFILE_KEY)
}

export function getManufacturerProfile(): ManufacturerProfile | null {
  const raw = localStorage.getItem(MANUFACTURER_PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as ManufacturerProfile
  } catch {
    return null
  }
}

function assertBase() {
  const base = apiBaseUrl || ''
  if (!base) throw new Error('VITE_API_URL is not set')
  return base
}

export async function manufacturerLogin(email: string, password: string) {
  const base = assertBase()
  const res = await fetch(`${base}/auth/manufacturer/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password }),
  })
  const json = (await res.json()) as { ok?: boolean; message?: string; data?: { token: string; companyName: string; email: string } }
  if (!res.ok || !json.ok || !json.data) {
    throw new Error(json.message || 'Login failed')
  }
  return json.data
}

export async function manufacturerRegister(body: { email: string; password: string; companyName: string }) {
  const base = assertBase()
  const res = await fetch(`${base}/auth/manufacturer/register`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(body),
  })
  const json = (await res.json()) as { ok?: boolean; message?: string }
  if (!res.ok || !json.ok) {
    throw new Error(json.message || 'Registration failed')
  }
}

export async function manufacturerFetch(path: string, init?: RequestInit) {
  const base = assertBase()
  const token = getManufacturerToken()
  if (!token) throw new Error('Not authenticated')
  const headers = new Headers(init?.headers)
  if (!headers.has('Authorization')) headers.set('Authorization', `Bearer ${token}`)
  if (init?.body && typeof init.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  const p = path.startsWith('/') ? path : `/${path}`
  return fetch(`${base}${p}`, { ...init, headers })
}

export type ProductApplicationDoc = {
  name: string
  mimeType?: string
  previewUrl: string
  fileName?: string
}

export type SubmitProductApplicationPayload = {
  productName: string
  category?: string
  productType?: string
  description?: string
  nafdacNumber?: string
  approvalDate?: string
  expiryDate?: string
  location?: string
  manufacturerName?: string
  thumbnailUrl?: string
  documents?: ProductApplicationDoc[]
}

export async function submitProductApplication(payload: SubmitProductApplicationPayload) {
  const res = await manufacturerFetch('/manufacturer/product-applications', {
    method: 'POST',
    body: JSON.stringify(payload),
  })
  const json = (await res.json()) as { ok?: boolean; message?: string; data?: { id: string } }
  if (!res.ok || !json.ok) {
    throw new Error(json.message || 'Submission failed')
  }
  return json.data
}

export type ListedProductApplication = {
  id: string
  productName: string
  category: string
  status: string
  nafdacNumber: string
  createdAt: string
  updatedAt: string
  thumbnailUrl: string
  productId: number | null
  registrationLabel: string
}

export async function listProductApplications(): Promise<ListedProductApplication[]> {
  const res = await manufacturerFetch('/manufacturer/product-applications')
  const json = (await res.json()) as { ok?: boolean; message?: string; data?: ListedProductApplication[] }
  if (!res.ok || !json.ok || !json.data) {
    throw new Error(json.message || 'Could not load applications')
  }
  return json.data
}

export type ManufacturerSummary = {
  companyName: string
  totalApplications: number
  pending: number
  approved: number
  rejected: number
  changesRequested: number
}

export async function fetchManufacturerSummary(): Promise<ManufacturerSummary> {
  const res = await manufacturerFetch('/manufacturer/me/summary')
  const json = (await res.json()) as { ok?: boolean; message?: string; data?: ManufacturerSummary }
  if (!res.ok || !json.ok || !json.data) {
    throw new Error(json.message || 'Could not load summary')
  }
  return json.data
}
