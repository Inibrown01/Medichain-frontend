import { useEffect } from 'react'
import { createPortal } from 'react-dom'
import { Link, NavLink } from 'react-router-dom'
import { motion, AnimatePresence } from 'framer-motion'
import { LogIn, UserPlus, X } from 'lucide-react'
import { MAIN_NAV_LINKS } from '../../config/nav'
import { Logo } from '../brand/Logo'
import { cn } from '../../lib/cn'

type MobileNavDrawerProps = {
  open: boolean
  onClose: () => void
  floating?: boolean
}

const backdrop = {
  closed: { opacity: 0 },
  open: { opacity: 1 },
}

const panel = {
  closed: { x: '100%' },
  open: { x: 0 },
}

const linkStagger = {
  open: {
    transition: { staggerChildren: 0.06, delayChildren: 0.08 },
  },
  closed: {},
}

const linkItem = {
  closed: { opacity: 0, x: 24 },
  open: { opacity: 1, x: 0 },
}

export function MobileNavDrawer({ open, onClose, floating }: MobileNavDrawerProps) {
  useEffect(() => {
    if (!open) return
    const prev = document.body.style.overflow
    document.body.style.overflow = 'hidden'
    return () => {
      document.body.style.overflow = prev
    }
  }, [open])

  useEffect(() => {
    if (!open) return
    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') onClose()
    }
    window.addEventListener('keydown', onKey)
    return () => window.removeEventListener('keydown', onKey)
  }, [open, onClose])

  const node =
    typeof document !== 'undefined' ? document.body : null
  if (!node) return null

  return createPortal(
    <AnimatePresence mode="wait">
      {open ? (
        <>
          <motion.button
            type="button"
            aria-label="Close menu"
            className={cn(
              'fixed inset-0 z-[200] cursor-default bg-brand-secondary/40 backdrop-blur-sm md:hidden',
              floating && 'top-0',
            )}
            variants={backdrop}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ duration: 0.25 }}
            onClick={onClose}
          />
          <motion.aside
            role="dialog"
            aria-modal="true"
            aria-label="Main navigation"
            className="fixed right-0 top-0 z-[201] flex h-full w-[min(100%,380px)] flex-col bg-white shadow-2xl md:hidden"
            variants={panel}
            initial="closed"
            animate="open"
            exit="closed"
            transition={{ type: 'spring', damping: 30, stiffness: 360 }}
          >
            <div className="flex items-center justify-between border-b border-slate-100 px-5 py-4">
              <Logo to="/" onNavigate={onClose} />
              <button
                type="button"
                onClick={onClose}
                className="flex h-11 w-11 items-center justify-center rounded-full bg-slate-100 text-brand-secondary transition-colors hover:bg-slate-200"
                aria-label="Close menu"
              >
                <X className="h-5 w-5" />
              </button>
            </div>

            <motion.nav
              className="flex flex-1 flex-col gap-1 overflow-y-auto px-3 py-6"
              variants={linkStagger}
              initial="closed"
              animate="open"
            >
              {MAIN_NAV_LINKS.map(({ to, label, end }) => (
                <motion.div key={to} variants={linkItem} transition={{ duration: 0.22 }}>
                  <NavLink
                    to={to}
                    end={end}
                    onClick={onClose}
                    className={({ isActive }) =>
                      cn(
                        'block rounded-2xl px-4 py-3.5 text-base font-semibold transition-colors',
                        isActive
                          ? 'bg-blue-50 text-brand-primary'
                          : 'text-brand-secondary hover:bg-slate-50',
                      )
                    }
                  >
                    {label}
                  </NavLink>
                </motion.div>
              ))}
            </motion.nav>

            <div className="space-y-3 border-t border-slate-100 p-5">
              <Link
                to="/manufacturer/login"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-2xl border border-slate-200 py-3.5 text-sm font-semibold text-brand-secondary transition-colors hover:bg-slate-50"
              >
                <LogIn className="h-4 w-4" />
                Login
              </Link>
              <Link
                to="/contact"
                onClick={onClose}
                className="flex w-full items-center justify-center gap-2 rounded-2xl bg-brand-primary py-3.5 text-sm font-semibold text-white shadow-md transition-colors hover:bg-blue-700"
              >
                <UserPlus className="h-4 w-4" />
                Register
              </Link>
            </div>
          </motion.aside>
        </>
      ) : null}
    </AnimatePresence>,
    node,
  )
}
