import { Upload } from 'lucide-react'

export type FileUploadRowProps = {
  title: string
  hint?: string
  onSelect?: () => void
}

export function FileUploadRow({
  title,
  hint = 'PDF, JPG, or PNG (Max 5MB)',
  onSelect,
}: FileUploadRowProps) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl border border-dashed border-slate-300 bg-slate-50/80 p-4">
      <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-blue-50 text-brand-primary">
        <Upload className="h-6 w-6" aria-hidden />
      </div>
      <div className="min-w-0 flex-1">
        <p className="font-semibold text-brand-secondary">{title}</p>
        <p className="text-sm text-brand-muted">{hint}</p>
      </div>
      <button
        type="button"
        onClick={onSelect}
        className="shrink-0 text-sm font-semibold text-slate-600 hover:text-brand-primary"
      >
        Select File
      </button>
    </div>
  )
}
