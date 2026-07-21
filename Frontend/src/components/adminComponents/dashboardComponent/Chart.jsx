import React, { useMemo } from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSelector } from "react-redux";

const COLORS = ['#0088FE', '#00C49F', 'red'];

export default function Chart() {
  const complaints = useSelector((state) => state.complaints.list);

  const { inProgress, resolved, rejected } = useMemo(() => {
    const inProgress = complaints.filter(c => c.status === "In Progress").length;
    const resolved = complaints.filter(c => c.status === "Resolved").length;
    const rejected = complaints.filter(c => c.status === "Rejected").length;
    return { inProgress, resolved, rejected };
  }, [complaints]);

  const chartData = [
    { name: 'Resolved', value: resolved },
    { name: 'In Progress', value: inProgress },
    { name: 'Rejected', value: rejected },
  ];

  return (
    <div className="w-full h-full p-2">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={chartData}
            cx="50%"
            cy="45%"
              // scales with container instead of staying fixed at 60px
            outerRadius="75%"   // scales with container instead of staying fixed at 100px
            dataKey="value"
            
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend
            itemSorter={null}
            verticalAlign="bottom"
            height={36}
            wrapperStyle={{ fontSize: '11px' }}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}