import { cn } from '../../lib/cn'

export type VerificationStatus = 'verified' | 'flagged' | 'pending'

const styles: Record<VerificationStatus, string> = {
  verified: 'bg-emerald-50 text-emerald-800 ring-emerald-100',
  flagged: 'bg-orange-50 text-orange-800 ring-orange-100',
  pending: 'bg-amber-50 text-amber-900 ring-amber-100',
}

const labels: Record<VerificationStatus, string> = {
  verified: 'Verified',
  flagged: 'Flagged',
  pending: 'Pending',
}

export function StatusBadge({
  status,
  className,
}: {
  status: VerificationStatus
  className?: string
}) {
  return (
    <span
      className={cn(
        'inline-flex rounded-full px-2.5 py-0.5 text-xs font-semibold ring-1 ring-inset',
        styles[status],
        className,
      )}
    >
      {labels[status]}
    </span>
  )
}
