import { useState } from 'react'
import { Link, NavLink, useLocation } from 'react-router-dom'
import { LogIn, UserPlus } from 'lucide-react'
import { Logo } from '../brand/Logo'
import { cn } from '../../lib/cn'
import { MAIN_NAV_LINKS } from '../../config/nav'
import { MobileNavDrawer } from './MobileNavDrawer'
import { HamburgerButton } from './HamburgerButton'

function DesktopNavLinks() {
  return (
    <>
      {MAIN_NAV_LINKS.map(({ to, label, end }) => (
        <NavLink
          key={to}
          to={to}
          end={end}
          className={({ isActive }) =>
            cn(
              'whitespace-nowrap rounded-lg px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:text-brand-primary',
              isActive && 'text-brand-primary underline decoration-2 underline-offset-8',
            )
          }
        >
          {label}
        </NavLink>
      ))}
    </>
  )
}

export function Navbar() {
  const { pathname } = useLocation()
  const [mobileOpen, setMobileOpen] = useState(false)
  const isHome = pathname === '/'
  const isContact = pathname === '/contact'
  const floatingNav = isHome || isContact

  return (
    <>
      <header
        className={cn(
          'z-[90] transition-[background,box-shadow,border-color] duration-300',
          floatingNav
            ? 'pointer-events-none fixed left-0 right-0 top-0 flex justify-center px-3 pt-3 sm:pt-4'
            : 'sticky top-0 border-b border-slate-200/80 bg-white/95 backdrop-blur-md',
        )}
      >
        <div
          className={cn(
            'pointer-events-auto flex w-full items-center justify-between gap-3',
            floatingNav
              ? 'max-w-5xl rounded-full border border-slate-200/90 bg-white/95 px-3 py-2 shadow-lg shadow-slate-900/10 sm:px-5'
              : 'mx-auto h-16 max-w-7xl px-4 sm:px-6 lg:px-8 md:h-[4.25rem]',
          )}
        >
          <NavInner floatingNav={floatingNav} mobileOpen={mobileOpen} setMobileOpen={setMobileOpen} />
        </div>
      </header>

      <MobileNavDrawer
        open={mobileOpen}
        onClose={() => setMobileOpen(false)}
        floating={floatingNav}
      />
    </>
  )
}

function NavInner({
  floatingNav,
  mobileOpen,
  setMobileOpen,
}: {
  floatingNav: boolean
  mobileOpen: boolean
  setMobileOpen: (v: boolean) => void
}) {
  return (
    <>
      <Logo to="/" />

      <nav className="hidden flex-1 justify-center gap-1 md:flex">
        <DesktopNavLinks />
      </nav>

      <div className="flex min-w-0 shrink-0 items-center gap-2">
        <NavLink
          to="/manufacturer/login"
          className="hidden items-center gap-1.5 rounded-full px-3 py-2 text-sm font-medium text-slate-600 transition-colors hover:bg-slate-100 md:inline-flex"
        >
          <LogIn className="h-4 w-4" />
          Login
        </NavLink>
        <Link
          to="/contact"
          className={cn(
            'hidden h-10 items-center gap-2 rounded-full bg-brand-primary px-4 text-sm font-semibold text-white transition-colors hover:bg-blue-700 md:inline-flex',
          )}
        >
          <UserPlus className="h-4 w-4 shrink-0" aria-hidden />
          Register
        </Link>

        <HamburgerButton
          open={mobileOpen}
          onClick={() => setMobileOpen(!mobileOpen)}
          className={cn(floatingNav && 'bg-white shadow-sm ring-1 ring-slate-200/80')}
        />
      </div>
    </>
  )
}
