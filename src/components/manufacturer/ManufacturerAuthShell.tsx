import type { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { Building2 } from 'lucide-react'
import { AuthEnter } from '../motion/AuthEnter'

export function ManufacturerAuthShell({
  children,
  footer,
}: {
  children: ReactNode
  footer?: ReactNode
}) {
  return (
    <div className="flex min-h-screen flex-col bg-slate-50">
      <div className="flex flex-1 flex-col items-center justify-center px-4 py-10 sm:py-12">
        <AuthEnter>
          {children}
          {footer}
        </AuthEnter>
      </div>
    </div>
  )
}

export function ManufacturerRegisterHeader() {
  return (
    <div className="mb-8 text-center">
      <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-blue-100 text-brand-primary">
        <Building2 className="h-7 w-7" aria-hidden />
      </div>
      <h1 className="mt-6 text-3xl font-bold tracking-tight text-brand-secondary md:text-4xl">
        Manufacturer Registration
      </h1>
      <p className="mt-2 text-sm text-brand-muted md:text-base">
        Join the national integrity network to secure your products.
      </p>
    </div>
  )
}

export function ManufacturerFooterLoginLink() {
  return (
    <p className="mt-8 text-center text-sm text-brand-muted">
      Already have an account?{' '}
      <Link to="/manufacturer/login" className="font-semibold text-brand-primary hover:underline">
        Login
      </Link>
    </p>
  )
}
