import {
  Bell,
  Boxes,
  Building2,
  Clock3,
  LayoutDashboard,
  PackageSearch,
  QrCode,
  Settings,
  ShieldCheck,
} from 'lucide-react'
import type { DashboardNavSection } from '../components/dashboard'

export const MANUFACTURER_DASHBOARD_NAV: DashboardNavSection[] = [
  {
    id: 'primary',
    items: [
      { label: 'Dashboard', to: '/manufacturer/dashboard', icon: LayoutDashboard, exact: true },
      { label: 'Products', to: '/manufacturer/products', icon: PackageSearch },
      { label: 'Batches', to: '/manufacturer/batches', icon: Boxes },
      { label: 'QR Codes', to: '/manufacturer/qr-codes/product-level', icon: QrCode, matchPrefix: '/manufacturer/qr-codes' },
      { label: 'Verification Insights', to: '/manufacturer/verification-insights', icon: Clock3 },
      { label: 'Recall Requests', to: '/manufacturer/recalls', icon: ShieldCheck },
    ],
  },
  {
    id: 'secondary',
    items: [
      { label: 'Notifications', to: '/manufacturer/notifications', icon: Bell, exact: true },
      { label: 'Company Profile', to: '/manufacturer/company-profile', icon: Building2, exact: true },
      { label: 'Settings', to: '/manufacturer/settings', icon: Settings, exact: true },
    ],
  },
]
