// components/MetricsCard.jsx
import React from "react";
import { Clock, Target, Zap, Award } from "lucide-react";

const MetricsCard = () => {
  const metrics = [
    {
      label: "Tiempo promedio",
      value: "2m 34s",
      icon: Clock,
      color: "text-blue-600",
      bgColor: "bg-blue-100"
    },
    {
      label: "Tasa de éxito",
      value: "94.2%",
      icon: Target,
      color: "text-green-600",
      bgColor: "bg-green-100"
    },
    {
      label: "Velocidad",
      value: "1.2s",
      icon: Zap,
      color: "text-yellow-600",
      bgColor: "bg-yellow-100"
    },
    {
      label: "Calificación",
      value: "4.8/5",
      icon: Award,
      color: "text-purple-600",
      bgColor: "bg-purple-100"
    }
  ];

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
      <div className="p-6 border-b border-gray-200">
        <h3 className="text-lg font-semibold text-gray-900">Métricas Clave</h3>
        <p className="text-sm text-gray-600 mt-1">Indicadores de rendimiento</p>
      </div>
      <div className="p-6">
        <div className="space-y-6">
          {metrics.map((metric, index) => {
            const IconComponent = metric.icon;
            return (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className={`p-2 rounded-lg ${metric.bgColor}`}>
                    <IconComponent className={`w-5 h-5 ${metric.color}`} />
                  </div>
                  <span className="text-sm font-medium text-gray-700">{metric.label}</span>
                </div>
                <span className="text-lg font-bold text-gray-900">{metric.value}</span>
              </div>
            );
          })}
        </div>
      </div>
      <div className="p-6 bg-gray-50 border-t border-gray-200">
        <div className="text-center">
          <p className="text-sm text-gray-600">
            Actualizado hace 5 minutos
          </p>
        </div>
      </div>
    </div>
  );
};

export default MetricsCard;