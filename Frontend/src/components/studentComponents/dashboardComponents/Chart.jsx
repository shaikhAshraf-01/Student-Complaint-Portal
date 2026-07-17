import React ,{useMemo} from 'react';
import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useSelector } from "react-redux";


// 2. Custom Hex Colors for each slice
const COLORS = ['#0088FE', '#00C49F', 'red'];

export default function Chart() {
    // 3. Access complaints from Redux store
    const complaints = useSelector((state) => state.complaints.list);

    // 4. Calculate counts for each status
    const {total, inProgress, resolved, rejected} = useMemo(() => {
    const total = complaints.length;
    const inProgress = complaints.filter(c => c.status === "In Progress").length;
    const resolved = complaints.filter(c => c.status === "Resolved").length;
    const rejected = complaints.filter(c => c.status === "Rejected").length;
        return { total, inProgress, resolved, rejected }; 

    }, [complaints]);

    // 5. Update data for the chart
    const chartData = [
      { name: 'Resolved', value: resolved },
      { name: 'In Progress', value: inProgress },
        { name: 'Rejected', value: rejected },
    ];

  return (
    <div className="w-full h-full">
      <ResponsiveContainer>
        <PieChart>
          <Pie
            data={chartData}
            cx="50%" // Centers chart horizontally
            cy="50%" // Centers chart vertically
            innerRadius={60} // Creates the donut hole (adjust to change thickness)
            outerRadius={100} // Total size of the chart
            paddingAngle={5} // Adds gaps between sections
            dataKey="value"
          >
            {chartData.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
            ))}
          </Pie>
          <Tooltip />
          <Legend itemSorter={null} verticalAlign="bottom" height={36} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
