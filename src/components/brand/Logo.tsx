import { Link } from 'react-router-dom'
import { cn } from '../../lib/cn'
import logoMark from '../../assets/medichain/logo.png'

export type LogoProps = {
  className?: string
  to?: string
  compact?: boolean
  onNavigate?: () => void
}

export function Logo({ className, to = '/', compact = false, onNavigate }: LogoProps) {
  const content = (
    <span className={cn('inline-flex items-center', className)}>
      <img
        src={logoMark}
        alt="MediChain NG"
        width={260}
        height={52}
        className={cn('h-11 w-auto object-contain object-left sm:h-12', compact && 'h-9 sm:h-9')}
        decoding="async"
      />
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
