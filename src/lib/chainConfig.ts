/**
 * Client-side chain + contract hints for wallet / read-only calls.
 * Server remains the source of truth for registration writes (admin key).
 */

const raw = import.meta.env.VITE_CHAIN_ID
export const chainId = raw !== undefined && raw !== '' ? Number(raw) : null

export const contractAddress = (import.meta.env.VITE_CONTRACT_ADDRESS as string | undefined) || ''

export const rpcUrl = (import.meta.env.VITE_RPC_URL as string | undefined) || ''

/** MediChain REST API (must include `/api/v1`). Matches admin portal default when env is unset. */
const DEFAULT_API_BASE = 'http://localhost:4000/api/v1'
export const apiBaseUrl =
  (import.meta.env.VITE_API_URL as string | undefined)?.trim().replace(/\/$/, '') || DEFAULT_API_BASE

/** Human-readable names for env docs */
export const supportedChainsHelp =
  'Polygon Amoy 80002, Base Sepolia 84532, Polygon 137, Base 8453 — match VITE_CHAIN_ID to your deployment.'
