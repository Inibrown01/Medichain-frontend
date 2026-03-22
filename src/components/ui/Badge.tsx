import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

const variants = {
  default: 'bg-slate-100 text-slate-700 border border-slate-200',
  primary: 'bg-blue-50 text-brand-primary border border-blue-100',
  success: 'bg-emerald-50 text-emerald-800 border border-emerald-100',
  warning: 'bg-amber-50 text-amber-900 border border-amber-100',
  danger: 'bg-red-50 text-red-800 border border-red-100',
  outline: 'bg-transparent text-brand-muted border border-slate-200',
} as const

export type BadgeVariant = keyof typeof variants

export type BadgeProps = HTMLAttributes<HTMLSpanElement> & {
  variant?: BadgeVariant
}

export function Badge({ className, variant = 'default', ...props }: BadgeProps) {
  return (
    <span
      className={cn(
        'inline-flex items-center rounded-full px-2.5 py-0.5 text-xs font-semibold uppercase tracking-wide',
        variants[variant],
        className,
      )}
      {...props}
    />
  )
}
