"use client";

import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";

interface Props {
  softwareA: {
    name: string;
    color?: string;
    ratings: {
      easeOfUse: number;
      valueForMoney: number;
      customerService: number;
      functionality: number;
    };
  };
  softwareB: {
    name: string;
    color?: string;
    ratings: {
      easeOfUse: number;
      valueForMoney: number;
      customerService: number;
      functionality: number;
    };
  };
}

export function ComparisonRadarChart({ softwareA, softwareB }: Props) {
  const data = [
    {
      subject: "Ease of Use",
      [softwareA.name]: softwareA.ratings.easeOfUse,
      [softwareB.name]: softwareB.ratings.easeOfUse,
      fullMark: 5,
    },
    {
      subject: "Value for Money",
      [softwareA.name]: softwareA.ratings.valueForMoney,
      [softwareB.name]: softwareB.ratings.valueForMoney,
      fullMark: 5,
    },
    {
      subject: "Customer Service",
      [softwareA.name]: softwareA.ratings.customerService,
      [softwareB.name]: softwareB.ratings.customerService,
      fullMark: 5,
    },
    {
      subject: "Functionality",
      [softwareA.name]: softwareA.ratings.functionality,
      [softwareB.name]: softwareB.ratings.functionality,
      fullMark: 5,
    },
  ];

  const colorA = softwareA.color || "#00a86b";
  const colorB = softwareB.color || "#f5a623";

  return (
    <div className="mx-auto h-[350px] w-full max-w-2xl">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#e5e7eb" />
          <PolarAngleAxis 
            dataKey="subject" 
            tick={{ fill: "#4b5563", fontSize: 13, fontWeight: 500 }} 
          />
          <PolarRadiusAxis 
            angle={90} 
            domain={[0, 5]} 
            tick={{ fill: "#9ca3af", fontSize: 11 }} 
            tickCount={6} 
            stroke="#e5e7eb" 
          />
          <Tooltip 
            contentStyle={{ borderRadius: '8px', border: '1px solid #e5e7eb', boxShadow: '0 4px 12px rgba(0, 0, 0, 0.08)', fontWeight: 600 }}
            formatter={(value: any) => [Number(value).toFixed(1), 'Score']}
          />
          <Legend wrapperStyle={{ paddingTop: '20px' }} />
          <Radar
            name={softwareA.name}
            dataKey={softwareA.name}
            stroke={colorA}
            strokeWidth={3}
            fill={colorA}
            fillOpacity={0.4}
          />
          <Radar
            name={softwareB.name}
            dataKey={softwareB.name}
            stroke={colorB}
            strokeWidth={3}
            fill={colorB}
            fillOpacity={0.4}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
