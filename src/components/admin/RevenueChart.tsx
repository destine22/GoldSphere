'use client';

import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

interface RevenueChartProps {
  data: { month: string; revenue: number }[];
}

export default function RevenueChart({ data }: RevenueChartProps) {
  const CustomTooltip = ({ active, payload }: any) => {
    if (active && payload && payload.length) {
      return (
        <div className="bg-[#2C1A0E] border border-[#8B5E3C] rounded-lg p-3">
          <p className="text-[#F0C040] font-semibold">{payload[0].payload.month}</p>
          <p className="text-[#F0C040]">₦{payload[0].value.toLocaleString()}</p>
        </div>
      );
    }
    return null;
  };

  return (
    <div className="rounded-xl shadow-lg p-6 border border-[#8B5E3C]" style={{ background: 'linear-gradient(135deg, #3D2010 , #4A2C15 )' }}>
      <h3 className="text-lg font-bold font-[Playfair_Display] text-[#F0C040] mb-6">Revenue Last 6 Months</h3>
      <div style={{ width: '100%', height: 280, minWidth: 300, minHeight: 280 }}>
        <ResponsiveContainer width="100%" height="100%" minWidth={300} minHeight={280}>
          <BarChart data={data}>
            <defs>
              <linearGradient id="goldGradient" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stopColor="#D4A017" />
                <stop offset="100%" stopColor="#E8780C" />
              </linearGradient>
            </defs>
            <CartesianGrid stroke="#3D2010" strokeDasharray="3 3" vertical={false} />
            <XAxis 
              dataKey="month" 
              stroke="#C8A882" 
              tick={{ fill: '#C8A882', fontSize: 12 }} 
              axisLine={{ stroke: '#8B5E3C' }}
              tickLine={false}
            />
            <YAxis 
              stroke="#C8A882" 
              tick={{ fill: '#C8A882', fontSize: 12 }} 
              axisLine={{ stroke: '#8B5E3C' }}
              tickLine={false}
              tickFormatter={(value) => `₦${value}`}
            />
            <Tooltip content={<CustomTooltip />} />
            <Bar dataKey="revenue" fill="url(#goldGradient)" radius={[4, 4, 0, 0]} />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
