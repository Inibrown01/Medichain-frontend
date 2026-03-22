import { Fragment } from 'react'
import { cn } from '../../lib/cn'

export type StepperProps = {
  steps: number
  current: number
  className?: string
}

export function Stepper({ steps, current, className }: StepperProps) {
  return (
    <div className={cn('flex items-center justify-center', className)}>
      {Array.from({ length: steps }, (_, i) => {
        const n = i + 1
        const active = n === current
        const done = n < current
        return (
          <Fragment key={n}>
            <div
              className={cn(
                'flex h-10 w-10 shrink-0 items-center justify-center rounded-full text-sm font-bold transition-colors',
                active || done ? 'bg-brand-primary text-white' : 'bg-slate-200 text-slate-500',
              )}
            >
              {n}
            </div>
            {i < steps - 1 ? (
              <div
                className={cn('mx-1 h-0.5 w-8 sm:mx-2 sm:w-14', done ? 'bg-brand-primary' : 'bg-slate-200')}
                aria-hidden
              />
            ) : null}
          </Fragment>
        )
      })}
    </div>
  )
}
