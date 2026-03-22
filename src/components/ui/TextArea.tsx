import type { TextareaHTMLAttributes } from 'react'
import { cn } from '../../lib/cn'

export type TextAreaProps = TextareaHTMLAttributes<HTMLTextAreaElement> & {
  label?: string
  error?: string
}

export function TextArea({ id, label, error, className, ...props }: TextAreaProps) {
  const areaId = id ?? props.name
  return (
    <div className="w-full">
      {label ? (
        <label
          htmlFor={areaId}
          className="mb-1.5 block text-sm font-semibold text-brand-secondary"
        >
          {label}
        </label>
      ) : null}
      <textarea
        id={areaId}
        className={cn(
          'min-h-[140px] w-full rounded-xl border bg-slate-50 px-3 py-2.5 text-sm text-brand-secondary placeholder:text-slate-400 outline-none transition-[box-shadow,border-color]',
          error
            ? 'border-status-error focus:border-status-error focus:ring-2 focus:ring-red-200'
            : 'border-slate-200 focus:border-brand-primary focus:ring-2 focus:ring-blue-100',
          className,
        )}
        {...props}
      />
      {error ? <p className="mt-1 text-xs text-status-error">{error}</p> : null}
    </div>
  )
}
