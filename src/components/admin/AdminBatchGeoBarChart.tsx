import { Bar, BarChart, Cell, ResponsiveContainer, Tooltip, XAxis, YAxis } from 'recharts';

export type GeoBarPoint = { city: string; count: number };

export function AdminBatchGeoBarChart({ data }: { data: GeoBarPoint[] }) {
  const sorted = [...data].sort((a, b) => b.count - a.count);
  return (
    <div className='h-56 w-full min-h-56'>
      <ResponsiveContainer width='100%' height='100%'>
        <BarChart
          layout='vertical'
          data={sorted}
          margin={{ left: 4, right: 16, top: 8, bottom: 8 }}
        >
          <XAxis
            type='number'
            tick={{ fill: '#64748b', fontSize: 11 }}
            axisLine={false}
            tickLine={false}
          />
          <YAxis
            type='category'
            dataKey='city'
            width={72}
            tick={{ fill: '#0f172a', fontSize: 12, fontWeight: 600 }}
            axisLine={false}
            tickLine={false}
          />
          <Tooltip
            cursor={{ fill: 'rgb(241 245 249)' }}
            contentStyle={{ borderRadius: 12, border: '1px solid #e2e8f0', fontSize: 12 }}
            formatter={(v: number) => [`${v}`, 'count']}
          />
          <Bar dataKey='count' radius={[0, 8, 8, 0]} barSize={18}>
            {sorted.map((_, i) => (
              <Cell key={i} fill={i === 0 ? 'rgb(37 99 235)' : 'rgb(203 213 225)'} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
