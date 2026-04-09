/**
 * Shown on manufacturer product registration and optionally admin areas.
 * Explains IPFS vs server-signed chain txs (no browser wallet for MVP).
 */
export function IntegrationExplainer({ variant }: { variant: 'manufacturer' | 'admin' }) {
  return (
    <div className="rounded-2xl border border-sky-200/80 bg-gradient-to-br from-sky-50 to-white p-5 text-sm shadow-sm">
      <p className="text-xs font-bold uppercase tracking-wide text-sky-800">MediChain data &amp; chain flow</p>
      <ul className="mt-3 space-y-2.5 text-brand-secondary">
        <li>
          <span className="font-semibold text-sky-900">IPFS (Pinata)</span>
          <span className="text-brand-muted">
            {' '}
            — Use for certificates, lab reports, and other sensitive or audit-heavy files. The API pins files and stores the CID; only the CID (or gateway URL) is referenced in submissions and, when applicable, on-chain metadata.
          </span>
        </li>
        {variant === 'manufacturer' ? (
          <li>
            <span className="font-semibold text-sky-900">Cloudinary</span>
            <span className="text-brand-muted">
              {' '}
              — Use for non-sensitive product/packaging images that do not require tamper-evident storage.
            </span>
          </li>
        ) : null}
        <li>
          <span className="font-semibold text-sky-900">On-chain transactions</span>
          <span className="text-brand-muted">
            {' '}
            — You do <strong>not</strong> sign with MetaMask in this app. Registry writes (
            <code className="rounded bg-slate-100 px-1 text-xs">registerDrug</code>, recalls, etc.) are sent by the{' '}
            <strong>backend wallet</strong> configured with <code className="rounded bg-slate-100 px-1 text-xs">OWNER_PRIVATE_KEY</code>{' '}
            in your deployment. You will not see a wallet popup in the browser for those operations.
          </span>
        </li>
      </ul>
    </div>
  )
}
