"use client";

import React from "react";
import {
  Radar,
  RadarChart,
  PolarGrid,
  PolarAngleAxis,
  PolarRadiusAxis,
  ResponsiveContainer,
  Tooltip,
} from "recharts";

interface SkillRadarData {
  skill: string;
  userLevel: number; // 0 to 100
  requiredLevel: number; // 0 to 100
}

interface SkillRadarChartProps {
  data: SkillRadarData[];
}

export function SkillRadarChart({ data }: SkillRadarChartProps) {
  if (!data || data.length === 0) {
    return (
      <div className="h-64 flex items-center justify-center text-slate-400 text-sm">
        No skill evaluation data available.
      </div>
    );
  }

  return (
    <div className="w-full h-[320px]">
      <ResponsiveContainer width="100%" height="100%">
        <RadarChart cx="50%" cy="50%" outerRadius="75%" data={data}>
          <PolarGrid stroke="#334155" />
          <PolarAngleAxis
            dataKey="skill"
            stroke="#94A3B8"
            tick={{ fill: "#CBD5E1", fontSize: 11 }}
          />
          <PolarRadiusAxis angle={30} domain={[0, 100]} stroke="#475569" />
          <Radar
            name="Your Proficiency"
            dataKey="userLevel"
            stroke="#8B5CF6"
            fill="#8B5CF6"
            fillOpacity={0.4}
          />
          <Radar
            name="Career Benchmark"
            dataKey="requiredLevel"
            stroke="#06B6D4"
            fill="#06B6D4"
            fillOpacity={0.25}
          />
          <Tooltip
            contentStyle={{
              backgroundColor: "#0F172A",
              borderColor: "#334155",
              borderRadius: "8px",
              color: "#F8FAFC",
            }}
          />
        </RadarChart>
      </ResponsiveContainer>
    </div>
  );
}
