import {
  BarChart3,
  Boxes,
  Building2,
  ClipboardCheck,
  FileSearch,
  Flag,
  LayoutDashboard,
  Package,
  Scale,
  Settings,
  ShieldAlert,
  Users,
} from 'lucide-react'
import type { DashboardNavSection } from '../components/dashboard'

export const ADMIN_DASHBOARD_NAV: DashboardNavSection[] = [
  {
    id: 'primary',
    items: [
      { label: 'Dashboard', to: '/admin/dashboard', icon: LayoutDashboard, exact: true },
      {
        label: 'Product Approvals',
        to: '/admin/approvals',
        icon: ClipboardCheck,
        matchPrefix: '/admin/approvals',
      },
      { label: 'Products', to: '/admin/products', icon: Package, matchPrefix: '/admin/products' },
      { label: 'Batches', to: '/admin/batches', icon: Boxes, matchPrefix: '/admin/batches' },
      { label: 'Recall Management', to: '/admin/recalls', icon: ShieldAlert, matchPrefix: '/admin/recalls' },
      { label: 'Suspicious Reports', to: '/admin/suspicious', icon: Flag, matchPrefix: '/admin/suspicious' },
      {
        label: 'Manufacturers',
        to: '/admin/manufacturers',
        icon: Building2,
        matchPrefix: '/admin/manufacturers',
      },
      { label: 'Users', to: '/admin/users', icon: Users, matchPrefix: '/admin/users' },
      { label: 'Analytics', to: '/admin/analytics', icon: BarChart3 },
      { label: 'Log Explorer', to: '/admin/logs', icon: FileSearch },
      { label: 'Compliance Center', to: '/admin/compliance', icon: Scale },
      { label: 'Settings', to: '/admin/settings', icon: Settings, exact: true },
    ],
  },
]
