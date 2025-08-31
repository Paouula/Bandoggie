// components/StatsCards.jsx
import React from "react";
import { TrendingUp, TrendingDown, Users, ShoppingCart, DollarSign, Activity } from "lucide-react";

const StatsCards = () => {
  const statsData = [
    {
      title: "Ventas Totales",
      value: "45,231",
      change: "+20.1%",
      trend: "up",
      icon: DollarSign,
      color: "text-green-600"
    },
    {
      title: "Usuarios Activos",
      value: "2,350",
      change: "+180.1%",
      trend: "up",
      icon: Users,
      color: "text-blue-600"
    },
    {
      title: "Pedidos",
      value: "12,234",
      change: "+19%",
      trend: "up",
      icon: ShoppingCart,
      color: "text-purple-600"
    },
    {
      title: "Conversión",
      value: "3.2%",
      change: "-4.75%",
      trend: "down",
      icon: Activity,
      color: "text-orange-600"
    }
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
      {statsData.map((stat, index) => {
        const IconComponent = stat.icon;
        return (
          <div key={index} className="bg-white rounded-xl shadow-sm border border-gray-200 p-6 hover:shadow-md transition-all duration-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.title}</p>
                <p className="text-2xl font-bold text-gray-900 mt-1">{stat.value}</p>
              </div>
              <div className={`p-3 rounded-full bg-opacity-10 ${stat.color.replace('text-', 'bg-')}`}>
                <IconComponent className={`w-6 h-6 ${stat.color}`} />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              {stat.trend === 'up' ? (
                <TrendingUp className="w-4 h-4 text-green-500 mr-1" />
              ) : (
                <TrendingDown className="w-4 h-4 text-red-500 mr-1" />
              )}
              <span className={`text-sm font-medium ${
                stat.trend === 'up' ? 'text-green-600' : 'text-red-600'
              }`}>
                {stat.change}
              </span>
              <span className="text-sm text-gray-500 ml-1">vs mes anterior</span>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default StatsCards;