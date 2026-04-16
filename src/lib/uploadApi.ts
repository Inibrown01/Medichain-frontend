import { apiBaseUrl } from './chainConfig'
import { MANUFACTURER_JWT_KEY } from './manufacturerApi'

function getToken(): string | null {
  if (typeof localStorage === 'undefined') return null
  return (
    localStorage.getItem(MANUFACTURER_JWT_KEY) ||
    localStorage.getItem('medichain_admin_jwt') ||
    null
  )
}

/** Pin sensitive file to IPFS via backend (Pinata). Requires manufacturer or admin JWT. */
export async function uploadSensitiveToIpfs(file: File): Promise<{
  cid: string
  ipfsUri: string
  gatewayUrl: string
}> {
  const base = apiBaseUrl
  const token = getToken()
  if (!token) throw new Error('Not authenticated')

  const fd = new FormData()
  fd.append('file', file)

  const res = await fetch(`${base}/uploads/ipfs`, {
    method: 'POST',
    headers: { Authorization: `Bearer ${token}` },
    body: fd,
  })
  const json = (await res.json()) as { ok?: boolean; data?: { cid: string; ipfsUri: string; gatewayUrl: string } }
  if (!res.ok || !json.ok || !json.data) {
    throw new Error((json as { message?: string }).message || 'IPFS upload failed')
  }
  return json.data
}

/** Public image to Cloudinary (no auth). */
export async function uploadPublicImage(file: File, folder?: string): Promise<{ url: string; publicId: string }> {
  const base = apiBaseUrl

  const fd = new FormData()
  fd.append('file', file)
  const q = folder ? `?folder=${encodeURIComponent(folder)}` : ''
  const res = await fetch(`${base}/uploads/image${q}`, { method: 'POST', body: fd })
  const json = (await res.json()) as { ok?: boolean; data?: { url: string; publicId: string } }
  if (!res.ok || !json.ok || !json.data) {
    throw new Error((json as { message?: string }).message || 'Image upload failed')
  }
  return json.data
}
