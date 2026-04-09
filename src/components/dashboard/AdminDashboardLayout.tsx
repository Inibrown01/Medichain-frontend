import { useCallback } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { DashboardLayout } from './DashboardLayout'
import { ADMIN_DASHBOARD_NAV } from '../../config/adminDashboardNav'
import { ADMIN_DASHBOARD_SHELL } from '../../config/dashboardShell'
import type { DashboardShellConfig } from './types'
import {
  clearAdminSession,
  getAdminProfile,
  getAdminToken,
  isAdminSessionValid,
} from '../../lib/adminApi'

function initialsFromEmail(email: string) {
  const part = email.split('@')[0] || email
  if (part.length >= 2) return part.slice(0, 2).toUpperCase()
  return (part[0] || '?').toUpperCase()
}

export function AdminDashboardLayout() {
  const navigate = useNavigate()
  const token = getAdminToken()
  const sessionOk = isAdminSessionValid()
  const profile = getAdminProfile()

  const shell: DashboardShellConfig = {
    ...ADMIN_DASHBOARD_SHELL,
    sidebarProfile: {
      name: profile?.email || 'Admin',
      role: 'Regulatory Admin',
      initials: profile?.email ? initialsFromEmail(profile.email) : ADMIN_DASHBOARD_SHELL.sidebarProfile.initials,
    },
    headerProfile: {
      name: profile?.email || 'Admin',
      role: 'Admin',
      initials: profile?.email ? initialsFromEmail(profile.email) : ADMIN_DASHBOARD_SHELL.headerProfile.initials,
    },
  }

  const onLogout = useCallback(() => {
    clearAdminSession()
    navigate('/admin/login', { replace: true })
  }, [navigate])

  if (!token || !sessionOk) {
    if (token && !sessionOk) clearAdminSession()
    return <Navigate to="/admin/login" replace />
  }

  return <DashboardLayout sections={ADMIN_DASHBOARD_NAV} shell={shell} onLogout={onLogout} />
}
