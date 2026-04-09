import type { DashboardShellConfig } from '../components/dashboard'

export const MANUFACTURER_DASHBOARD_SHELL: DashboardShellConfig = {
  logoTo: '/manufacturer/dashboard',
  sidebarProfile: {
    name: 'PharmaCorp NG',
    role: 'Verified Manufacturer',
    initials: 'PC',
  },
  searchPlaceholder: 'Search products, batches, or logs...',
  headerProfile: {
    name: 'PharmaCorp NG',
    role: 'Manufacturer',
    initials: 'PC',
  },
}

export const ADMIN_DASHBOARD_SHELL: DashboardShellConfig = {
  logoTo: '/admin/dashboard',
  sidebarProfile: {
    name: 'Madeleine Nkiru',
    role: 'Admin',
    initials: 'MN',
  },
  searchPlaceholder: 'Search products, batches, or manufacturers...',
  headerProfile: {
    name: 'Madeleine Nkiru',
    role: 'Admin',
    initials: 'MN',
  },
  showHeaderSettings: true,
}

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

export function resolveShellInitials(shell: DashboardShellConfig) {
  return {
    sidebar: shell.sidebarProfile.initials ?? initialsFromName(shell.sidebarProfile.name),
    header: shell.headerProfile.initials ?? initialsFromName(shell.headerProfile.name),
  }
}
