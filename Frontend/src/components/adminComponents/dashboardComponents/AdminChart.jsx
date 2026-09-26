import React, { useMemo } from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip } from "recharts";
import { useSelector } from "react-redux";

const SLICES = [
  { key: "In Progress", label: "Pending", color: "#F5A524" },
  { key: "Resolved", label: "Resolved", color: "#22C55E" },
  { key: "Rejected", label: "Rejected", color: "#EF4444" },
];

export default function AdminChart() {
  const complaints = useSelector((state) => state.complaints.list);

  const { chartData, total } = useMemo(() => {
    const counts = SLICES.map((s) => ({
      ...s,
      value: complaints.filter((c) => c.status === s.key).length,
    }));
    return { chartData: counts, total: complaints.length };
  }, [complaints]);

  return (
    <div className="w-full h-full flex flex-col gap-4">
      <h3 className="text-base md:text-lg font-bold text-slate-900 shrink-0">
        Complaints Overview
      </h3>

      <div className="relative flex-1 min-h-[180px]">
        <ResponsiveContainer width="100%" height="100%">
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              innerRadius="62%"
              outerRadius="90%"
              paddingAngle={3}
              dataKey="value"
              stroke="none"
            >
              {chartData.map((entry) => (
                <Cell key={entry.key} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip />
          </PieChart>
        </ResponsiveContainer>

        {/* Center label */}
        <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none">
          <span className="text-xl md:text-2xl font-bold text-slate-900">{total}</span>
          <span className="text-[11px] md:text-xs text-slate-400">Total</span>
        </div>
      </div>

      {/* Legend rows */}
      <div className="flex flex-col gap-2 shrink-0">
        {chartData.map((s) => {
          const pct = total ? ((s.value / total) * 100).toFixed(1) : "0.0";
          return (
            <div key={s.key} className="flex items-center justify-between text-xs md:text-sm">
              <div className="flex items-center gap-2">
                <span
                  className="w-2.5 h-2.5 rounded-full shrink-0"
                  style={{ backgroundColor: s.color }}
                />
                <span className="text-slate-600">{s.label}</span>
              </div>
              <span className="font-medium text-slate-700">
                {s.value} ({pct}%)
              </span>
            </div>
          );
        })}
      </div>
    </div>
  );
}