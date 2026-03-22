import type { HTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type CardProps = HTMLAttributes<HTMLDivElement> & {
  padding?: 'none' | 'sm' | 'md' | 'lg'
}

const paddings = {
  none: '',
  sm: 'p-4',
  md: 'p-6',
  lg: 'p-8 md:p-10',
}

export function Card({ className, padding = 'md', children, ...props }: CardProps) {
  return (
    <div
      className={cn(
        'rounded-3xl border border-slate-100/80 bg-white shadow-[var(--shadow-brand-md)]',
        paddings[padding],
        className,
      )}
      {...props}
    >
      {children}
    </div>
  )
}
