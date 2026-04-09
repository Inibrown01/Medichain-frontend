import type { LucideIcon } from 'lucide-react'

/** Branding and header copy for the shared dashboard shell (manufacturer vs admin). */
export type DashboardShellConfig = {
  logoTo: string
  sidebarProfile: {
    name: string
    role: string
    /** e.g. "MN" — if omitted, derived from `name` */
    initials?: string
  }
  searchPlaceholder: string
  headerProfile: {
    name: string
    role: string
    initials?: string
  }
  /** Show settings gear next to notifications (admin Figma). */
  showHeaderSettings?: boolean
}

export type DashboardNavItem = {
  label: string
  to: string
  icon: LucideIcon
  exact?: boolean
  /** If set, item is active when `location.pathname` starts with this (e.g. QR sub-routes). */
  matchPrefix?: string
}

export type DashboardNavSection = {
  id: string
  items: DashboardNavItem[]
}
