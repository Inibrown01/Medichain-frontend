# MediChain — Drug verification System

Public site, manufacturer dashboard, and admin dashboard. The app talks to the **Express API** via `fetch`; configure the base URL with Vite environment variables.

## Setup

```bash
cd frontend
npm install
cp .env.example .env
```

## Required environment (`frontend/.env`)

| Variable                | Example                        | Notes                                                                                        |
| ----------------------- | ------------------------------ | -------------------------------------------------------------------------------------------- |
| `VITE_API_URL`          | `http://localhost:4000/api/v1` | **Must** include the `/api/v1` prefix. No trailing slash.                                    |
| `VITE_CHAIN_ID`         | `84532`                        | Same chain as your deployed `PharmVerifyRegistry` (e.g. `80002` Amoy, `84532` Base Sepolia). |
| `VITE_CONTRACT_ADDRESS` | `0x...`                        | Same address as backend `CONTRACT_ADDRESS`.                                                  |
| `VITE_RPC_URL`          | `https://sepolia.base.org`     | Optional; public RPC for future read-only wallet calls.                                      |

After changing `.env`, restart `npm run dev`.

## Run (development)

```bash
npm run dev
```

Default: `http://localhost:5173`

## Build (production)

```bash
npm run build
npm run preview   # optional: serve the production build locally
```

## Flows to test in the browser

1. **Manufacturer:** `/manufacturer/register` → `/manufacturer/login` → dashboard → **Register New Product** (Cloudinary + IPFS uploads require backend Pinata/Cloudinary config).
2. **Admin:** `/admin/...` routes expect an admin JWT (see backend `POST /api/v1/auth/login`).
3. **Verify:** `/verify/:productId` — needs a valid `productId` from on-chain registration.

Full step-by-step checklists, curl examples, and contract deployment: see the **[root `README.md`](../README.md)**.
