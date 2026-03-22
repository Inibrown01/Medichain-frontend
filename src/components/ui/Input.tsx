import type { InputHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

export type InputProps = InputHTMLAttributes<HTMLInputElement> & {
  label?: string
  hint?: string
  error?: string
  leftIcon?: ReactNode
  rightElement?: ReactNode
}

export function Input({
  id,
  label,
  hint,
  error,
  leftIcon,
  rightElement,
  className,
  disabled,
  ...props
}: InputProps) {
  const inputId = id ?? props.name
  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={inputId}
          className="mb-1.5 block text-sm font-semibold text-brand-secondary"
        >
          {label}
        </label>
      ) : null}
      <div className="relative flex items-stretch">
        {leftIcon ? (
          <span className="pointer-events-none absolute left-3 top-1/2 z-10 -translate-y-1/2 text-slate-400">
            {leftIcon}
          </span>
        ) : null}
        <input
          id={inputId}
          disabled={disabled}
          className={cn(
            'h-12 w-full rounded-xl border bg-slate-50 px-3 text-sm text-brand-secondary placeholder:text-slate-400 outline-none transition-[box-shadow,border-color]',
            leftIcon ? 'pl-10' : undefined,
            rightElement ? 'pr-24' : undefined,
            error
              ? 'border-status-error focus:border-status-error focus:ring-2 focus:ring-red-200'
              : 'border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-blue-100',
            disabled && 'cursor-not-allowed opacity-60',
            className,
          )}
          {...props}
        />
        {rightElement ? (
          <div className="absolute right-2 top-1/2 flex -translate-y-1/2 items-center">{rightElement}</div>
        ) : null}
      </div>
      {error ? <p className="mt-1 text-xs text-status-error">{error}</p> : null}
      {hint && !error ? <p className="mt-1 text-xs text-brand-muted">{hint}</p> : null}
    </div>
  )
}
