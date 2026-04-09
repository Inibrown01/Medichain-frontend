export const ADMIN_JWT_KEY = 'medichain_admin_jwt'
export const ADMIN_PROFILE_KEY = 'medichain_admin_profile'
export const ADMIN_REFRESH_KEY = 'medichain_admin_refresh'

export type AdminProfile = { email: string }

export type AdminSessionOptions = {
  /** When true: store in localStorage. When false: sessionStorage (cleared when browser session ends). */
  remember?: boolean
}

export function getApiBase(): string {
  const raw = import.meta.env.VITE_API_URL as string | undefined
  return raw?.replace(/\/$/, '') || 'http://localhost:4000/api/v1'
}

function getSessionStorage(): Storage | null {
  if (typeof window === 'undefined' || typeof sessionStorage === 'undefined') return null
  return sessionStorage
}

function getLocalStorage(): Storage | null {
  if (typeof window === 'undefined' || typeof localStorage === 'undefined') return null
  return localStorage
}

/** Access token (sessionStorage first, then localStorage). */
export function getAdminToken(): string | null {
  const raw = getSessionStorage()?.getItem(ADMIN_JWT_KEY)?.trim()
  if (raw) return raw
  return getLocalStorage()?.getItem(ADMIN_JWT_KEY)?.trim() || null
}

/** Refresh token (same storage preference order). */
export function getAdminRefreshToken(): string | null {
  const raw = getSessionStorage()?.getItem(ADMIN_REFRESH_KEY)?.trim()
  if (raw) return raw
  return getLocalStorage()?.getItem(ADMIN_REFRESH_KEY)?.trim() || null
}

function decodeJwtPayloadSegment(segment: string): { exp?: number; role?: string; type?: string } | null {
  try {
    const base64 = segment.replace(/-/g, '+').replace(/_/g, '/')
    const padded = base64 + '='.repeat((4 - (base64.length % 4)) % 4)
    return JSON.parse(atob(padded)) as { exp?: number; role?: string; type?: string }
  } catch {
    return null
  }
}

function isNonExpiredJwt(token: string | null): boolean {
  if (!token) return false
  const parts = token.split('.')
  if (parts.length !== 3) return false
  const payload = decodeJwtPayloadSegment(parts[1])
  if (!payload) return false
  if (payload.exp != null && typeof payload.exp === 'number') {
    if (payload.exp * 1000 < Date.now()) return false
  }
  return true
}

/** True if access or refresh JWT exists and is not expired. */
export function isAdminSessionValid(): boolean {
  return isNonExpiredJwt(getAdminToken()) || isNonExpiredJwt(getAdminRefreshToken())
}

export function getAdminProfile(): AdminProfile | null {
  const raw =
    getSessionStorage()?.getItem(ADMIN_PROFILE_KEY) ?? getLocalStorage()?.getItem(ADMIN_PROFILE_KEY)
  if (!raw) return null
  try {
    return JSON.parse(raw) as AdminProfile
  } catch {
    return null
  }
}

/** True when admin tokens are stored in localStorage (remember-me). */
export function adminUsesRememberStorage(): boolean {
  return Boolean(getLocalStorage()?.getItem(ADMIN_JWT_KEY))
}

export function setAdminSession(
  accessToken: string,
  refreshToken: string,
  email: string,
  options?: AdminSessionOptions,
) {
  const remember = options?.remember ?? false
  clearAdminSession()
  const storage = remember ? getLocalStorage() : getSessionStorage()
  if (!storage) return
  storage.setItem(ADMIN_JWT_KEY, accessToken)
  storage.setItem(ADMIN_REFRESH_KEY, refreshToken)
  storage.setItem(ADMIN_PROFILE_KEY, JSON.stringify({ email }))
}

export function clearAdminSession() {
  getSessionStorage()?.removeItem(ADMIN_JWT_KEY)
  getSessionStorage()?.removeItem(ADMIN_REFRESH_KEY)
  getSessionStorage()?.removeItem(ADMIN_PROFILE_KEY)
  getLocalStorage()?.removeItem(ADMIN_JWT_KEY)
  getLocalStorage()?.removeItem(ADMIN_REFRESH_KEY)
  getLocalStorage()?.removeItem(ADMIN_PROFILE_KEY)
}

