import { cn } from '../../lib/cn'

type HamburgerButtonProps = {
  open: boolean
  onClick: () => void
  className?: string
  'aria-label'?: string
}

export function HamburgerButton({
  open,
  onClick,
  className,
  'aria-label': ariaLabel = 'Open menu',
}: HamburgerButtonProps) {
  return (
    <button
      type="button"
      onClick={onClick}
      aria-expanded={open}
      aria-label={open ? 'Close menu' : ariaLabel}
      className={cn(
        'relative flex h-11 w-11 shrink-0 items-center justify-center rounded-full transition-colors md:hidden',
        'bg-slate-100 text-brand-secondary hover:bg-slate-200',
        className,
      )}
    >
      <span className="sr-only">{open ? 'Close menu' : 'Open menu'}</span>
      <span className="flex h-5 w-6 flex-col justify-center gap-1.5">
        <span
          className={cn(
            'h-0.5 w-full origin-center rounded-full bg-current transition-all duration-300 ease-out',
            open && 'translate-y-[5px] rotate-45',
          )}
        />
        <span
          className={cn(
            'h-0.5 w-full rounded-full bg-current transition-all duration-200 ease-out',
            open ? 'scale-0 opacity-0' : 'opacity-100',
          )}
        />
        <span
          className={cn(
            'h-0.5 w-full origin-center rounded-full bg-current transition-all duration-300 ease-out',
            open && '-translate-y-[5px] -rotate-45',
          )}
        />
      </span>
    </button>
  )
}
