export function RecallClassCards() {
  return (
    <div className="mt-6 grid gap-4 md:grid-cols-3">
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[var(--shadow-brand-sm)]">
        <span className="inline-flex h-2 w-2 rounded-full bg-red-500" />
        <p className="mt-2 text-sm font-bold text-brand-secondary">Class I Recall</p>
        <p className="mt-1 text-xs font-medium leading-relaxed text-brand-muted">
          Reasonable probability that use will cause serious adverse health consequences or death.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[var(--shadow-brand-sm)]">
        <span className="inline-flex h-2 w-2 rounded-full bg-amber-500" />
        <p className="mt-2 text-sm font-bold text-brand-secondary">Class II Recall</p>
        <p className="mt-1 text-xs font-medium leading-relaxed text-brand-muted">
          Use may cause temporary or medically reversible adverse health consequences.
        </p>
      </div>
      <div className="rounded-2xl border border-slate-100 bg-white p-4 shadow-[var(--shadow-brand-sm)]">
        <span className="inline-flex h-2 w-2 rounded-full bg-emerald-500" />
        <p className="mt-2 text-sm font-bold text-brand-secondary">Class III Recall</p>
        <p className="mt-1 text-xs font-medium leading-relaxed text-brand-muted">
          Use is not likely to cause adverse health consequences but violates regulations.
        </p>
      </div>
    </div>
  )
}
