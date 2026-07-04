"use client";

import { useEffect, useState } from "react";
import { useTheme } from "next-themes";
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

  const { resolvedTheme } = useTheme();
  const [mounted, setMounted] = useState(false);
  useEffect(() => setMounted(true), []);
  const dark = mounted && resolvedTheme === "dark";

  const grid = dark ? "#27272a" : "#e5e7eb";
  const angleTick = dark ? "#a1a1aa" : "#4b5563";
  const radiusTick = dark ? "#71717a" : "#9ca3af";
  const tooltipBg = dark ? "#18181b" : "#ffffff";
  const tooltipBorder = dark ? "#27272a" : "#e5e7eb";
  const tooltipText = dark ? "#fafafa" : "#18181b";

  if (!mounted) return <div className="mx-auto h-[350px] w-full max-w-2xl" aria-hidden />;

  return (
    <div
      className="mx-auto h-[350px] w-full max-w-2xl"
      role="img"
      aria-label={`Radar chart comparing ${softwareA.name} and ${softwareB.name} across ease of use, value for money, customer service and functionality`}
    >
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke={grid} />
          <PolarAngleAxis
            dataKey="subject"
            tick={{ fill: angleTick, fontSize: 13, fontWeight: 500 }}
          />
          <PolarRadiusAxis
            angle={90}
            domain={[0, 5]}
            tick={{ fill: radiusTick, fontSize: 11 }}
            tickCount={6}
            stroke={grid}
          />
          <Tooltip
            contentStyle={{ borderRadius: '12px', border: `1px solid ${tooltipBorder}`, backgroundColor: tooltipBg, color: tooltipText, boxShadow: '0 8px 24px -8px rgba(0,0,0,0.18)', fontWeight: 600 }}
            itemStyle={{ color: tooltipText }}
            labelStyle={{ color: tooltipText, fontWeight: 700 }}
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
