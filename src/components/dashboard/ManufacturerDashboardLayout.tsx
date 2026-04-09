import { useCallback, useState } from 'react'
import { Navigate, useNavigate } from 'react-router-dom'
import { DashboardLayout } from './DashboardLayout'
import { MANUFACTURER_DASHBOARD_NAV } from '../../config/dashboardNav'
import { MANUFACTURER_DASHBOARD_SHELL } from '../../config/dashboardShell'
import type { DashboardShellConfig } from './types'
import {
  clearManufacturerSession,
  getManufacturerProfile,
  getManufacturerToken,
} from '../../lib/manufacturerApi'

function initialsFromName(name: string) {
  const parts = name.trim().split(/\s+/).filter(Boolean)
  if (parts.length === 0) return '?'
  if (parts.length === 1) return parts[0].slice(0, 2).toUpperCase()
  return `${parts[0][0]}${parts[parts.length - 1][0]}`.toUpperCase()
}

function shellFromProfile(): DashboardShellConfig {
  const p = getManufacturerProfile()
  if (!p) return MANUFACTURER_DASHBOARD_SHELL
  const initials = initialsFromName(p.companyName)
  return {
    ...MANUFACTURER_DASHBOARD_SHELL,
    sidebarProfile: {
      name: p.companyName,
      role: 'Verified Manufacturer',
      initials,
    },
    headerProfile: {
      name: p.companyName,
      role: 'Manufacturer',
      initials,
    },
  }
}

export function ManufacturerDashboardLayout() {
  const navigate = useNavigate()
  const token = getManufacturerToken()
  const [shell] = useState<DashboardShellConfig>(shellFromProfile)

  const onLogout = useCallback(() => {
    clearManufacturerSession()
    navigate('/manufacturer/login', { replace: true })
  }, [navigate])

  if (!token) {
    return <Navigate to="/manufacturer/login" replace />
  }

  return (
    <DashboardLayout sections={MANUFACTURER_DASHBOARD_NAV} shell={shell} onLogout={onLogout} />
  )
}
