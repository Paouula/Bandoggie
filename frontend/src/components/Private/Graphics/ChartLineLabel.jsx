// components/ChartLineLabel.jsx
import React from "react";
import { TrendingUp } from "lucide-react";
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Legend } from "recharts";

const ChartLineLabel = () => {
  const chartData = [
    { month: "Ene", ingresos: 4000, gastos: 2400 },
    { month: "Feb", ingresos: 3000, gastos: 1398 },
    { month: "Mar", ingresos: 2000, gastos: 9800 },
    { month: "Abr", ingresos: 2780, gastos: 3908 },
    { month: "May", ingresos: 1890, gastos: 4800 },
    { month: "Jun", ingresos: 2390, gastos: 3800 },
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Ingresos vs Gastos</h3>
        <p className="text-sm text-gray-600 mt-1">Análisis financiero mensual</p>
      </div>
      <div className="p-6">
        <ResponsiveContainer width="100%" height={300}>
          <LineChart data={chartData}>
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
            <Line 
              type="monotone" 
              dataKey="ingresos" 
              stroke="#3B82F6" 
              name="Ingresos"
              strokeWidth={3}
              dot={{ fill: '#3B82F6', r: 6 }}
              activeDot={{ r: 8, fill: '#3B82F6' }}
            />
            <Line 
              type="monotone" 
              dataKey="gastos" 
              stroke="#EF4444" 
              name="Gastos"
              strokeWidth={3}
              dot={{ fill: '#EF4444', r: 6 }}
              activeDot={{ r: 8, fill: '#EF4444' }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="flex items-center gap-2 text-sm">
          <TrendingUp className="w-4 h-4 text-green-600" />
          <span className="font-medium text-green-600">Margen de beneficio del 23.8%</span>
        </div>
        <p className="text-gray-600 text-sm mt-1">
          Tendencia positiva en los últimos 3 meses
        </p>
      </div>
    </div>
  );
};

export default ChartLineLabel;