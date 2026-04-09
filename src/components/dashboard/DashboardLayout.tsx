import { useState } from 'react'
import { Bell, LogOut, Menu, Search, Settings, X } from 'lucide-react'
import { NavLink, Outlet, useLocation } from 'react-router-dom'
import { Logo } from '../brand/Logo'
import { cn } from '../../lib/cn'
import type { DashboardNavSection, DashboardShellConfig } from './types'
import { PageTransition } from '../motion/PageTransition'
import { MANUFACTURER_DASHBOARD_SHELL, resolveShellInitials } from '../../config/dashboardShell'

type DashboardLayoutProps = {
  sections: DashboardNavSection[]
  shell?: DashboardShellConfig
  /** When set, sidebar Logout clears session and should navigate away (e.g. manufacturer portal). */
  onLogout?: () => void
}

function SidebarContent({
  sections,
  shell,
  onNavigate,
  onLogout,
}: {
  sections: DashboardNavSection[]
  shell: DashboardShellConfig
  onNavigate?: () => void
  onLogout?: () => void
}) {
  const { pathname } = useLocation()
  const { sidebar: sidebarInitials } = resolveShellInitials(shell)

  function isNavActive(to: string, exact?: boolean, matchPrefix?: string) {
    if (matchPrefix) {
      return pathname === to || pathname.startsWith(`${matchPrefix}/`) || pathname === matchPrefix
    }
    if (exact) return pathname === to
    return pathname === to || pathname.startsWith(`${to}/`)
  }

  return (
    <>
      <div className="flex h-20 items-center px-6">
        <Logo to={shell.logoTo} onNavigate={onNavigate} />
      </div>
      <nav className="flex flex-1 flex-col gap-8 overflow-y-auto px-4 py-3">
        {sections.map((section) => (
          <div key={section.id} className="space-y-1">
            {section.items.map(({ label, to, icon: Icon, exact, matchPrefix }) => (
              <NavLink
                key={to + label}
                to={to}
                end={exact}
                onClick={onNavigate}
                className={() =>
                  cn(
                    'flex h-11 items-center gap-3 rounded-xl px-3 text-sm font-semibold text-slate-500 transition-colors',
                    isNavActive(to, exact, matchPrefix)
                      ? 'bg-brand-primary text-white shadow-[0_8px_16px_rgba(29,78,216,0.2)]'
                      : 'hover:bg-slate-50',
                  )
                }
              >
                <Icon className="h-4 w-4 shrink-0" />
                {label}
              </NavLink>
            ))}
          </div>
        ))}
      </nav>
      <div className="border-t border-slate-200 p-4">
        <div className="flex items-center gap-3 rounded-xl border border-slate-200 bg-slate-50 p-3">
          <span className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-slate-200 bg-white text-xs font-bold text-brand-secondary">
            {sidebarInitials}
          </span>
          <div className="min-w-0">
            <p className="truncate text-sm font-semibold text-brand-secondary">{shell.sidebarProfile.name}</p>
            <p className="truncate text-xs font-medium text-brand-muted">{shell.sidebarProfile.role}</p>
          </div>
        </div>
        <button
          type="button"
          className="mt-3 inline-flex w-full items-center gap-2 rounded-lg px-2 py-2 text-sm font-semibold text-red-600 transition-colors hover:bg-red-50"
          onClick={onLogout}
        >
          <LogOut className="h-4 w-4" />
          Logout
        </button>
      </div>
    </>
  )
}

export function DashboardLayout({
  sections,
  shell = MANUFACTURER_DASHBOARD_SHELL,
  onLogout,
}: DashboardLayoutProps) {
  const [mobileOpen, setMobileOpen] = useState(false)
  const { header: headerInitials } = resolveShellInitials(shell)

  return (
    <div className="min-h-screen bg-[#f4f7fb]">
      {mobileOpen ? (
        <button
          type="button"
          className="fixed inset-0 z-40 bg-black/40 xl:hidden"
          aria-label="Close menu"
          onClick={() => setMobileOpen(false)}
        />
      ) : null}

      <div className="mx-auto flex min-h-screen w-full">
        <aside
          className={cn(
            'fixed inset-y-0 left-0 z-50 flex h-screen w-[248px] shrink-0 flex-col border-r border-slate-200 bg-white transition-transform duration-200 ease-out xl:static xl:z-auto xl:translate-x-0',
            mobileOpen ? 'translate-x-0' : '-translate-x-full xl:translate-x-0',
          )}
        >
          <div className="flex items-center justify-end border-b border-slate-100 px-4 py-3 xl:hidden">
            <button
              type="button"
              className="inline-flex h-10 w-10 items-center justify-center rounded-xl text-slate-500 hover:bg-slate-50"
              onClick={() => setMobileOpen(false)}
              aria-label="Close navigation"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
          <SidebarContent
            sections={sections}
            shell={shell}
            onNavigate={() => setMobileOpen(false)}
            onLogout={onLogout}
          />
        </aside>

        <div className="flex min-w-0 flex-1 flex-col xl:min-h-screen">
          <header className="sticky top-0 z-30 border-b border-slate-200 bg-white/95 backdrop-blur-sm">
            <div className="flex h-20 items-center gap-3 px-4 sm:px-6 xl:px-8">
              <button
                type="button"
                className="inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-xl border border-slate-200 text-slate-600 transition-colors hover:bg-slate-50 xl:hidden"
                onClick={() => setMobileOpen(true)}
                aria-label="Open navigation"
              >
                <Menu className="h-5 w-5" />
              </button>
              <div className="relative min-w-0 flex-1 xl:max-w-xl xl:flex-none xl:flex-1">
                <Search className="pointer-events-none absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-slate-400" />
                <input
                  type="search"
                  placeholder={shell.searchPlaceholder}
                  className="h-11 w-full rounded-xl border border-slate-200 bg-slate-50 pl-9 pr-3 text-sm font-medium text-brand-secondary outline-none ring-brand-primary/15 transition-[box-shadow,border-color] focus:border-brand-primary focus:ring-2"
                />
              </div>
              <div className="ml-auto flex shrink-0 items-center gap-2 sm:gap-3">
                <button
                  type="button"
                  className="relative inline-flex h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50"
                >
                  <Bell className="h-4 w-4" />
                  <span className="absolute right-2.5 top-2.5 h-2 w-2 rounded-full bg-red-500" />
                </button>
                {shell.showHeaderSettings ? (
                  <button
                    type="button"
                    className="hidden h-10 w-10 items-center justify-center rounded-xl border border-slate-200 text-slate-500 transition-colors hover:bg-slate-50 sm:inline-flex"
                    aria-label="Settings"
                  >
                    <Settings className="h-4 w-4" />
                  </button>
                ) : null}
                <div className="hidden items-center gap-2 rounded-xl border border-slate-200 px-2 py-1.5 sm:flex">
                  <span className="inline-flex h-8 w-8 items-center justify-center rounded-full border border-slate-300 bg-white text-xs font-bold text-brand-secondary">
                    {headerInitials}
                  </span>
                  <div className="pr-1">
                    <p className="text-sm font-semibold leading-4 text-brand-secondary">{shell.headerProfile.name}</p>
                    <p className="text-xs font-medium text-brand-muted">{shell.headerProfile.role}</p>
                  </div>
                </div>
              </div>
            </div>
          </header>

          <main className="min-w-0 flex-1 px-4 py-6 sm:px-6 xl:px-8">
            <PageTransition>
              <Outlet />
            </PageTransition>
          </main>
        </div>
      </div>
    </div>
  )
}
