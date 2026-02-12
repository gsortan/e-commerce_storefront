"use client";

import { useState } from "react";
import {
  ResponsiveContainer,
  AreaChart,
  Area,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
} from "recharts";

export default function RevenueChart({ last7, monthly }) {
  const [mode, setMode] = useState("7d");
  const data = mode === "7d" ? last7 : monthly;

  return (
    <div className="w-full">
      <div className="flex ml-2 gap-2 mb-3">
        <button
          className={`px-3 py-1 rounded border ${mode === "7d" ? "bg-black text-white" : ""}`}
          onClick={() => setMode("7d")}
        >
          Last 7 days
        </button>
        <button
          className={`px-3 py-1 rounded border ${mode === "monthly" ? "bg-black text-white" : ""}`}
          onClick={() => setMode("monthly")}
        >
          Monthly
        </button>
      </div>

      <div className="h-[300px] w-[55rem]">
        <ResponsiveContainer width="100%" height="100%">
          <AreaChart
            data={data}
            margin={{ top: 10, right: 10, left: 0, bottom: 10 }}
          >
            <defs>
              <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
                <stop offset="5%" stopColor="#28f325ff" stopOpacity={0.8} />
                <stop offset="95%" stopColor="#28f325ff" stopOpacity={0.1} />
              </linearGradient>
            </defs>

            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="label" />
            <YAxis />
            <Tooltip />

            <Area
              type="monotone"
              dataKey="revenue"
              stroke="#000000"
              fillOpacity={1}
              fill="url(#colorRevenue)"
            />
          </AreaChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
}
