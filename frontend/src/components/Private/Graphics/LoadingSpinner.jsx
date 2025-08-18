import React, { useEffect, useState } from "react";
import { BarChart3, LineChart, PieChart } from "lucide-react";
import StatsCards from "../../../components/Private/Graphics/StatsCards.jsx";
import ChartBarDefault from "../../../components/Private/Graphics/ChartBarDefault.jsx";
import ChartLineLabel from "../../../components/Private/Graphics/ChartLineLabel.jsx";
import ChartPieDevices from "../../../components/Private/Graphics/ChartPieDevices.jsx";
import MetricsCard from "../../../components/Private/Graphics/MetricsCard.jsx";

const Graphics = () => {
  const [isLoading, setIsLoading] = useState(true);
  const [activeChart, setActiveChart] = useState('overview');

  useEffect(() => {
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 1500);

    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return <LoadingSpinner />;
  }

  const chartTabs = [
    { id: 'overview', label: 'Resumen', icon: BarChart3 },
    { id: 'sales', label: 'Ventas', icon: LineChart },
    { id: 'devices', label: 'Dispositivos', icon: PieChart },
  ];

  return (
    <div className="min-h-screen bg-gray-50 p-6">
      <div className="max-w-7xl mx-auto">
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">Dashboard Analytics</h1>
          <p className="text-gray-600">Resumen de métricas y rendimiento del negocio</p>
        </div>

        {/* Stats Cards */}
        <StatsCards />

        {/* Chart Navigation */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-200 p-4 mb-6">
          <div className="flex flex-wrap gap-2">
            {chartTabs.map((tab) => {
              const IconComponent = tab.icon;
              return (
                <button
                  key={tab.id}
                  onClick={() => setActiveChart(tab.id)}
                  className={`flex items-center gap-2 px-4 py-2 rounded-lg font-medium transition-all duration-200 ${
                    activeChart === tab.id
                      ? 'bg-blue-100 text-blue-700 shadow-sm'
                      : 'text-gray-600 hover:bg-gray-100'
                  }`}
                >
                  <IconComponent className="w-4 h-4" />
                  {tab.label}
                </button>
              );
            })}
          </div>
        </div>

        {/* Charts Grid */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
          <ChartBarDefault />
          <ChartLineLabel />
          <ChartPieDevices />
          <MetricsCard />
        </div>
      </div>
    </div>
  );
};

export default Graphics;