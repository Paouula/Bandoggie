// Graphics.jsx - Dashboard estilo “cards” pastel organizado
import React, { useEffect, useState } from "react";
import { Users, Package, UserCog, Star } from "lucide-react";

const Graphics = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    const timer = setTimeout(() => setIsLoading(false), 1200);
    return () => clearTimeout(timer);
  }, []);

  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen bg-pink-50">
        <div className="w-12 h-12 border-4 border-pink-300 border-t-transparent rounded-full animate-spin" />
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 p-8">
      <div className="max-w-7xl mx-auto grid gap-6 
                      grid-cols-1 md:grid-cols-2 lg:grid-cols-4
                      auto-rows-[180px]">

        {/* === Bloque 1: Métricas principales === */}
        <div className="bg-white rounded-2xl p-6 shadow-md col-span-1 md:col-span-2 flex flex-col justify-between">
          <h2 className="text-xl font-semibold text-gray-700 mb-4">Estadísticas generales</h2>
          <div className="grid grid-cols-2 gap-4">
            <MetricCard color="bg-pink-100 text-pink-700" icon={Package} title="Productos" value="128" />
            <MetricCard color="bg-blue-100 text-blue-700" icon={Users} title="Clientes" value="320" />
            <MetricCard color="bg-yellow-100 text-yellow-700" icon={UserCog} title="Empleados" value="24" />
            <MetricCard color="bg-pink-100 text-pink-700" icon={Star} title="Reseñas" value="56" />
          </div>
        </div>

        {/* === Bloque 2: Card estilo grande individual === */}
        <div className="bg-pink-100 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <p className="text-gray-700 font-medium">Última reseña</p>
          <h3 className="text-2xl font-bold text-gray-800 mt-2">“Excelente servicio”</h3>
          <p className="text-sm text-gray-600 mt-4">Hace 2 días</p>
        </div>

        <div className="bg-blue-100 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <p className="text-gray-700 font-medium">Ventas del mes</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">$4,500</h3>
          <p className="text-sm text-gray-600 mt-4">+12% vs mes pasado</p>
        </div>

        <div className="bg-yellow-100 rounded-2xl p-6 shadow-md flex flex-col justify-between">
          <p className="text-gray-700 font-medium">Tickets pendientes</p>
          <h3 className="text-3xl font-bold text-gray-800 mt-2">8</h3>
          <p className="text-sm text-gray-600 mt-4">Por resolver hoy</p>
        </div>
      </div>
    </div>
  );
};

// Componente pequeño para cada métrica
const MetricCard = ({ color, icon: Icon, title, value }) => (
  <div className="bg-white rounded-xl shadow-sm p-4 flex items-center justify-between">
    <div>
      <p className="text-gray-600 text-sm">{title}</p>
      <h4 className="text-2xl font-bold text-gray-800">{value}</h4>
    </div>
    <div className={`w-10 h-10 flex items-center justify-center rounded-full ${color}`}>
      <Icon className="w-6 h-6" />
    </div>
  </div>
);

export default Graphics;