export async function adminLogin(email: string, password: string, options?: AdminSessionOptions) {
  const rememberMe = options?.remember ?? false
  const res = await fetch(`${getApiBase()}/auth/login`, {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ email, password, rememberMe }),
  })
  const json = (await res.json()) as {
    ok?: boolean
    message?: string
    data?: { token?: string; accessToken?: string; refreshToken?: string; email?: string }
  }
  if (!res.ok || !json.ok || !json.data) {
    throw new Error(json.message || 'Login failed')
  }
  const access = json.data.accessToken ?? json.data.token
  const refresh = json.data.refreshToken
  if (!access || !refresh) {
    throw new Error('Login response missing tokens — update the API')
  }
  const em = json.data.email?.trim() || email.trim()
  setAdminSession(access, refresh, em, { remember: rememberMe })
}

let refreshInFlight: Promise<boolean> | null = null

/**
 * Exchanges refresh token for new access + refresh. Single-flight when many requests get 401 at once.
 */
export async function refreshAdminAccess(): Promise<boolean> {
  if (refreshInFlight) return refreshInFlight

  refreshInFlight = (async () => {
    const rt = getAdminRefreshToken()
    if (!rt) return false
    try {
      const res = await fetch(`${getApiBase()}/auth/refresh`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          refreshToken: rt,
          rememberMe: adminUsesRememberStorage(),
        }),
      })
      const json = (await res.json()) as {
        ok?: boolean
        data?: { accessToken?: string; token?: string; refreshToken?: string; email?: string }
      }
      if (!res.ok || !json.ok || !json.data) return false
      const access = json.data.accessToken ?? json.data.token
      const refresh = json.data.refreshToken
      if (!access || !refresh) return false
      const email = json.data.email?.trim() || getAdminProfile()?.email || ''
      setAdminSession(access, refresh, email, { remember: adminUsesRememberStorage() })
      return true
    } catch {
      return false
    }
  })()

  try {
    return await refreshInFlight
  } finally {
    refreshInFlight = null
  }
}

function redirectToAdminLoginIfNeeded() {
  if (typeof window === 'undefined') return
  const path = window.location.pathname
  if (path === '/admin/login' || path.startsWith('/admin/login/')) return
  window.location.replace(`${window.location.origin}/admin/login`)
}

function buildAdminRequest(path: string, init: RequestInit | undefined, accessToken: string): [string, RequestInit] {
  const url = `${getApiBase()}/admin${path.startsWith('/') ? path : `/${path}`}`
  const headers = new Headers(init?.headers)
  headers.set('Authorization', `Bearer ${accessToken}`)
  if (init?.body && typeof init.body === 'string' && !headers.has('Content-Type')) {
    headers.set('Content-Type', 'application/json')
  }
  return [url, { ...init, headers }]
}

export async function adminFetch(path: string, init?: RequestInit): Promise<Response> {
  let access = getAdminToken()
  const refresh = getAdminRefreshToken()

  if (!access && refresh) {
    await refreshAdminAccess()
    access = getAdminToken()
  }

  if (!access) {
    return new Response(JSON.stringify({ ok: false, error: 'UNAUTHORIZED', message: 'Not logged in' }), {
      status: 401,
      headers: { 'Content-Type': 'application/json' },
    })
  }

  const [url, firstInit] = buildAdminRequest(path, init, access)
  let res = await fetch(url, firstInit)

  if (res.status === 401 && refresh) {
    const ok = await refreshAdminAccess()
    if (ok) {
      const retryAccess = getAdminToken()
      if (retryAccess) {
        const [retryUrl, retryInit] = buildAdminRequest(path, init, retryAccess)
        res = await fetch(retryUrl, retryInit)
      }
    }
  }

  if (res.status === 401) {
    clearAdminSession()
    redirectToAdminLoginIfNeeded()
  }

  return res
}
