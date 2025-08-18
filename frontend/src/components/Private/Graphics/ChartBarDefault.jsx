// components/ChartBarDefault.jsx
import React from "react";
import { TrendingUp } from "lucide-react";
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ChartBarDefault = () => {
  const chartData = [
    { month: "Ene", ventas: 186, usuarios: 120 },
    { month: "Feb", ventas: 305, usuarios: 200 },
    { month: "Mar", ventas: 237, usuarios: 180 },
    { month: "Abr", ventas: 173, usuarios: 150 },
    { month: "May", ventas: 209, usuarios: 190 },
    { month: "Jun", ventas: 214, usuarios: 170 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Ventas y Usuarios</h3>
        <p className="text-sm text-gray-600 mt-1">Enero - Junio 2024</p>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <BarChart data={chartData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis 
              dataKey="month" 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <YAxis 
              tick={{ fontSize: 12 }}
              tickLine={false}
              axisLine={false}
            />
            <Tooltip 
              contentStyle={{
                backgroundColor: 'white',
                border: '1px solid #e5e7eb',
                borderRadius: '8px',
                fontSize: '14px'
              }}
            />
            <Legend />
            <Bar 
              dataKey="ventas" 
              fill="#3B82F6" 
              name="Ventas"
              radius={[4, 4, 0, 0]}
            />
            <Bar 
              dataKey="usuarios" 
              fill="#10B981" 
              name="Usuarios"
              radius={[4, 4, 0, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-600">Crecimiento del 12.5% este mes</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          Mostrando el rendimiento de los últimos 6 meses
        </p>
      </div>
    </div>
  );
};

export default ChartBarDefault;