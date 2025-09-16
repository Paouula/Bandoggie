// components/ChartPieDevices.jsx
import React from "react";
import { PieChart, Pie, Cell, ResponsiveContainer, Tooltip, Legend } from "recharts";

const ChartPieDevices = () => {
  const chartData = [
    { name: "Desktop", value: 400, color: "#3B82F6" },
    { name: "Mobile", value: 300, color: "#10B981" },
    { name: "Tablet", value: 200, color: "#F59E0B" },
    { name: "Otros", value: 100, color: "#EF4444" },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Distribución por Dispositivo</h3>
        <p className="text-sm text-gray-600 mt-1">Tráfico por tipo de dispositivo</p>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <PieChart>
            <Pie
              data={chartData}
              cx="50%"
              cy="50%"
              labelLine={false}
              label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
              outerRadius={80}
              fill="#8884d8"
              dataKey="value"
            >
              {chartData.map((entry, index) => (
                <Cell key={`cell-${index}`} fill={entry.color} />
              ))}
            </Pie>
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend />
          </PieChart>
        </ResponsiveContainer>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="grid grid-cols-2 gap-4">
          {chartData.map((item, index) => (
            <div key={index} className="flex items-center gap-2">
              <div 
                className="w-3 h-3 rounded-full" 
                style={{ backgroundColor: item.color }}
              ></div>
              <span className="text-sm text-gray-600">{item.name}: {item.value}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ChartPieDevices;