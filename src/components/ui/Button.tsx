import type { ButtonHTMLAttributes, ReactNode } from 'react'
import { cn } from '../../lib/cn'

const variants = {
  primary:
    'bg-brand-primary text-white hover:bg-blue-700 focus-visible:ring-2 focus-visible:ring-brand-primary/40 disabled:opacity-50',
  secondary:
    'bg-white text-brand-primary border-2 border-brand-primary hover:bg-brand-primary hover:text-white focus-visible:ring-2 focus-visible:ring-brand-primary/30',
  outline:
    'border border-slate-200 bg-white text-brand-secondary hover:bg-slate-50 focus-visible:ring-2 focus-visible:ring-slate-300',
  ghost: 'bg-transparent text-brand-secondary hover:bg-slate-100 focus-visible:ring-2 focus-visible:ring-slate-300',
  danger: 'bg-red-600 text-white hover:bg-red-700 focus-visible:ring-2 focus-visible:ring-red-500/40',
  success:
    'bg-[#16a34a] text-white hover:bg-emerald-700 focus-visible:ring-2 focus-visible:ring-emerald-500/40',
} as const

const sizes = {
  sm: 'h-9 px-3 text-sm rounded-lg',
  md: 'h-11 px-4 text-sm rounded-xl',
  lg: 'h-12 px-6 text-base rounded-xl',
  pill: 'h-11 px-6 rounded-full text-sm',
} as const

export type ButtonVariant = keyof typeof variants
export type ButtonSize = keyof typeof sizes

export type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement> & {
  variant?: ButtonVariant
  size?: ButtonSize
  leftIcon?: ReactNode
  rightIcon?: ReactNode
}

export function Button({
  className,
  variant = 'primary',
  size = 'md',
  type = 'button',
  leftIcon,
  rightIcon,
  children,
  ...props
}: ButtonProps) {
  return (
    <button
      type={type}
      className={cn(
        'inline-flex items-center justify-center gap-2 font-semibold transition-colors',
        variants[variant],
        sizes[size],
        className,
      )}
      {...props}
    >
      {leftIcon}
      {children}
      {rightIcon}
    </button>
  )
}
