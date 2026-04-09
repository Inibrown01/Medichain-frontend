import { useMemo } from 'react'
import {
  Area,
  CartesianGrid,
  ComposedChart,
  Line,
  ResponsiveContainer,
  Tooltip,
  XAxis,
  YAxis,
} from 'recharts'

export type VerificationDayPoint = {
  label: string
  checks: number
  fake: number
}

type TooltipPayload = {
  payload?: VerificationDayPoint
}

function ChartTooltip({ active, payload }: { active?: boolean; payload?: TooltipPayload[] }) {
  if (!active || !payload?.length) return null
  const row = payload[0]?.payload
  if (!row) return null
  return (
    <div className="rounded-xl border border-slate-100 bg-white px-3 py-2 text-xs shadow-lg">
      <p className="font-bold text-brand-secondary">{row.label}</p>
      <p className="mt-1 font-semibold text-blue-600">checks: {row.checks}</p>
      <p className="font-semibold text-red-500">fake: {row.fake}</p>
    </div>
  )
}

export function VerificationActivityChart({ data }: { data: VerificationDayPoint[] }) {
  const yMax = useMemo(() => {
    let m = 1
    for (const d of data) {
      m = Math.max(m, d.checks, d.fake)
    }
    return Math.max(400, Math.ceil(m / 100) * 100)
  }, [data])

  return (
    <div className="h-64 w-full min-h-64">
      <ResponsiveContainer width="100%" height="100%">
        <ComposedChart data={data} margin={{ top: 8, right: 12, left: 0, bottom: 4 }}>
          <defs>
            <linearGradient id="verificationChecksFill" x1="0" y1="0" x2="0" y2="1">
              <stop offset="0%" stopColor="rgb(37 99 235)" stopOpacity={0.35} />
              <stop offset="100%" stopColor="rgb(37 99 235)" stopOpacity={0.02} />
            </linearGradient>
          </defs>
          <CartesianGrid strokeDasharray="4 4" vertical stroke="#e2e8f0" horizontal={false} />
          <XAxis
            dataKey="label"
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748b', fontSize: 12, fontWeight: 600 }}
            dy={6}
          />
          <YAxis
            domain={[0, yMax]}
            tickCount={5}
            tickLine={false}
            axisLine={false}
            tick={{ fill: '#64748b', fontSize: 11 }}
            width={36}
          />
          <Tooltip content={<ChartTooltip />} cursor={{ stroke: '#cbd5e1', strokeDasharray: '4 4' }} />
          <Area
            type="monotone"
            dataKey="checks"
            stroke="rgb(37 99 235)"
            strokeWidth={3}
            fill="url(#verificationChecksFill)"
            dot={false}
            activeDot={{ r: 5, strokeWidth: 2, stroke: '#fff', fill: 'rgb(37 99 235)' }}
          />
          <Line
            type="monotone"
            dataKey="fake"
            stroke="rgb(239 68 68)"
            strokeWidth={2}
            dot={false}
            activeDot={{ r: 4, strokeWidth: 2, stroke: '#fff', fill: 'rgb(239 68 68)' }}
          />
        </ComposedChart>
      </ResponsiveContainer>
    </div>
  )
}
