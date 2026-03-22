import { Link } from 'react-router-dom'
import { Shield } from 'lucide-react'
import { cn } from '../../lib/cn'

export type LogoProps = {
  className?: string
  to?: string
  compact?: boolean
  onNavigate?: () => void
}

export function Logo({ className, to = '/', compact = false, onNavigate }: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center gap-2', className)}>
      <span className="flex h-9 w-9 items-center justify-center rounded-xl bg-brand-primary/10 text-brand-primary">
        <Shield className="h-5 w-5" aria-hidden />
      </span>
      {!compact && (
        <span className="font-semibold tracking-tight text-brand-secondary">
          MediChain<span className="text-brand-primary">NG</span>
        </span>
      )}
    </span>
  )

  if (to) {
    return (
      <Link
        to={to}
        onClick={onNavigate}
        className="inline-flex items-center gap-2 rounded-lg focus:outline-none focus-visible:ring-2 focus-visible:ring-brand-primary"
      >
        {content}
      </Link>
    )
  }

  return content
}
