import type { ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type SectionHeadingProps = {
  eyebrow?: string
  title: ReactNode
  description?: ReactNode
  align?: 'left' | 'center'
  className?: string
}

export function SectionHeading({
  eyebrow,
  title,
  description,
  align = 'left',
  className,
}: SectionHeadingProps) {
  return (
    <div
      className={cn(
        'max-w-3xl space-y-3',
        align === 'center' && 'mx-auto text-center',
        className,
      )}
    >
      {eyebrow ? (
        <p className="text-xs font-semibold uppercase tracking-wider text-red-600">{eyebrow}</p>
      ) : null}
      <h2 className="font-sans text-2xl font-bold tracking-tight text-brand-secondary md:text-3xl">
        {title}
      </h2>
      {description ? (
        <p className="text-base leading-relaxed text-brand-muted">{description}</p>
      ) : null}
    </div>
  )
}
