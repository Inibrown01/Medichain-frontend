import { cn } from '../../lib/cn'

export type AdminPermissions = {
  productApproval: boolean
  recallIssuance: boolean
  userManagement: boolean
  systemSettings: boolean
  auditLogAccess: boolean
  reportsInvestigation: boolean
}

export const DEFAULT_PERMISSIONS: AdminPermissions = {
  productApproval: false,
  recallIssuance: false,
  userManagement: false,
  systemSettings: false,
  auditLogAccess: false,
  reportsInvestigation: false,
}

const ITEMS: { key: keyof AdminPermissions; title: string; description: string }[] = [
  {
    key: 'productApproval',
    title: 'Product Approval',
    description: 'Can approve or reject new product submissions.',
  },
  {
    key: 'recallIssuance',
    title: 'Recall Issuance',
    description: 'Can initiate and manage product recalls.',
  },
  {
    key: 'userManagement',
    title: 'User Management',
    description: 'Can manage other system users and roles.',
  },
  {
    key: 'systemSettings',
    title: 'System Settings',
    description: 'Can modify global system configurations.',
  },
  {
    key: 'auditLogAccess',
    title: 'Audit Log Access',
    description: 'Can view and export system audit logs.',
  },
  {
    key: 'reportsInvestigation',
    title: 'Reports Investigation',
    description: 'Can manage and investigate suspicious reports.',
  },
]

type Props = {
  value: AdminPermissions
  onChange: (next: AdminPermissions) => void
}

export function AdminPermissionChecklist({ value, onChange }: Props) {
  return (
    <ul className="flex flex-col gap-3">
      {ITEMS.map((item) => {
        const checked = value[item.key]
        return (
          <li
            key={item.key}
            className="flex items-start justify-between gap-4 rounded-2xl border border-slate-200 bg-slate-50/80 px-4 py-3"
          >
            <div className="min-w-0">
              <p className="font-semibold text-brand-secondary">{item.title}</p>
              <p className="mt-0.5 text-sm text-brand-muted">{item.description}</p>
            </div>
            <button
              type="button"
              role="checkbox"
              aria-checked={checked}
              onClick={() => onChange({ ...value, [item.key]: !checked })}
              className={cn(
                'mt-0.5 flex h-6 w-6 shrink-0 items-center justify-center rounded-md border-2 transition-colors',
                checked
                  ? 'border-brand-primary bg-brand-primary text-white'
                  : 'border-slate-300 bg-white text-transparent',
              )}
            >
              <svg className="h-3.5 w-3.5" viewBox="0 0 12 12" fill="none" aria-hidden>
                <path
                  d="M2 6l3 3 5-5"
                  stroke="currentColor"
                  strokeWidth="2"
                  strokeLinecap="round"
                  strokeLinejoin="round"
                />
              </svg>
            </button>
          </li>
        )
      })}
    </ul>
  )
}
