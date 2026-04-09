import { useMemo } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Legend,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export type GlobalTrendPoint = {
  label: string
  total: number
  flagged: number
  fakes: number
}

function ChartTooltip({
  active,
  payload,
}: {
  active?: boolean
  payload?: { payload?: GlobalTrendPoint }[]
}) {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  if (!row) return null
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-bold text-brand-secondary">{row.label}</p>
      <p className="mt-1 font-semibold text-blue-600">Total Verifications: {row.total}</p>
      <p className="font-semibold text-amber-600">Flagged: {row.flagged}</p>
      <p className="font-semibold text-red-500">Fakes: {row.fakes}</p>
    </div>
  )
}

export function AdminGlobalVerificationChart({ data }: { data: GlobalTrendPoint[] }) {
  const yMax = useMemo(() => {
    let m = 1
    for (const d of data) {
      m = Math.max(m, d.total, d.flagged, d.fakes)
    }
    return Math.max(800, Math.ceil(m / 500) * 500)
  }, [data])

  return (
    <div className="h-72 w-full min-h-72">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 16, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="adminTotalFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity={0.3} />
              <stop offset="100%" stopColor="rgb(37 99 235)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" stroke="#e2e8f0" vertical={false} />
          <XAxis dataKey="label" tickLine={false} axisLine={false} tick={{ fill: '#64748b', fontSize: 12 }} dy={6} />
          <YAxis
            domain={[0, yMax]}
            tickCount={6}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748b', fontSize: 11 }}
            width={44}
          />
          <Tooltip content={<ChartTooltip />} />
          <Legend
            wrapperStyle={{ paddingTop: 12 }}
            formatter={(value) => <span className="text-xs font-semibold text-slate-600">{value}</span>}
          />
          <Area
            name="Total Verifications"
            type="monotone"
            dataKey="total"
            stroke="rgb(37 99 235)"
            strokeWidth={2.5}
            fill="url(#adminTotalFill)"
            dot={false}
          />
          <Line
            name="Flagged"
            type="monotone"
            dataKey="flagged"
            stroke="rgb(245 158 11)"
            strokeWidth={2}
            dot={false}
          />
          <Line name="Fakes" type="monotone" dataKey="fakes" stroke="rgb(239 68 68)" strokeWidth={2} dot={false} />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
