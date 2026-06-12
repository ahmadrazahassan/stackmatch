"use client";

import { Bar, BarChart, ResponsiveContainer, XAxis, YAxis, Tooltip, Cell, CartesianGrid } from "recharts";

interface Props {
  brandColor?: string;
  ratings: {
    easeOfUse: number;
    valueForMoney: number;
    customerService: number;
    functionality: number;
  };
}

export function SoftwareRatingsChart({ brandColor = "var(--color-brand)", ratings }: Props) {
  const data = [
    { name: "Ease of Use", value: ratings.easeOfUse },
    { name: "Value for Money", value: ratings.valueForMoney },
    { name: "Customer Service", value: ratings.customerService },
    { name: "Functionality", value: ratings.functionality },
  ];

  return (
    <div className="h-[280px] w-full pt-4">
      <ResponsiveContainer width="100%" height="100%">
        <BarChart data={data} layout="vertical" margin={{ top: 5, right: 30, left: 20, bottom: 5 }}>
          <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="#e5e7eb" />
          <XAxis 
            type="number" 
            domain={[0, 5]} 
            ticks={[0, 1, 2, 3, 4, 5]} 
            stroke="#888888" 
            fontSize={12} 
            tickLine={false} 
            axisLine={false} 
          />
          <YAxis 
            dataKey="name" 
            type="category" 
            stroke="#4b5563" 
            fontSize={13} 
            tickLine={false} 
            axisLine={false} 
            width={120} 
            fontWeight={500}
          />
          <Tooltip
            cursor={{ fill: "rgba(0,0,0,0.04)" }}
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', fontWeight: 600 }}
            formatter={(value: any) => [Number(value).toFixed(1) + ' / 5.0', 'Score']}
          />
          <Bar dataKey="value" radius={[4, 4, 4, 4]} barSize={28}>
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={brandColor} />
            ))}
          </Bar>
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
