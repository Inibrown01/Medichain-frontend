import { useMemo } from 'react'
import {
  Area,
  CartesianGrid,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
  AreaChart,
} from 'recharts'

export type MonthPoint = { label: string; count: number }

function Tip({ active, payload }: { active?: boolean; payload?: { payload?: MonthPoint }[] }) {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  if (!row) return null
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-bold text-brand-secondary">{row.label}</p>
      <p className="mt-1 font-semibold text-blue-600">Verifications: {row.count}</p>
    </div>
  )
}

export function AdminProductVerificationChart({ data }: { data: MonthPoint[] }) {
  const yMax = useMemo(() => {
    let m = 0
    for (const d of data) m = Math.max(m, d.count)
    if (m === 0) return 100
    return Math.max(8, Math.ceil(m * 1.15))
  }, [data])

  return (
    <div className="h-64 w-full min-h-64">
      <ResponsiveContainer width="100%" height="100%">
        <AreaChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="prodVerFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="rgb(37 99 235)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} />
          <YAxis
            domain={[0, yMax]}
            tickCount={6}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748b', fontSize: 11 }}
            width={44}
          />
          <Tooltip content={<Tip />} />
          <Area
            type="monotone"
            dataKey="count"
            stroke="rgb(37 99 235)"
            strokeWidth={2.5}
            fill="url(#prodVerFill)"
            dot={false}
          />
        </AreaChart>
      </ResponsiveContainer>
    </div>
  )
}
